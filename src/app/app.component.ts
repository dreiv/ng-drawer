import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DrawerComponent } from './modules/drawer/components/drawer/drawer.component';
import { DocumentService, FormFactor } from './services/document.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChildren(DrawerComponent) drawers: QueryList<DrawerComponent>;

  @ViewChild('footer')
  set footer(footer: ElementRef) {
    this._footer = footer;

    if (footer) {
      footer.nativeElement.addEventListener('transitionend', () => {
        this.footerIsTransitioning = false;
      });
    }
  }

  private _footer: ElementRef;
  shouldDock = this.documentSpy$.formFactor$.getValue() !== FormFactor.PHONE;
  hideFooter = this.documentSpy$.formFactor$.getValue() !== FormFactor.PHONE;
  footerIsTransitioning: boolean;

  constructor(private documentSpy$: DocumentService) {}

  ngAfterViewInit(): void {
    this.documentSpy$.formFactor$
      .skip(1)
      .map(factor => factor !== FormFactor.PHONE)
      .distinctUntilChanged()
      .subscribe((shouldDock: boolean) => {
        this.drawers.forEach(drawer => drawer.docked = shouldDock);
        this.footerIsTransitioning = true;
        this.hideFooter = shouldDock;
      });
  }
}
