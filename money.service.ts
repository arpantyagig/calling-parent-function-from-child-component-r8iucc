import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoneyService {
  private childrenMoneySubject: BehaviorSubject<any[]> = new BehaviorSubject<
    any[]
  >([]);
  private childrenMoney: any[] = [];

  constructor() {}

  getChildMoney(name: string): Observable<number> {
    return new Observable<number>((observer) => {
      const child = this.childrenMoney.find((c) => c.name === name);
      observer.next(child.money);
    });
  }

  getChildrenMoney(): Observable<any[]> {
    return this.childrenMoneySubject.asObservable();
  }

  sendMoney(index: number, amount: number): void {
    this.childrenMoney[index].money += amount;
    this.childrenMoneySubject.next(this.childrenMoney);
  }

  receiveMoney(index: number, amount: number): void {
    this.childrenMoney[index].money -= amount;
    this.childrenMoneySubject.next(this.childrenMoney);
  }

  addChild(child: any): void {
    this.childrenMoney.push(child);
    this.childrenMoneySubject.next(this.childrenMoney);
  }

  addMoney(name: string, amount: number): void {
    const child = this.childrenMoney.find((c) => c.name === name);
    if (child) {
      child.money += amount;
      this.childrenMoneySubject.next(this.childrenMoney);
    }
  }

  sendMoneyToChild(child: any, amount: number): void {
    const currentMoney = this.childrenMoneySubject.getValue();
    const updatedMoney = [...currentMoney];
    const childIndex = this['childrenData'].findIndex(
      (c) => c.name === child.name
    );
    updatedMoney[childIndex] += amount;
    this.childrenMoneySubject.next(updatedMoney);
  }
}
