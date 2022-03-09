import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Room } from '../model/Room';



@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})



export class RoomListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['num', 'places', 'price'];
  dataSource: MatTableDataSource<Room>;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort!: MatSort ;
  constructor() {
    // Create 100 users
    const rooms = Array.from({ length: 40 }, (_, k) => createNewRooms(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(rooms);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator || null;
    this.dataSource.sort = this.sort;

 }



  ngOnInit(): void {
    console.log(this.dataSource.data);

  }

  applyFilter(event: Event) {
    console.log('applyFilter');

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyDateFilter(event: MatDatepickerInputEvent<Date>) {

    console.log(event.target.value);


    const startDate = this.range.value.start;
    let endDate = this.range.value.end;

    console.log(startDate);

    let data = []

    data = this.dataSource.data;

    console.log(1,  data);

    data = data.filter((item) => item.bookPeriod.end <= endDate && item.bookPeriod.start >= startDate )

    console.log(2, data);

    this.dataSource.data = data;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

/** Builds and returns a new User. */
function createNewRooms(id: number): Room {

  // количество мест в комнате
  let places =  getRandomInt(6);
  // в зависимости кол-ва мест - образуется цена (чисто для примера)
  let price = 1200 * places;
  const date1 = new Date()
  const inWeek = new Date()
  var D = new Date();
  D.setDate(D.getDate() - 15);
  // console.log(D);

  const randDate = randomDate(new Date(), D)
  let EndDate = new Date(randDate)
  EndDate.setDate(randDate.getDate() + 6);
  // console.log(3433, randomDate(new Date(), D));


  return {
    roomNum: id,
    id: id,
    places: places,
    price: price,
    bookPeriod: { start: randDate, end: EndDate }
  };
}


function getRandomInt(max: any) {
  return Math.floor(Math.random() * max) + 1;
}

function randomDate(start: Date, end:Date) {
  // console.log('start ', start);
  // console.log('end  - ', end);

  return new Date(start.getTime()
    + Math.random() * (end.getTime() - start.getTime()));
}
