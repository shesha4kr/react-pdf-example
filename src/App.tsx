import React from "react";
import ReactDOM from "react-dom/client";
import { PDFViewer, Document, Page, View, Text } from "@react-pdf/renderer";

function App() {
  return (
    <div style={{ margin: 10 }}>
      <div style={{ margin: 10 }}>PDF Header</div>

      <PDFViewer>
        <Document>
          <Page>
            <View>
              <Text style={{ fontSize: 50 }}>this is text in PDF</Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>

    </div>
  );
}

export default App;

const container = document.getElementById("app");
const root = ReactDOM.createRoot(container!);
root.render(<App />);
