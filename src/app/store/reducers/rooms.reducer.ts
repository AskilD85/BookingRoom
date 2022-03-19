import { ActionReducerMap, createReducer, MetaReducer, on, State } from "@ngrx/store";
import {  Room } from "../../model/Room";
import {  BookRoom, bookRoomSuccess, cancelBookRoom, init, initSuccess, ROOM_ACTION } from "../actions/rooms.action";
import { AppState } from "../state/app.state";
import { environment } from './../../../environments/environment.prod';

export interface RoomState {
  rooms: Room[],
}

const initialState: RoomState =  {
  rooms: [
    // new Room(2, 2, 4, 4800, new BookPeriod(new Date("2022-03-01T19:07:00.516Z"), new Date("2022-03-08T19:07:00.516Z")), new BookDates()),
    // new Room(3, 3, 4, 4800, new BookPeriod(new Date("2022-03-10T17:37:45.618Z"), new Date("2022-03-20T19:07:00.516Z")), new BookDates()),
    // new Room(4, 4, 4, 4800, new BookPeriod(new Date("2022-02-26T19:07:00.516Z"), new Date("2022-03-01T19:07:00.516Z")), new BookDates()),
  ]
}

export function roomsReducer (state = initialState, action: BookRoom) {
  switch (action.type) {
    case ROOM_ACTION.BOOK_ROOM:
      return {
        ...state,
        rooms : [...state.rooms, action.payload]
      }
    default:
      return state
  }
}

/*---------------*/
export const roomReducer = createReducer(
  initialState,
  on(init, (state) => ({
    ...state,
    rooms: [...state.rooms ]
  })),
  /*on(bookRoom, (state, action) => {
    return {
      ...state,
      rooms: action.rooms
    }
  }),*/

  on(cancelBookRoom, (state, action) => ({
    ...state,
    rooms: [...state.rooms, action]
  })),

  on(initSuccess, (state, action) => {
    return {
      ...state,
      rooms: action.rooms
    }
  } /*({
    ...state,
    rooms: [...state.rooms, action.rooms]
  })*/
  ),
  on(bookRoomSuccess, (state, action) =>
  {
    return {
      ...state,
      rooms: action.rooms
    }
  }),
)

export const reducers: ActionReducerMap<AppState> = {
  roomPage: roomReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

