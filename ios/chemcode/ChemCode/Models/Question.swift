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

struct Question: Codable {
  let id: String
  let problem_set_id: String
  let type: QuestionType
}
