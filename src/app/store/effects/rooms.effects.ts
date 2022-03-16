import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { filter, map, mergeMap, switchMap } from "rxjs";
import { Room } from "src/app/model/Room";
import { HttpService } from "src/app/services/http.service";
import { bookRoom, cancelBookRoom, init, initSuccess } from "../actions/rooms.action";

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


    // switchMap(
    //     () =>  this.httpService.getRooms().pipe(
    //       map( (rooms: any) =>  initSuccess(rooms)),
    //     )
    // )

  ));

  constructor ( private actions$: Actions,
                private httpService: HttpService) {
                }

}
