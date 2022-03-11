import { Room } from "src/app/model/Room";

export interface AppState {
  roomPage: {
    rooms: Room[]
  }
}
