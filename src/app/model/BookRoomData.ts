import { Room } from './Room';
export class BookRoomData {
  bookDates?: BookDates[]
  Room?: Room
}

export class BookDates {
  start?: string;
  end?: string;
}
