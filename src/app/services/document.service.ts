import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DocumentService {
  private windowResizeSpy$: Subject<any> = new Subject<any>();
  windowWidth$: Subject<number> = new BehaviorSubject(window.innerWidth);

  constructor(private zone: NgZone) {
    this.zone.runOutsideAngular(() => {
      this.spyOnWindowResize();
    });

    this.windowResizeSpy$
      .map(() => window.innerWidth)
      .distinctUntilChanged()
      .subscribe((width: number) => {
        this.windowWidth$.next(width);
      });
  }

  private spyOnWindowResize() {
    Observable.fromEvent(window, 'resize')
      .debounceTime(500)
      .subscribe((e: Event) => {
        this.zone.run(() => {
          this.windowResizeSpy$.next(e);
        });
      });
  }

}
