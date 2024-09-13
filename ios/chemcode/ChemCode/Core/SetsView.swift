//
//  SetsView.swift
//  chemcode
//
//  Created by Matt Linder on 9/13/24.
//

import SwiftUI

struct SetsView: View {
  @State private var psets = [ProblemSet]()
  let classroom: Classroom
  
  var body: some View {
    List {
      ForEach(psets) { pset in
        NavigationLink { QuestionsView(pset: pset) } label: {
          Text(pset.name)
        }
      }
    }
    .navigationTitle(classroom.name)
    .task { await fetchPsets() }
  }
  
  func fetchPsets() async {
    do {
      let client = HttpClient(baseUrl: DEV_SERVER, headers: HEADERS)
      let psets: [ProblemSet.Json] = try await client.request("/sets/\(classroom.id)")
      self.psets = psets.map { $0.toObservable() }
    } catch {
      print(error.localizedDescription)
    }
  }
}
