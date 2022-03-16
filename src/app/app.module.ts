import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomListComponent } from './room-list/room-list.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialExampleModule } from './material.module';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RoomBookComponent } from './room-book/room-book.component';
import { StoreModule } from '@ngrx/store';
import { roomReducer, roomsReducer, metaReducers } from './store/reducers/rooms.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { RoomsEffect } from './store/effects/rooms.effects';

@NgModule({
  declarations: [
    AppComponent,
    RoomListComponent,
    ErrorPageComponent,
    RoomBookComponent
  ],
  imports: [
   BrowserAnimationsModule,
     BrowserModule,
     FormsModule,
    //  HttpClientModule,
    //  MatNativeDateModule,
     MaterialExampleModule,
     ReactiveFormsModule,
     AppRoutingModule,
     NgbModule,
    HttpClientModule,
    StoreModule.forRoot({ 'roomPage': roomReducer, },  {
      metaReducers
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([RoomsEffect]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
