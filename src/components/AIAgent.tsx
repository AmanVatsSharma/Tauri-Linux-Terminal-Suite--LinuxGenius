import { useState, useEffect } from 'react';
import TerminalAgent from '../utils/langGraphAgent';

interface AIAgentProps {
  terminalOutput?: string;
}

const AIAgent = ({ terminalOutput }: AIAgentProps) => {
  const [apiKey, setApiKey] = useState<string>('');
  const [isConfigured, setIsConfigured] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string>('');
  const [agent, setAgent] = useState<TerminalAgent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastCommand, setLastCommand] = useState<string>('');
  
  const setupAgent = () => {
    if (apiKey) {
      const newAgent = new TerminalAgent(apiKey);
      setAgent(newAgent);
      setIsConfigured(true);
    }
  };

  useEffect(() => {
    if (terminalOutput && agent && isConfigured) {
      // Extract command from the output if possible
      const lines = terminalOutput.split('\n');
      let commandText = lastCommand;
      
      // Try to detect command in the output
      for (const line of lines) {
        if (line.includes('$') || line.includes('#')) {
          const parts = line.split(/[$#]\s+/);
          if (parts.length > 1) {
            commandText = parts[1].trim();
            break;
          }
        }
      }
      
      processOutput(commandText, terminalOutput);
      
      // Update history
      setLastCommand(commandText);
    }
  }, [terminalOutput, agent, isConfigured]);

  const processOutput = async (command: string, output: string) => {
    if (!agent) return;
    
    setIsLoading(true);
    
    try {
      const result = await agent.processTerminalOutput(command, output);
      setAnalysis(result.analysis);
      setSuggestions(result.suggestions);
    } catch (error) {
      console.error('Error processing output:', error);
      setAnalysis('Error analyzing terminal output.');
      setSuggestions('Unable to generate suggestions at this time.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isConfigured) {
    return (
      <div className="ai-setup">
        <h3>Configure AI Assistant</h3>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="password"
            placeholder="Enter OpenAI API Key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <button 
          onClick={setupAgent}
          style={{ 
            padding: '8px 16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Connect AI
        </button>
      </div>
    );
  }

  return (
    <div className="ai-suggestions">
      <h3>AI Terminal Assistant</h3>
      
      {isLoading ? (
        <div>Analyzing terminal output...</div>
      ) : (
        <>
          <div style={{ marginBottom: '16px' }}>
            <h4>Analysis</h4>
            <div 
              style={{ 
                backgroundColor: '#2C2C2C', 
                padding: '12px',
                borderRadius: '4px',
                color: '#EEEEEE',
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap'
              }}
            >
              {analysis || 'No analysis yet. Run some commands to see AI analysis.'}
            </div>
          </div>
          
          <div>
            <h4>Suggestions</h4>
            <div 
              style={{ 
                backgroundColor: '#2C2C2C', 
                padding: '12px',
                borderRadius: '4px',
                color: '#4CAF50',
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap'
              }}
            >
              {suggestions || 'No suggestions yet. Run some commands to see AI suggestions.'}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AIAgent; 