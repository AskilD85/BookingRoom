import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { init } from './store/actions/rooms.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor(private store: Store)
  {
    this.store.dispatch(init())
  }
}
