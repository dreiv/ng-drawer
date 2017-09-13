import { AfterViewInit, Component, QueryList, ViewChildren } from '@angular/core';
import { DrawerComponent } from './modules/drawer/components/drawer/drawer.component';
import { DocumentService, FormFactor } from './services/document.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChildren(DrawerComponent) drawers: QueryList<DrawerComponent>;

  shouldDock = this.documentSpy$.formFactor$.getValue() !== FormFactor.PHONE;
  hideFooter = this.documentSpy$.formFactor$.getValue() !== FormFactor.PHONE;
  isFooterTransitioning: boolean;

  constructor(private documentSpy$: DocumentService) {}

  ngAfterViewInit(): void {
    this.documentSpy$.formFactor$
      .skip(1)
      .map(factor => factor !== FormFactor.PHONE)
      .distinctUntilChanged()
      .subscribe((shouldDock: boolean) => {
        this.drawers.forEach(drawer => drawer.docked = shouldDock);
        this.isFooterTransitioning = true;
        this.hideFooter = shouldDock;
      });
  }
}
