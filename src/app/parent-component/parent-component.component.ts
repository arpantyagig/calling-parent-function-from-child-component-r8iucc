import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { MoneyService } from '../../../money.service';

@Component({
  selector: 'app-parent-component',
  templateUrl: './parent-component.component.html',
  styleUrls: ['./parent-component.component.css'],
})
export class ParentComponentComponent implements OnInit {
  childrenData = [
    { name: 'Jack', money: 10 },
    { name: 'Jill', money: 15 },
  ];

  newChildName: string;

  constructor(private moneyService: MoneyService) {}

  ngOnInit(): void {
    interval(60000) // Emit a value every 1 minute
      .pipe(
        mergeMap(() => {
          // Send money to each child
          return this.childrenData.map((child) =>
            this.moneyService.sendMoneyToChild(child, 5)
          );
        })
      )
      .subscribe();
  }

  createChild(): void {
    if (this.newChildName) {
      const newChild = { name: this.newChildName, money: 0 };
      this.childrenData.push(newChild);
      this.moneyService.addChild(newChild);
      this.newChildName = '';
    }
  }

  sendMoney(child: any): void {
    const index = this.childrenData.indexOf(child);
    this.moneyService.sendMoney(index, 10);
  }

  getMoneyFromChild(child: any): void {
    const index = this.childrenData.indexOf(child);
    this.moneyService.receiveMoney(index, 10);
  }
}
