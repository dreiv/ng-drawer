import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DocumentService {
  private windowResizeSpy$: Subject<any> = new Subject<any>();
  windowWidth$: BehaviorSubject<number>;

  constructor(private zone: NgZone) {
    this.zone.runOutsideAngular(() => {
      this.spyOnWindowResize();
    });

    this.windowResizeSpy$
      .distinctUntilChanged()
      .subscribe(() => {
        console.log('triggered');
      });
  }

  private spyOnWindowResize() {
    Observable.fromEvent(window, 'resize')
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe((e: Event) => {
        this.zone.run(() => {
          this.windowResizeSpy$.next(e);
        });
      });
  }

}
