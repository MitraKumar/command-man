import styled from 'styled-components';

export const TerminalComponent = styled.div`
  height: 500px;
  padding: 1em;
  background: #0A0A19;
  color: #f4f4f4;
  overflow-y: auto;
  border-radius: 5px;
`;

export const Command = styled.p``;

export const StdErrorLine = styled.div`
  display: flex;
  color: red;
`;

export const StdOutputLine = styled.div`
  display: flex;
`;

export const Prompt = styled.div`
  margin-right: 1em;
  align-self: center;
`;

export const UserInput = styled.input`
  display: block;
  width: 100%;
  background: #0A0A19;
  border: none;
  color: #f4f4f4;
  padding: 0.5em 0;

  &:focus {
    outline: none;
  }
`;


export const OutputLine = styled.div``;
