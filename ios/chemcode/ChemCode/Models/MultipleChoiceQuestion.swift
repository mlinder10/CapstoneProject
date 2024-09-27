//
//  MultipleChoiceQuestion.swift
//  chemcode
//
//  Created by Matt Linder on 9/12/24.
//

import Foundation
import SwiftUI

@Observable final class MultipleChoiceQuestion: Identifiable {
  let id: String
  let problemSetId: String
  let type: String
  let image: UIImage?
  let text: String?
  let answer: String
  let choices: [String]
  var randomChoices: [String] {
    var choices = [String]()
    choices.append(answer)
    return choices.shuffled()
  }
  
  init(id: String, problemSetId: String, type: String, image: UIImage?, text: String?, answer: String, choices: [String]) {
    self.id = id
    self.problemSetId = problemSetId
    self.type = type
    self.image = image
    self.text = text
    self.answer = answer
    self.choices = choices
  }
  
  struct Json: Codable {
    let id: String
    let problemSetId: String
    let type: String
    let image: String?
    let text: String?
    let answer: String
    let choices: [String]
    
    static func from(_ mcq: MultipleChoiceQuestion) -> Json {
      Json(
        id: mcq.id,
        problemSetId: mcq.problemSetId,
        type: mcq.type,
        image: "",
        text: mcq.text,
        answer: mcq.answer,
        choices: mcq.choices
      )
    }
    
    func toObservable() -> MultipleChoiceQuestion {
      let data = self.image == nil ? nil : Data(base64Encoded: self.image!)
      let image = data == nil ? nil : UIImage(data: data!)
      
      return MultipleChoiceQuestion(
        id: self.id,
        problemSetId: self.problemSetId,
        type: self.type,
        image: image,
        text: self.text,
        answer: self.answer,
        choices: self.choices
      )
    }
  }
}
