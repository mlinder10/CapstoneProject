//
//  MultipleChoiceVIew.swift
//  chemcode
//
//  Created by Matt Linder on 9/13/24.
//

import SwiftUI

struct MultipleChoiceView: View {
  @State private var selection: String? = nil
  let question: MultipleChoiceQuestion
  let next: () -> Void
  
  var body: some View {
    VStack {
      if let image = question.image {
        Image(uiImage: image)
      }
      if let text = question.text {
        Text(text)
      }
      if let selection {
        if selection == question.answer {
          Text("Correct")
        } else {
          Text("Incorrect")
        }
      }
      Spacer()
      LazyVGrid(columns: [GridItem(), GridItem()]) {
        ForEach(question.randomChoices, id: \.self) { choice in
          Button { selection = choice } label: {
            Text(choice)
              .frame(maxWidth: .infinity)
              .foregroundStyle(selection != nil ? selection == choice ? selection == question.answer ? .green : .red : .primary : .primary)
          }
          .buttonStyle(.bordered)
        }
      }
    }
    .overlay(alignment: .bottomTrailing) {
      if selection != nil {
        Button {
          selection = nil
          next()
        } label: {
          Image(systemName: "arrow.right")
            .padding(4)
        }
        .buttonStyle(.borderedProminent)
        .buttonBorderShape(.circle)
        .padding(24)
      }
    }
  }
}
