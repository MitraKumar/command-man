import { useState, useEffect } from 'react'
import {
  TerminalComponent,
  Prompt,
  Command,
  InputLine,
  UserInput,
  StdOutputLine,
  StdErrorLine,
  OutputLine
} from './styled-elements';

function Terminal() {

  const [history, setHistory] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commands, setCommands] = useState({
    help: showHelp,
    hello: greetUser,
  });

  function showHelp() {
    return 'help command';
  }

  function greetUser() {
    return 'hello User';
  }

  function runCommand(currentCommand) {
    return currentCommand in commands ? commands[currentCommand]() : {value: `${currentCommand} is not found`, type: "error"};
  }

  function handleKeyPress(e) {
    setCurrentCommand(curr => e.target.value);
  }

  function handleKeyDown(e) {
    switch(e.code) {
      case "Enter":
        const output = {
          command: currentCommand,
          value: runCommand(currentCommand),
        };
        const newHistory = [...history, output];
        setHistory(newHistory);
        setCurrentCommand('');
        break;
      default:
        break;
    }

  }

  return (
    <TerminalComponent>
      {
        history.map((output, index) => <Print key={index} output={output} />)
      }
      <StdOutputLine>
        <Prompt>$</Prompt>
        <UserInput onKeyDown={handleKeyDown} onChange={handleKeyPress} value={currentCommand} type="text" autoFocus/>
      </StdOutputLine>
    </TerminalComponent>
  );
}

function Print({ output }) {
  const command = output.command;
  const value =  output.value;
  //
  return (
    <OutputLine>
      <PrintLine text={command} type="command"/>
      { Array.isArray(value) ? value.map((x, index) => <PrintLine key={index} text={x} />) : <PrintLine text={value} />}
    </OutputLine>
  );
}

function PrintLine({ text, type }) {

  if (type === "command") {
    return (
      <StdOutputLine>
        <Prompt>$</Prompt>{ text }
      </StdOutputLine>
    );
  }

  if (typeof text === 'object' && "type" in text && text.type === "error") {
    return (
      <StdErrorLine>
        Error: { text.value }
      </StdErrorLine>
    );
  }

  return (
    <div className="PrintLine">
      { text }
    </div>
  );
}

export default Terminal;
