import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';

interface IRatingUnit{
  value: number;
  active: boolean;
}

@Component({
  selector: 'app-rating-bar',
  templateUrl: './rating-bar.component.html',
  styleUrls: ['./rating-bar.component.scss']
})
export class RatingBarComponent implements OnInit, OnChanges {
  @Input()
  max = 10;
  @Input()
  ratingValue = 5;  //giá trị xếp hạng
  @Input()
  showRatingValue = true;

  @Output()
  rateChange  = new EventEmitter<number>();

  ratingUnits: Array<IRatingUnit> = [];

  constructor() { }

  ngOnInit(): void {
    this.calculator(this.max, this.ratingValue);
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if('max' in changes){
      let max = changes.max.currentValue;
      max = typeof max === undefined ? 5 : max;
      this.max = max;
      this.calculator(max, this.ratingValue);
    }
  }

  calculator(max, ratingValue){
    this.ratingUnits = Array.from({length: max},
    (_,index) => ({
      value: index + 1,
      active: index < ratingValue
    }));
  }

  select(index) {
    this.ratingValue = index + 1;
    this.ratingUnits.forEach((item, idx) => item.active = idx < this.ratingValue);
    //idx < this.ratingValue: điều kiện vòng lặp
    this.rateChange.emit(this.ratingValue);   //phát ra (emit) sự kiện.
  }

  //rê chuột vào sẽ sáng
  enter(index) {
    this.ratingUnits.forEach((item, idx) => item.active = idx <= index);
  }

  //reset lại khi rê chuột ra
  reset() {
    this.ratingUnits.forEach((item, idx) => item.active = idx < this.ratingValue);
  }

}
