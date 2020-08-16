import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rating-bar';
  countDownMessage = '';

  onRateChange(value){
    console.log(value);
  }

  onCountDown(){
    this.countDownMessage = "Ended!"
  }
}
