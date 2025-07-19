import { useEffect, useRef, useState } from 'react';
import { Terminal as XTerminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import { invoke } from '@tauri-apps/api/core';

interface TerminalProps {
  onOutput?: (output: string, command: string) => void;
}

const Terminal = ({ onOutput }: TerminalProps) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [terminal, setTerminal] = useState<XTerminal | null>(null);
  const [input, setInput] = useState<string>('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  useEffect(() => {
    if (terminalRef.current) {
      const term = new XTerminal({
        cursorBlink: true,
        fontFamily: 'monospace',
        fontSize: 14,
        theme: {
          background: '#1E1E1E',
          foreground: '#EEEEEE',
        },
      });

      const fitAddon = new FitAddon();
      term.loadAddon(fitAddon);
      
      term.open(terminalRef.current);
      fitAddon.fit();
      
      term.writeln('Linux Terminal Suite - AI Assistant');
      term.writeln('Type your command or ask the AI for help');
      term.writeln('---------------------------------------');
      term.write('\r\n$ ');

      // Handle terminal input
      term.onKey(({ key, domEvent }) => {
        const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;

        if (domEvent.keyCode === 13) { // Enter key
          if (input.trim() !== '') {
            executeCommand(input);
            // Add to history only if it's not the same as the last command
            if (commandHistory.length === 0 || commandHistory[commandHistory.length - 1] !== input) {
              setCommandHistory(prev => [...prev, input]);
            }
            setHistoryIndex(-1);
          } else {
            term.write('\r\n$ ');
          }
          setInput('');
          return;
        } else if (domEvent.keyCode === 8) { // Backspace
          if (input.length > 0) {
            term.write('\b \b'); // Erase character
            setInput(input.substring(0, input.length - 1));
          }
          return;
        } else if (domEvent.keyCode === 38) { // Up arrow (history)
          if (commandHistory.length > 0) {
            const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
            setHistoryIndex(newIndex);
            
            // Clear current input
            while (input.length > 0) {
              term.write('\b \b');
              setInput(input.substring(0, input.length - 1));
            }
            
            // Set input to history item
            const historyItem = commandHistory[commandHistory.length - 1 - newIndex];
            term.write(historyItem);
            setInput(historyItem);
          }
          return;
        } else if (domEvent.keyCode === 40) { // Down arrow (history)
          if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            
            // Clear current input
            while (input.length > 0) {
              term.write('\b \b');
              setInput(input.substring(0, input.length - 1));
            }
            
            // Set input to history item
            const historyItem = commandHistory[commandHistory.length - 1 - newIndex];
            term.write(historyItem);
            setInput(historyItem);
          } else if (historyIndex === 0) {
            // Clear input when reaching bottom of history
            while (input.length > 0) {
              term.write('\b \b');
              setInput(input.substring(0, input.length - 1));
            }
            setHistoryIndex(-1);
          }
          return;
        }

        if (printable) {
          term.write(key);
          setInput(input + key);
        }
      });

      window.addEventListener('resize', () => {
        fitAddon.fit();
      });

      setTerminal(term);

      return () => {
        term.dispose();
      };
    }
  }, [commandHistory, historyIndex]);

  const executeCommand = async (cmd: string) => {
    if (!terminal) return;
    
    terminal.writeln('');
    
    if (cmd.trim() === '') {
      terminal.write('\r\n$ ');
      return;
    }

    try {
      // Parse the command into command and arguments
      const parts = cmd.split(' ');
      const command = parts[0];
      const args = parts.slice(1);

      // Execute the command directly using Rust-based command execution
      try {
        const result = await invoke<{
          stdout: string;
          stderr: string;
          success: boolean;
        }>('execute_command', {
          command,
          args,
        });

        if (result.stdout) {
          terminal.writeln(result.stdout);
          if (onOutput) onOutput(result.stdout, cmd);
        }
        
        if (result.stderr) {
          terminal.writeln(`\x1b[31m${result.stderr}\x1b[0m`); // Red color for errors
          if (onOutput) onOutput(result.stderr, cmd);
        }
        
        if (!result.success) {
          terminal.writeln(`\x1b[31mCommand failed with non-zero exit code\x1b[0m`);
        }
      } catch (error) {
        terminal.writeln(`\x1b[31mError executing command: ${error}\x1b[0m`);
      }
    } catch (error) {
      terminal.writeln(`\x1b[31mError: ${error}\x1b[0m`);
    }
    
    terminal.write('\r\n$ ');
  };

  return (
    <div
      ref={terminalRef}
      style={{
        height: '100%',
        width: '100%',
        padding: '8px',
        backgroundColor: '#1E1E1E',
      }}
    />
  );
};

export default Terminal; 