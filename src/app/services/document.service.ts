import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';


export enum FormFactor { PHONE, TABLET, DESKTOP }

@Injectable()
export class DocumentService {
  private windowResizeSpy$: Subject<any> = new Subject<any>();
  formFactor$: Subject<FormFactor> = new BehaviorSubject(this.getFormFactor());

  constructor(private zone: NgZone) {
    this.zone.runOutsideAngular(() => {
      Observable.fromEvent(window, 'resize')
        .debounceTime(500)
        .subscribe((e: Event) => {
          this.zone.run(() => {
            this.windowResizeSpy$.next(e);
          });
        });
    });

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
