import { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
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

import { runCommand } from '../../store/actions'

const mapStateToProps = (state, x, y, history) => {
  return {
    maze: state.maze,
    x: state.x_position,
    y: state.y_position,
    history: state.history,
  }
}

const mapDispatchToProps = { runCommand }

function Terminal({ maze, x, y, history, runCommand }) {

  const [currentCommand, setCurrentCommand] = useState('');
  const inputRef = useRef('');

  function handleKeyPress(e) {
    setCurrentCommand(curr => e.target.value);
  }

  function handleKeyDown(e) {
    switch(e.keyCode) {
      case 13:
        runCommand(maze, x, y, currentCommand);
        setCurrentCommand('');
        break;
      default:
        break;
    }

  }

  return (
    <TerminalComponent onClick={e => inputRef.current.focus()}>
      {
        history.map((output, index) => <Print key={index} output={output} />)
      }
      <StdOutputLine>
        <Prompt>$</Prompt>
        <UserInput ref={inputRef} onKeyDown={handleKeyDown} onChange={handleKeyPress} value={currentCommand} type="text" autoFocus/>
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

  if (text === "") {
    return <br></br>;
  }

  return (
    <div className="PrintLine">
      { text }
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Terminal);
