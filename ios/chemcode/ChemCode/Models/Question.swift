//
//  Question.swift
//  chemcode
//
//  Created by Matt Linder on 9/12/24.
//

import Foundation

enum QuestionType: String, Codable {
  case multipleChoice = "multiple_choice"
  case matching = "matching"
  case word = "word"
  case fillBlank = "fill_blank"
}

enum Question {
  case multipleChoice(MultipleChoiceQuestion)
  
  enum Json: Codable {
    case multipleChoice(MultipleChoiceQuestion.Json)
    
    enum CodingKeys: String, CodingKey {
      case type
      case multipleChoice = "multiple_choice"  // This will match the `type` field in the response
    }
    
    // Custom Decoder
    init(from decoder: Decoder) throws {
      let container = try decoder.container(keyedBy: CodingKeys.self)
      let type = try container.decode(String.self, forKey: .type)
      
      switch type {
      case "multiple_choice":
        let mcq = try MultipleChoiceQuestion.Json(from: decoder)
        self = .multipleChoice(mcq)
      default:
        throw DecodingError.dataCorruptedError(forKey: .type, in: container, debugDescription: "Unknown question type")
      }
    }
    
    // Custom Encoder (if needed)
    func encode(to encoder: Encoder) throws {
      var container = encoder.container(keyedBy: CodingKeys.self)
      
      switch self {
      case .multipleChoice(let mcq):
        try container.encode("multiple_choice", forKey: .type)
        try mcq.encode(to: encoder)
      }
    }
    
    func from(_ question: Question) -> Json {
      switch question {
      case .multipleChoice(let q):
        return .multipleChoice(MultipleChoiceQuestion.Json.from(q))
      }
    }
    
    func toObservable() -> Question {
      switch self {
      case .multipleChoice(let q):
        return .multipleChoice(q.toObservable())
      }
    }
  }
}
