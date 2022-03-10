import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BookPeriod, Room } from '../model/Room';
import { HttpService } from './../services/http.service';



@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})



export class RoomListComponent implements OnInit, AfterViewInit {

  filterDictionary = new Map<string, string>();
  rooms = [];

  displayedColumns: string[] = ['num', 'places', 'price'];
  dataSource!: MatTableDataSource<Room>;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort!: MatSort ;
  constructor(private httpService: HttpService) {
    // Create 40 rooms
    const rooms = Array.from({ length: 40 }, (_, k) => createNewRooms(k + 1));
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(rooms);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator || null;
    this.dataSource.sort = this.sort;
 }



  ngOnInit(): void {
//--------------------------
    // this.getRooms()

      this.dataSource.filterPredicate = (data, filter) => {
        var map = new Map(JSON.parse(filter));
        let startDate = false;
        let endDate = false;
        let isMatch = false

         for (let [key, value] of map) {
           if (key === 'start') {
             let date1 = new Date((data.bookPeriod[key as keyof BookPeriod]).toDateString())
             let dd = new Date(String(value))
             startDate = date1 >= dd;
          }

           if (key === 'end') {
             let date1 = new Date((data.bookPeriod[key as keyof BookPeriod]).toDateString())
             let dd = new Date(String(value))
             endDate = date1 <= dd;
           }

           if ((startDate === true && endDate === true) || value === 'All') {
             isMatch = true;
           }
         }

         return isMatch;
      }


  }

  getRooms() {
    this.httpService.getRooms().subscribe(
      (data:any)=> {
        this.rooms = data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator || null;
        this.dataSource.sort = this.sort;
      }
    )
  }



  applyDateFilter(event: MatDatepickerInputEvent<Date>) {
    const startDate = this.range.value.start;
    const endDate = this.range.value.end;

    this.filterDictionary.set('start', startDate !== (null || undefined) ? startDate : 'All');
    this.filterDictionary.set('end', endDate !== (null || undefined) ? endDate : 'All');
    var jsonString = JSON.stringify(Array.from(this.filterDictionary.entries()));
    this.dataSource.filter = jsonString;
  }

  showAll() {
    this.filterDictionary.set('start', 'All');
    var jsonString = JSON.stringify(Array.from(this.filterDictionary.entries()));
    this.dataSource.filter = jsonString;
    this.range.reset()
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