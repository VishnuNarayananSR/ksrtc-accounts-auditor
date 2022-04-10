import "./App.css";
import UploadForm from "./Components/UploadForm/UploadForm";

function App() {
  return (
    <>
      <style>
        {`:root {
        --color-primary: #1a746b;
        --color-secondary: #ffab40;
        --color-tertiary: #99d5cf;
        --color-background: #E5E5E5;
        --color-text: #e8eaf6;
        --color-text-dark: #442c2e;
        }`}
      </style>
      <nav style={{ background: "var(--color-primary)" }}>
        <h1 id="title">KSRTC Collections Auditor</h1>
      </nav>
      <UploadForm></UploadForm>
    </>
  );
}

export default App;
