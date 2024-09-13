//
//  QuestionsView.swift
//  chemcode
//
//  Created by Matt Linder on 9/13/24.
//

import SwiftUI

struct QuestionsView: View {
  @State private var questions = [Question]()
  let pset: ProblemSet
  
  var body: some View {
    VStack {
      if let question = questions.first {
        switch question {
        case .multipleChoice(let mcq):
          MultipleChoiceView(question: mcq)
        }
      } else {
        Text("No Question")
      }
    }
    .padding()
    .task { await fetchQuestions() }
  }
  
  func fetchQuestions() async {
    do {
      let client = HttpClient(baseUrl: DEV_SERVER, headers: HEADERS)
      let questions: [MultipleChoiceQuestion.Json] = try await client.request("/questions/\(pset.id)")
      self.questions = questions.map { Question.multipleChoice($0.toObservable()) }
      //      let questions: [Question.Json] = try await client.request("/questions/\(pset.id)")
      //      self.questions = questions.map { $0.toObservable() }
    } catch {
      print(error.localizedDescription)
    }
  }
}
