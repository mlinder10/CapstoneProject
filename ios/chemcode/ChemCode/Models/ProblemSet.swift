//
//  ProblemSet.swift
//  chemcode
//
//  Created by Matt Linder on 9/12/24.
//

import Foundation

@Observable final class ProblemSet: Identifiable {
  let id: String
  let name: String
  
  init(id: String, name: String) {
    self.id = id
    self.name = name
  }
  
  struct Json: Codable {
    let id: String
    let name: String
    
    static func from(_ pset: ProblemSet) -> Json {
      return Json(id: pset.id, name: pset.name)
    }
    
    func toObservable() -> ProblemSet {
      return ProblemSet(id: self.id, name: self.name)
    }
  }
}
