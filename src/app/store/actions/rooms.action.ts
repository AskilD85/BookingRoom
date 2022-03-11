import { Action, createAction, props } from "@ngrx/store";
import { Room } from 'src/app/model/Room';

export namespace ROOM_ACTION {
  export const BOOK_ROOM = 'BOOK ROOM'
}

export class BookRoom implements Action {
  readonly type = ROOM_ACTION.BOOK_ROOM;
  constructor (public payload:Room) {}
}



export const init = createAction('[BOOK_ROOM] init')
export const bookRoom = createAction('[BOOK_ROOM] bookRoom', props<Room>())
export const cancelBookRoom = createAction('[BOOK_ROOM] cancelBookRoom', props<Room>())
