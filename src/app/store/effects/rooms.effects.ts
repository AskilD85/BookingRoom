import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { filter, map, mergeMap, tap, concatMap } from "rxjs";
import { bookRoom, bookRoomSuccess, cancelBookRoom, init, initSuccess } from "../actions/rooms.action";
import { HttpService } from './../../services/http.service';

@Injectable()
export class RoomsEffect  {
  loadRooms$ = createEffect( () => this.actions$.pipe(
    ofType(init, bookRoom, cancelBookRoom),
    mergeMap(() => {
       return this.httpService.getRooms().pipe(
         map((rooms:any) => {

           return initSuccess({rooms})
        })
      )
    }),
  ));

 /* bookingRooms$ = createEffect(() => this.actions$.pipe(
    ofType(bookRoom, cancelBookRoom),
    map(( rooms: any) => {return {rooms}}),
    mergeMap((rooms: any ) =>
      this.httpService.bookedRoom2(rooms.rooms).pipe(
        map((rooms: any) => bookRoomSuccess(rooms))
      )
    )
  )
  , {dispatch: false});*/

  constructor ( private actions$: Actions,
                private httpService: HttpService) {
                }

}
