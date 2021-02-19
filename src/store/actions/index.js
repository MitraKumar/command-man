import { createAction } from '@reduxjs/toolkit'
import { MAZE_DATA } from "../../constants/data";
import { CommandHandler } from "./lib";


const ADD_COMMAND = "ADD_COMMAND";
const ADD_COMMAND_FAIL = "ADD_COMMAND_FAIL";

export const updateMazePosition = data => (dispatch) => {
  const {x, y} = data;

  const newMaze = MAZE_DATA.map(xs => xs.map(x => x));

  if (newMaze[y][x] == 1) {
    dispatch({ type: "COMMAND_RUN_FAILED", payload: "Error wall ahead" });
    return;
  }


  newMaze[y][x] = -1;

  dispatch({ type: "UPDATE_MAZE", payload: newMaze });
};

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


export const runCommand = (maze, x, y, stdin) => (dispatch) => {
  const parsed_input = parse_input(stdin)
  const currentCommand = parsed_input.output.cmd;

  const commandHandler = new CommandHandler(maze, x, y, dispatch);
  return commandHandler.handle(currentCommand, parsed_input.output.args);
  // if (currentCommand in commands) {
  //   if ((parsed_input.output.args).length >  0) {
  //     const args = parsed_input.output.args
  //     return commands[currentCommand](...args)
  //   }
  //   return commands[currentCommand]();
  // }

  // if (currentCommand === "move") {
  //   return { value: `yeehhhh`, type: "error" };
  // }
  // return  {value: `${x}, ${y}, ${currentCommand} is not found`, type: "error"};
};
