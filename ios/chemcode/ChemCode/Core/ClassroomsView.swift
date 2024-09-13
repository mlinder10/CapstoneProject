//
//  ClassroomsView.swift
//  chemcode
//
//  Created by Matt Linder on 9/13/24.
//

import SwiftUI

struct ClassroomsView: View {
  @State private var classrooms = [Classroom]()
  
  var body: some View {
    NavigationStack {
      List {
        ForEach(classrooms) { c in
          NavigationLink { SetsView(classroom: c) } label: {
            HStack {
              Text(c.name)
              Spacer()
              Text(c.code)
                .font(.subheadline)
                .foregroundStyle(.secondary)
            }
          }
        }
      }
      .navigationTitle("Classrooms")
      .task { await fetchClassrooms() }
    }
  }
  
  func fetchClassrooms() async {
    do {
      let client = HttpClient(baseUrl: DEV_SERVER, headers: HEADERS)
      let classrooms: [Classroom.Json] = try await client.request("/classrooms")
      self.classrooms = classrooms.map { $0.toObservable() }
    } catch {
      print(error.localizedDescription)
    }
  }
}

#Preview {
    ClassroomsView()
}
