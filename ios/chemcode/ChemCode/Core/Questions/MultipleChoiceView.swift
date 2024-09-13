//
//  MultipleChoiceVIew.swift
//  chemcode
//
//  Created by Matt Linder on 9/13/24.
//

import SwiftUI

struct MultipleChoiceView: View {
  let question: MultipleChoiceQuestion
  
  var body: some View {
    VStack {
      if let image = question.image {
        Image(uiImage: image)
      }
      if let text = question.text {
        Text(text)
      }
      Spacer()
      LazyVGrid(columns: [GridItem(), GridItem()]) {
        ForEach(question.choices, id: \.self) { choice in
          Text(choice)
        }
      }
    }
  }
}
