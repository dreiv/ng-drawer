import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

export enum FormFactor { S, M, L, XL }

@Injectable()
export class DocumentService {
  private onResize$: Subject<number> = new Subject();
  formFactor$: BehaviorSubject<FormFactor> = new BehaviorSubject(this.getFormFactor(window.innerWidth));

  constructor() {
    Observable.fromEvent<UIEvent>(window, 'resize')
      .debounceTime(250)
      .subscribe(() => this.onResize$.next(window.innerWidth));

    this.onResize$
      .map((deviceWidth: number) => this.getFormFactor(deviceWidth))
      .distinctUntilChanged()
      .subscribe((factor: FormFactor) => this.formFactor$.next(factor));
  }

  private getFormFactor(deviceWidth): FormFactor {
    if (deviceWidth < 768) {
      return FormFactor.S;
    } else if (deviceWidth < 1200) {
      return FormFactor.M;
    } else if (deviceWidth < 1600) {
      return FormFactor.L;
    } else {
      return FormFactor.XL;
    }
  }

}
