import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

export enum FormFactor { PHONE, TABLET, DESKTOP }

@Injectable()
export class DocumentService {
  private windowResizeSpy$: Subject<void> = new Subject<void>();
  formFactor$: BehaviorSubject<FormFactor> = new BehaviorSubject(this.getFormFactor());

  constructor() {
    Observable.fromEvent(window, 'resize')
      .debounceTime(500)
      .subscribe(() => this.windowResizeSpy$.next());

    this.windowResizeSpy$
      .map(() => this.getFormFactor())
      .distinctUntilChanged()
      .subscribe((factor: FormFactor) => {
        this.formFactor$.next(factor);
      });
  }

  private getFormFactor(): FormFactor {
    const deviceWidth = window.innerWidth;

    if (deviceWidth < 768) {
      return FormFactor.PHONE;
    } else if (deviceWidth < 1200) {
      return FormFactor.TABLET;
    } else {
      return FormFactor.DESKTOP;
    }
  }

}
