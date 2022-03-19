import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Room } from './../model/Room';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-room-book',
  templateUrl: './room-book.component.html',
  styleUrls: ['./room-book.component.scss']
})
export class RoomBookComponent implements OnInit {
  room: Room = this.data;
  range = new FormGroup({
    start: new FormControl( Validators.required),
    end: new FormControl(Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<RoomBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Room,) { }

  ngOnInit(): void {

  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
