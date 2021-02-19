import { useState, useEffect } from 'react'
import styled from 'styled-components';
import Terminal from './components/Terminal';
import Playground from './components/Playground';


function App() {
  const [xPos, setXPos] = useState(0);
  const [yPos, setYPos] = useState(0);

  const [commands, setCommands] = useState({
    move: handleMove,
  });

  function handleMove(_, x = 0, y = 0) {
    setXPos(oldX => oldX + Number(x));
    setYPos(oldY => oldY + Number(y));

    return `Moved ${x} pixels in x direction and ${y} in y direction`;
  }

  return (
    <Container>

      <FlexWrapper>
        <Terminal extra_commands={commands}/>

        <Playground />
      </FlexWrapper>
    </Container>
  );
}

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding-top: 5em;
`;

const FlexWrapper = styled.div`
  display: flex;
`;

export default App;
