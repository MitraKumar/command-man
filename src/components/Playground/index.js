import { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import styled from 'styled-components';

import { updateMazePosition } from '../../store/actions'

const mapStateToProps = (state) => {
  return {
    maze: state.maze,
    x: state.x_position,
    y: state.y_position,
  }
}

const mapDispatchToProps = { updateMazePosition }

function Playground({ maze, x, y, updateMazePosition }) {

  useEffect(() => {
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

const Grid = styled.div`
`;

const RowElement = styled.div`
  // width: 240px;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-gap: 0.4em;
  margin-bottom: 0.4em;
`;

const CellElement = styled.div`
  // width: 30px;
  // height: 30px;
`;

const White = styled.div`
  width: 100%;
  height: 30px;
  background: green;
`;
const Black = styled.div`
  width: 100%;
  height: 30px;
  background: red;
`;
const Player = styled.div`
  width: 100%;
  height: 30px;
  background: blue;
`;
const Target = styled.div`
  width: 100%;
  height: 30px;
  background: yellow;
`;


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Playground);
