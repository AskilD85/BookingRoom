import { BookDates } from "./BookRoomData";

export class Room {
  id: number
  roomNum: number
  places: number
  price: number | string;
  bookPeriod: BookPeriod
  bookDates?: BookDates
  constructor(id: number, roomNum: number,places: number, price: number | string, bookPeriod: BookPeriod, bookDates: BookDates) {
    this.id = id
    this.roomNum = roomNum
    this.places = places
    this.price = price
    this.bookPeriod = bookPeriod
    this.bookDates = bookDates
  }
}

export class BookPeriod {
  start: Date
  end: Date
  constructor(start: Date, end: Date) {
    this.start = start
    this.end   = end
  }
}
