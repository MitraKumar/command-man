export class CommandHandler {


  constructor(maze, x, y, dispatch) {
    this.maze = maze;
    this.x = x;
    this.y = y;
    this.dispatch = dispatch
  }

  handle(command, args) {
    switch(command) {
      case "move":
        return this.handleMove(...args);
        break;
      default:
        break;
    }
  }

  handleMove(command_name, xdiff = 0, ydiff = 0) {

    const x = this.x + Number(xdiff);
    const y = this.y + Number(ydiff);


    if (x < 0 || y < 0 || x >= this.maze[0].length || y >= this.maze.length) {
      this.dispatch({
        type: "UPDATE_HISTORY",
        payload: {
          command: `${command_name} ${xdiff} ${ydiff}`,
          value: {
            type: 'error',
            value: `Moving outside the world.`
          },
        }
      });
      return;
    }

    if (this.maze[y][x] == 1) {
      this.dispatch({
        type: "UPDATE_HISTORY",
        payload: {
          command: `${command_name} ${xdiff} ${ydiff}`,
          value: {
            type: 'error',
            value: `Wall ahead.`
          },
        }
      });
      return;
    }

    const output = {
      command: `${command_name} ${xdiff} ${ydiff}`,
      value: `Moved ${xdiff}, ${ydiff} pixels`,
    }
    this.dispatch({ type: "UPDATE_POSITON", payload: { x, y }})
    this.dispatch({ type: "UPDATE_HISTORY", payload: output });
  }
}
