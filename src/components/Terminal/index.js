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


function parse_input(input) {
  const input_array = input.split(' ');
  if (input_array.length === 0) {
    return {
      input: input,
      output: {
        cmd: input_array[0],
        args: []
      }
    }
  }

  return {
    input: input,
    output: {
      cmd: input_array[0],
      args: input_array,
    }
  }

}

function Terminal({ extra_commands = {} }) {

  const [history, setHistory] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commands, setCommands] = useState({
    help: showHelp,
    hello: greetUser,
  });

  useEffect(() => {
    setCommands((commands) => ({...commands, ...extra_commands}))
  }, []);

  function showHelp() {
    return 'help command';
  }

  function greetUser(_, username = "user") {
    return `hello ${username}`;
  }

  function runCommand(stdin) {
    const parsed_input = parse_input(stdin)
    const currentCommand = parsed_input.output.cmd;
    if (currentCommand in commands) {
      if ((parsed_input.output.args).length >  0) {
        const args = parsed_input.output.args
        return commands[currentCommand](...args)
      }
      return commands[currentCommand]();
    }
    return  {value: `${currentCommand} is not found`, type: "error"};
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
