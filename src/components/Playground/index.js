import { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import styled from 'styled-components';

import { updateMazePosition } from '../../store/actions'

// const ORIGINAL_MAZE = [
//   [0, 1, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 1, 0, 0],
//   [1, 1, 0, 0, 0, 1, 2, 0],
//   [0, 1, 0, 1, 0, 1, 0, 0],
//   [0, 0, 0, 1, 1, 1, 0, 0],
//   [0, 0, 0, 0, 0, 0, 1, 0],
//   [0, 1, 0, 0, 0, 0, 1, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
// ];

const mapStateToProps = (state) => {
  return {
    maze: state.maze,
    x: state.x_position,
    y: state.y_position,
  }
}

const mapDispatchToProps = { updateMazePosition }

// const handleMove(maze) {
//   return (_, x, y) => {
//     setXPos(oldX => oldX + Number(x));
//     setYPos(oldY => oldY + Number(y));

//     console.log(xPos + x);
//     return `Moved ${x} pixels in x direction and ${y} in y direction`;
//   }
// }

function Playground({ maze, x, y, updateMazePosition }) {

  // const [maze, setMaze] = useState(original_maze);

  // useEffect(() => {
  //   updateMaze(maze)
  // }, [maze]);

  useEffect(() => {

    // const newMaze = original_maze.map(xs => xs.map(x => x));
    // newMaze[y][x] = -1;

    // setMaze(newMaze);
    updateMazePosition({ x, y })
  }, [x, y]);

  return (
    <Grid>
      { maze.map((xs, i) => <Row key={i} xs={xs}/>) }
    </Grid>
  );
}

function Row({ xs }) {
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


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Playground);
