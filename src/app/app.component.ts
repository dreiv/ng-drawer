import { AfterViewInit, Component, QueryList, ViewChildren } from '@angular/core';
import { DrawerComponent, DrawerMode } from './modules/drawer/components/drawer/drawer.component';
import { DocumentService, FormFactor } from './services/document.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChildren(DrawerComponent) drawers: QueryList<DrawerComponent>;

  width: string;
  docked: boolean;
  mode: DrawerMode;
  hideFooter: boolean;
  isFooterTransitioning: boolean;

  constructor(private document$: DocumentService) {
    this.docked = this.document$.formFactor$.getValue() !== FormFactor.PHONE;
    this.hideFooter = this.docked;
    this.width = this.setDrawerWidth(this.docked);
    this.mode = this.setDrawerMode(this.docked);
  }

  ngAfterViewInit(): void {
    this.document$.formFactor$
      .map(factor => factor !== FormFactor.PHONE)
      .filter(shouldDock => shouldDock !== this.docked)
      .subscribe(shouldDock => {
        this.docked = this.isFooterTransitioning = this.hideFooter = shouldDock;
        this.width = this.setDrawerWidth(shouldDock);
        this.mode = this.setDrawerMode(shouldDock);
      });
  }

  private setDrawerWidth(shouldDock: boolean): string {
    return shouldDock ? '400px' : undefined;
  }

  private setDrawerMode(shouldDock: boolean): DrawerMode {
    return shouldDock ? DrawerMode.Push : DrawerMode.Over;
  }
}
