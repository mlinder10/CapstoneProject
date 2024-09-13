//
//  HttpClient.swift
//  chemcode
//
//  Created by Matt Linder on 9/12/24.
//

import Foundation

enum RequestMethod: String {
  case get = "GET"
  case post = "POST"
  case patch = "PATCH"
  case put = "PUT"
  case delete = "DELETE"
}

enum RequestError: Error {
  case badUrl
  case failedToEncodeBody
  case sessionFailed
  case failedToDecodeResponse
}

final class HttpClient {
  private var baseUrl: String
  private var headers: [String: String]
  
  init(baseUrl: String = "", headers: [String: String]) {
    self.baseUrl = baseUrl
    self.headers = headers
  }
  
  ///
  /// - throws: RequestError
  /// - returns: Generic Decodable
  func request<
    T: Encodable,
    U: Decodable
  >(
    _ route: String = "",
    method: RequestMethod = .get,
    headers: [String: String] = [:],
    body: T
  ) async throws -> U {
    guard let url = URL(string: "\(self.baseUrl)\(route)") else {
      throw RequestError.badUrl
    }
    
    var request = URLRequest(url: url)
    request.httpMethod = method.rawValue
    request.allHTTPHeaderFields = self.headers.merging(headers) { $1 }
    if method != .get && method != .delete {
      guard let body = try? JSONEncoder().encode(body) else {
        throw RequestError.failedToEncodeBody
      }
      request.httpBody = body
    }
    
    guard let (data, _) = try? await URLSession.shared.data(for: request) else {
      throw RequestError.sessionFailed
    }
    
    guard let decoded = try? JSONDecoder().decode(U.self, from: data) else {
      throw RequestError.failedToDecodeResponse
    }
    
    return decoded
  }
}
