import { Action, createAction, props } from "@ngrx/store";
import { Room } from './../../model/Room';

export namespace ROOM_ACTION {
  export const BOOK_ROOM = 'BOOK ROOM'
}

export class BookRoom implements Action {
  readonly type = ROOM_ACTION.BOOK_ROOM;
  constructor (public payload:Room[]) {}
}



export const init = createAction('[BOOK_ROOM] init')
export const initSuccess = createAction('[BOOK_ROOM] initSuccess', props<{rooms: Room[]}>())

export const bookRoom = createAction(
  '[BOOK_ROOM] booked Room',
  (rooms: Room) => ({ rooms })
  //  props<{rooms:Room[]}>()
   )
export const bookRoomSuccess = createAction('[BOOK_ROOM] bookRoomSuccess',
  // (rooms: Room[]) => ({ rooms })
props<{ rooms: Room[] }>()
)

export const cancelBookRoom = createAction('[BOOK_ROOM] cancel BookedRoom', props<Room>())
