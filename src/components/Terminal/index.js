import { useState, useEffect } from 'react'

function Terminal() {

  const [history, setHistory] = useState([
    {
      command: 'help',
      value: [
        'help: gives a description of a commnd',
        'show: shows a message',
      ],
    },
  ]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commands, setCommands] = useState({
    help: showHelp,
    hello: greetUser,
  });

  function showHelp() {
    return ['help command'];
  }

  function greetUser() {
    return ['hello User'];
  }

  function runCommand(currentCommand) {
    return currentCommand in commands ? commands[currentCommand]() : [`Error: command ${currentCommand} not found`];
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
    <div className="Terminal">
      {
        history.map((output, index) => <Print key={index} output={output} />)
      }
      <div>
        <div>$ </div>
        <input type="text" onKeyDown={handleKeyDown} onChange={handleKeyPress} value={currentCommand}/>
      </div>
    </div>
  );
}

function Print({ output }) {
  const command = output.command;
  const value =  output.value;
  //
  return (
    <div className="Print">
      <PrintLine text={command} />
      { value.map((x, index) => <PrintLine key={index} text={x} />)}
    </div>
  );
}

function PrintLine({ text }) {
  return (
    <div className="PrintLine">
      { text }
    </div>
  );
}

export default Terminal;
