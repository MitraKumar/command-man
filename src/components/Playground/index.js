import { useState, useEffect } from 'react';
import styled from 'styled-components';

const ORIGINAL_MAZE = [
  [0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0],
  [1, 1, 0, 0, 0, 1, 2, 0],
  [0, 1, 0, 1, 0, 1, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

function Playground({ x, y }) {

  const [maze, setMaze] = useState(ORIGINAL_MAZE);

  useEffect(() => {

    const newMaze = ORIGINAL_MAZE.map(xs => xs.map(x => x));
    newMaze[y][x] = -1;

    setMaze(newMaze);
  }, [x, y]);

  return (
    <Grid>
      { maze.map((xs, i) => <Row key={i} xs={xs}/>) }
    </Grid>
  );
}

function Row({ xs }) {
  console.log(xs);
  return (
    <RowElement>
      { xs.map((x, i) => <Cell key={i} x={x}/>) }
    </RowElement>
  );
}

function Cell({ x }) {
  if (x === 1) {
    return <Black />
  } else if (x === 0) {
    return <White />
  } else if(x === 2) {
    return <Target />
  }

  return <Player />

}

const Grid = styled.div``;

const RowElement = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
`;

const CellElement = styled.div`
  width: 30px;
  height: 30px;
`;

const White = styled.div`
  width: 30px;
  height: 30px;
  background: green;
`;
const Black = styled.div`
  width: 30px;
  height: 30px;
  background: red;
`;
const Player = styled.div`
  width: 30px;
  height: 30px;
  background: blue;
`;
const Target = styled.div`
  width: 30px;
  height: 30px;
  background: yellow;
`;


export default Playground;
