import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(private appService: AppService) {
    console.debug('AppComponent initiated.');
  }

  public clearCurrentTask(): void {
    this.appService.taskForEditing$.next(null);
  }
}
