import { useState, useEffect } from 'react'
import styled from 'styled-components';
import Terminal from './components/Terminal';
import Playground from './components/Playground';


function App() {
  return (
    <Container>
      <FlexWrapper>
        <Terminal />
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
