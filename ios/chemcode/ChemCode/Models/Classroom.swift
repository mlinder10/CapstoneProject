//
//  Classroom.swift
//  chemcode
//
//  Created by Matt Linder on 9/12/24.
//

import Foundation

@Observable final class Classroom: Identifiable {
  let id: String
  var name: String
  let code: String
  
  init(id: String, name: String, code: String) {
    self.id = id
    self.name = name
    self.code = code
  }
  
  struct Json: Codable {
    let id: String
    let name: String
    let code: String
    
    static func from(_ classroom: Classroom) -> Json {
      return Json(id: classroom.id, name: classroom.name, code: classroom.code)
    }
    
    func toObservable() -> Classroom {
      return Classroom(id: self.id, name: self.name, code: self.code)
    }
  }
}
