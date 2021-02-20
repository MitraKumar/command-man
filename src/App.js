import { useState, useEffect } from 'react'
import styled from 'styled-components';
import Terminal from './components/Terminal';
import Playground from './components/Playground';


function App() {
  return (
    <Container>
      <Title>
        Maze - solver
      </Title>
      <Subtitle>Press <span>help</span> to start the game.</Subtitle>
      <FlexWrapper>
        <Playground />
        <Terminal />
      </FlexWrapper>
    </Container>
  );
}

const Title = styled.h1`
  color: #fff;
  font-size: 1.5rem;
  font-family: 'Press Start 2P', cursive;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 1rem;

  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }

`;

const Subtitle = styled.p`
  font-size: 0.5rem;
  font-family: 'Press Start 2P', cursive;
  color: #fff;
  margin-bottom: 3rem;
  text-align: center;

  span {
    color: red;
    font-size: 0.8rem;
  }

  @media screen and (min-width: 768px) {
    font-size: 1rem;
  }

`

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
`;

const FlexWrapper = styled.div`
  display: grid;
  // grid-template-columns: 1fr 2fr;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 2fr;
  }
`;

export default App;
