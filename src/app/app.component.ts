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

  docked = this.document$.formFactor$.getValue() !== FormFactor.PHONE;
  hideFooter = this.document$.formFactor$.getValue() !== FormFactor.PHONE;
  isFooterTransitioning: boolean;

  constructor(private document$: DocumentService) {}

  ngAfterViewInit(): void {
    this.document$.formFactor$
      .map(factor => factor !== FormFactor.PHONE)
      .filter(shouldDock => shouldDock !== this.docked)
      .subscribe(shouldDock => this.docked = this.isFooterTransitioning = this.hideFooter = shouldDock);
  }
}
