export class Room {
  id: number
  roomNum: number
  places: number
  price: number | string;
  bookPeriod: BookPeriod
  constructor(id: number, roomNum: number,places: number, price: number | string, bookPeriod: BookPeriod) {
    this.id = id
    this.roomNum = roomNum
    this.places = places
    this.price = price
    this.bookPeriod = bookPeriod

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
