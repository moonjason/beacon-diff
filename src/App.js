import './App.css';
import CodeDiff from './CodeDiff';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "red"
      }}>
        <CodeDiff
          language="json"
          originalValue={JSON.stringify({})}
          modifiedValue={JSON.stringify({})}
          options={{
            theme: "vs",
            height: "100%",
            width: "100%",
            scrollbar: {
              vertical: "auto",
              horizontal: "auto"
            },
            automaticLayout: true,
            minimap: {
              enabled: false
            },
            enableSplitViewResizing: false,
            readOnly: true
          }} />
        </div>
    </div>
  );
}

export default App;
