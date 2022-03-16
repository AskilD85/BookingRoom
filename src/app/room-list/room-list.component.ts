import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { BookDates } from '../model/BookRoomData';
import { BookPeriod, Room } from '../model/Room';
import { RoomBookComponent } from '../room-book/room-book.component';
import { BookRoom, init, bookRoom, cancelBookRoom } from '../store/actions/rooms.action';
import { loadRooms } from '../store/selectors/rooms.selectors';
import { HttpService } from './../services/http.service';



@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})



export class RoomListComponent implements OnInit, AfterViewInit, OnDestroy {
  filterDictionary = new Map<string, string>();
  rooms!: Room[];
  serverIsOk!: boolean;
  displayedColumns: string[] = ['num', 'places', 'price'];
  sRooms: Subscription = new Subscription;
  rooms$ = this.store.select(loadRooms)
  dataSource: MatTableDataSource<Room> = new MatTableDataSource(this.rooms);
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });


  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort!: MatSort ;
  constructor(private httpService: HttpService,
              public dialog: MatDialog,
              private store: Store) {
    // Create 40 rooms
    // const rooms = Array.from({ length: 40 }, (_, k) => createNewRooms(k + 1));
    // Assign the data to the data source for the table to render
    //
  }
  ngOnDestroy(): void {
    if (this.sRooms) {
      this.sRooms.unsubscribe()
    }
    throw new Error('Method not implemented.');
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.rooms);
    this.dataSource.paginator = this.paginator || null;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data, filter) => {
      var map = new Map(JSON.parse(filter));
      let startDate = false;
      let endDate = false;
      let isMatch = false

      for (let [key, value] of map) {
        if (key === 'start') {
          let date1 = new Date((data.bookPeriod[key as keyof BookPeriod]))
          let dd = new Date(String(value))
          startDate = date1 >= dd;
        }

        if (key === 'end') {
          let date1 = new Date((data.bookPeriod[key as keyof BookPeriod]))
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
  ngOnInit() {
    // this.getRooms()
    this.store.dispatch(init())

   this.sRooms =  this.rooms$.subscribe(
      (data) => {
        this.serverIsOk = true;
        this.rooms = data
        this.range.reset()
        this.dataSource = new MatTableDataSource(this.rooms);
        this.dataSource.paginator = this.paginator || null;
        this.dataSource.sort = this.sort;
      }
    )
  }

  getRooms() {
    console.log('getRooms ');
    // this.store.dispatch(init())

   /* this.range.reset()

    this.httpService.getRooms().subscribe(
      (data:any)=> {
        this.serverIsOk = true;
        this.rooms = data;
        console.log('норм: ', data);

        this.dataSource = new MatTableDataSource(this.rooms);

      }, (err) => {
        console.log(err);
        this.rooms = []
        this.serverIsOk = false;
      }
    );

    this.store.dispatch(init())
*/
  }

  bookRoom(room:any) {
    const dialogRef = this.dialog.open(RoomBookComponent, {
      width: '60%',
      data: room,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && (result.start !== null || result.end !== null) ) {
        this.bookedRoom(room.id, result);
      }
    });

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
    this.filterDictionary.set('end', 'All');
    var jsonString = JSON.stringify(Array.from(this.filterDictionary.entries()));
    this.dataSource.filter = jsonString;
    this.range.reset()

    this.getRooms()
  }
  //запись брони
  bookedRoom(id: number, bookPeriod: BookDates) {

    //копируем массив для дальнейшей обработки
    var arr = JSON.parse(JSON.stringify(this.rooms))

    if (bookPeriod === 'cancelBook') {
      arr.map((item:any) => { item.id === id ?  delete item.bookDates  : item.bookDates });
      let room = arr.filter((item:any) => item.id === id);
      this.httpService.bookedRoom(arr).subscribe(
        (data) => {
          console.log(data);
          // this.getRooms()
        })
      this.store.dispatch(cancelBookRoom(room[0]))
    } else {

      arr.map((item:Room) => { item && item.id === id ? item.bookDates = bookPeriod : item.bookDates });
      let rooms = arr.filter((item:any) => item.id === id);
      this.httpService.bookedRoom(arr).subscribe(
        (data) => {
          console.log(data);
          // this.getRooms()
        })
      this.store.dispatch(bookRoom(rooms[0]))
    }
  }

  initRooms() {
    this.store.dispatch(init())
  }
}
