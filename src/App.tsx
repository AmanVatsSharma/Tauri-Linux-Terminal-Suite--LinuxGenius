import { useState } from "react";
import "./App.css";
import Terminal from "./components/Terminal";
import AIAgent from "./components/AIAgent";

function App() {
  const [terminalOutput, setTerminalOutput] = useState<string>("");

  const handleTerminalOutput = (output: string) => {
    setTerminalOutput(output);
  };

  return (
    <div className="app-container" style={{ 
      display: 'flex', 
      flexDirection: 'column',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden'
    }}>
      <header style={{ 
        backgroundColor: '#2C2C2C', 
        color: 'white', 
        padding: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Linux Terminal Suite</h1>
        <div style={{ fontSize: '0.9rem' }}>Powered by AI</div>
      </header>

      <main style={{ 
        display: 'flex', 
        flexGrow: 1,
        overflow: 'hidden'
      }}>
        <div style={{ 
          flexGrow: 1,
          height: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          borderRight: '1px solid #444'
        }}>
          <div style={{ 
            flexGrow: 1,
            overflow: 'hidden'
          }}>
            <Terminal onOutput={handleTerminalOutput} />
          </div>
        </div>
        
        <div style={{ 
          width: '350px',
          padding: '16px',
          backgroundColor: '#1E1E1E',
          overflowY: 'auto'
        }}>
          <AIAgent terminalOutput={terminalOutput} />
        </div>
      </main>
    </div>
  );
}

export default App;
