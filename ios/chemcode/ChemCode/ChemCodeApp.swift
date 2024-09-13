//
//  chemcodeApp.swift
//  chemcode
//
//  Created by Matt Linder on 9/12/24.
//

import SwiftUI

@main
struct chemcodeApp: App {
  var body: some Scene {
    WindowGroup {
      DrawingView()
    }
  }
}

struct Line {
  var points: [CGPoint]
  var color: Color
  var lineWidth: CGFloat
}

struct DrawingView: View {
  @State private var lines = [Line]()
  @State private var smiles: String? = nil
  
  var body: some View {
    VStack {
      Canvas { context, size in
        for line in lines {
          var path = Path()
          path.addLines(line.points)
          context.stroke(path, with: .color(line.color), lineWidth: line.lineWidth)
          
        }
      }
      .frame(width: 300, height: 300)
      .border(.blue)
      .gesture(DragGesture(minimumDistance: 0, coordinateSpace: .local).onChanged({ value in
        let newPoint = value.location
        if value.translation.width + value.translation.height == 0 {
          lines.append(Line(points: [newPoint], color: .white, lineWidth: 1))
        } else {
          lines[lines.count - 1].points.append(newPoint)
        }
      }))
      HStack {
        Button {
          let image = linesToImage(lines: lines, size: CGSize(width: 300, height: 300))
          if let string = base64EncodeImage(image) {
            Task {
              smiles = await sendDrawing(string)
            }
          }
        } label: {
          Text("Print Data")
        }
        .buttonStyle(.borderedProminent)
        Button(role: .destructive) { lines = [] } label: {
          Text("Clear")
        }
        .buttonStyle(.bordered)
      }
      if let smiles {
        Text(smiles)
      }
    }
  }
}

func linesToImage(lines: [Line], size: CGSize) -> UIImage? {
  let renderer = UIGraphicsImageRenderer(size: size)
  
  let image = renderer.image { context in
    let cgContext = context.cgContext
    
    for line in lines {
      guard let firstPoint = line.points.first else { continue }
      
      // Set the color and line width for each line
      cgContext.setStrokeColor(UIColor(line.color).cgColor)
      cgContext.setLineWidth(line.lineWidth)
      
      // Start drawing the path
      cgContext.move(to: firstPoint)
      
      for point in line.points.dropFirst() {
        cgContext.addLine(to: point)
      }
      
      // Stroke the path for this line
      cgContext.strokePath()
    }
  }
  
  return image
}


func base64EncodeImage(_ image: UIImage?) -> String? {
  return image?.pngData()?.base64EncodedString()
}

func base64ToImage(_ base64: String) -> UIImage? {
  let data = Data(base64Encoded: base64)
  return data == nil ? nil : UIImage(data: data!)
}

func sendDrawing(_ data: String) async -> String? {
  let client = HttpClient(baseUrl: "http://127.0.0.1:5000", headers: [:])
  do {
    let res: String = try await client.request(method: .post, body: data)
    return res
  } catch {
    print(error.localizedDescription)
    return nil
  }
}
