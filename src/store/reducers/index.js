import { MAZE_DATA } from "../../constants/data";

// import authReducer from './authReducer';
// import todosReducer from './todosReducer';
//
//


const initialState = {
  maze: MAZE_DATA,
  x_position: 4,
  y_position: 3,
  commands: {},
  history: [],
  error: null,
  success: null,
};

const mainReducer =  (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_MAZE":
      return {...state, maze: action.payload};
    case "UPDATE_POSITON":
      return {...state, x_position: action.payload.x, y_position: action.payload.y }
    case "COMMAND_RUN_FAILED":
      return {...state, error: action.payload}
    case "COMMAND_RUN_SUCCESS":
      return {...state, success: action.payload}
    case "ADD_COMMAND":
      return {...state, commands: action.payload}
    case "UPDATE_HISTORY":
      return {...state, history: [...state.history, action.payload]}
    case "CLEAR_HISTORY":
      return {...state, history: []}
    case "GAME_WON":
      return {...state, history: [action.payload], success: true}
    default:
      return state;
  }
};

// export default combineReducers({
//   // auth: authReducer,
//   // todos: todosReducer,
//   // counter: counterReducer,
//   commands: mainReducer,
// });
//
export default mainReducer;
