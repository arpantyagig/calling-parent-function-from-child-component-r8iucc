import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MoneyService } from '../../../money.service';

@Component({
  selector: 'app-child-component',
  templateUrl: './child-component.component.html',
  styleUrls: ['./child-component.component.css'],
})
export class ChildComponentComponent implements OnInit {
  @Input() name: string;
  money: number;

  constructor(private moneyService: MoneyService) {
    this.moneyService.getChildMoney(this.name).subscribe((money) => {
      this.money = money;
    });
  }
  ngOnInit(): void {}

  getMoney(): void {
    this.moneyService.addMoney(this.name, 5);
  }
}
