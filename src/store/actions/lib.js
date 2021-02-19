export class CommandHandler {


  constructor(maze, x, y, dispatch) {
    this.maze = maze;
    this.x = x;
    this.y = y;
    this.dispatch = dispatch
  }

  handle(command, args) {
    switch(command) {
      case "left":
        return this.handleXMove(-1, ...args);
        break;
      case "right":
        return this.handleXMove(1, ...args);
        break;
      case "up":
        return this.handleYMove(-1, ...args);
        break;
      case "down":
        return this.handleYMove(1, ...args);
        break;
      default:
        this.dispatch({
          type: "UPDATE_HISTORY",
          payload: {
            command: `${command}`,
            value: {
              type: 'error',
              value: `${command} is not a valid command.`
            },
          }
        });
        break;
    }
  }

  handleXMove(direction, command_name, xdiff) {
    this.handleMove(command_name, Number(xdiff) * direction, 0)
  }

  handleYMove(direction, command_name, ydiff) {
    this.handleMove(command_name, 0, Number(ydiff) * direction)
  }

  checkForWallInXdir(lower_bound, upper_bound, y_position) {
    for (let i = lower_bound; i <= upper_bound; i++) {
      if (this.maze[y_position][i] == 1) {
        return true;
      }
    }
    return false;
  }

  checkForWallInYdir(lower_bound, upper_bound, x_position) {
    for (let i = lower_bound; i <= upper_bound; i++) {
      if (this.maze[i][x_position] == 1) {
        return true;
      }
    }
    return false;
  }

  handleMove(command_name, xdiff = 0, ydiff = 0) {

    const x = this.x + Number(xdiff);
    const y = this.y + Number(ydiff);

    let command_string = "";
    if (ydiff === 0) {
      command_string = `${command_name} ${Math.abs(xdiff)}`
    } else if (xdiff === 0) {
      command_string = `${command_name} ${Math.abs(ydiff)}`
    } else {
      command_string = `${command_name} ${xdiff} ${ydiff}`
    }


    if (x < 0 || y < 0 || x >= this.maze[0].length || y >= this.maze.length) {
      this.dispatch({
        type: "UPDATE_HISTORY",
        payload: {
          command: command_string,
          value: {
            type: 'error',
            value: `Moving outside the world.`
          },
        }
      });
      return;
    }

    // Check for wall in the path of moving in x-direction
    if (xdiff < 0) {
      if (this.checkForWallInXdir(x, this.x, y)) {
        this.dispatch({
          type: "UPDATE_HISTORY",
          payload: {
            command: command_string,
            value: {
              type: 'error',
              value: `You cannot cross a wall.`
            },
          }
        });
        return;
      }
    } else {
      if (this.checkForWallInXdir(this.x, x, y)) {
        this.dispatch({
          type: "UPDATE_HISTORY",
          payload: {
            command: command_string,
            value: {
              type: 'error',
              value: `You cannot cross a wall.`
            },
          }
        });
        return;
      }
    }

    // Check for wall in the path of moving in y-direction
    if (ydiff < 0) {
      if (this.checkForWallInYdir(y, this.y, x)) {
        this.dispatch({
          type: "UPDATE_HISTORY",
          payload: {
            command: command_string,
            value: {
              type: 'error',
              value: `You cannot cross a wall.`
            },
          }
        });
        return;
      }
    } else {
      if (this.checkForWallInYdir(this.y, y, x)) {
        this.dispatch({
          type: "UPDATE_HISTORY",
          payload: {
            command: command_string,
            value: {
              type: 'error',
              value: `You cannot cross a wall.`
            },
          }
        });
        return;
      }
    }

    const output = {
      command: command_string,
      value: `Moved ${xdiff}, ${ydiff} pixels`,
    }
    this.dispatch({ type: "UPDATE_POSITON", payload: { x, y }})
    this.dispatch({ type: "UPDATE_HISTORY", payload: output });
  }


}
