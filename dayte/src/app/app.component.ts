import {Component} from '@angular/core';
import { ConnectionService } from '@src/app/connection/connection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  constructor(public connectionService: ConnectionService) {}

}

