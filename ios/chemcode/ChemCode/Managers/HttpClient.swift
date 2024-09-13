//
//  HttpClient.swift
//  chemcode
//
//  Created by Matt Linder on 9/12/24.
//

import Foundation

let DEV_SERVER = "http://127.0.0.1:5000"
let HEADERS = ["Content-Type": "application/json"]

enum RequestMethod: String {
  case get = "GET"
  case post = "POST"
  case patch = "PATCH"
  case put = "PUT"
  case delete = "DELETE"
}

enum RequestError: String, Error {
  case badUrl = "Bad Url"
  case failedToEncodeBody = "Failed to encode body"
  case sessionFailed = "Session failed"
  case failedToDecodeResponse = "Failed to decode response"
}

final class HttpClient {
  private var baseUrl: String
  private var headers: [String: String]
  
  init(baseUrl: String = "", headers: [String: String] = [:]) {
    self.baseUrl = baseUrl
    self.headers = headers
  }
  
  ///
  /// - throws: RequestError
  /// - returns: Generic Decodable
  func request<T: Decodable>(
    _ route: String = "",
    method: RequestMethod = .get,
    headers: [String: String] = [:],
    body: Encodable? = nil
  ) async throws -> T {
    guard let url = URL(string: "\(self.baseUrl)\(route)") else {
      throw RequestError.badUrl
    }
    
    var request = URLRequest(url: url)
    request.httpMethod = method.rawValue
    request.allHTTPHeaderFields = self.headers.merging(headers) { $1 }
    if method != .get && method != .delete {
      guard let body, let data = try? JSONEncoder().encode(body) else {
        throw RequestError.failedToEncodeBody
      }
      request.httpBody = data
    }
    
    guard let (data, _) = try? await URLSession.shared.data(for: request) else {
      throw RequestError.sessionFailed
    }
    
    guard let decoded = try? JSONDecoder().decode(T.self, from: data) else {
      throw RequestError.failedToDecodeResponse
    }
    
    return decoded
  }
}
