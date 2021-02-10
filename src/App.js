import styled from 'styled-components';
import Terminal from './components/Terminal';


function App() {
  return (
    <Container>
      <Terminal />
    </Container>
  );
}

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding-top: 5em;
`;

export default App;
