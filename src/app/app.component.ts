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

  private formFactor: FormFactor;
  width: string;
  docked: boolean;
  mode: DrawerMode;
  hideFooter: boolean;
  isFooterTransitioning: boolean;

  constructor(private document$: DocumentService) {
    this.formFactor = this.document$.formFactor$.getValue();

    this.docked = this.setDrawerDocked(this.formFactor);
    this.hideFooter = !this.showFooter(this.formFactor);
    this.width = this.setDrawerWidth(this.formFactor);
    this.mode = this.setDrawerMode(this.formFactor);
  }

  ngAfterViewInit(): void {
    this.document$.formFactor$
      .filter(formFactor => formFactor !== this.formFactor)
      .subscribe(formFactor => {
        this.formFactor = formFactor;

        this.docked = this.setDrawerDocked(formFactor);
        this.hideFooter = !this.showFooter(formFactor);
        this.width = this.setDrawerWidth(formFactor);
        this.mode = this.setDrawerMode(formFactor);
      });
  }

  private setDrawerDocked(formFactor: FormFactor): boolean {
    return formFactor === FormFactor.MEDIUM || formFactor === FormFactor.LARGE;
  }

  private showFooter(formFactor: FormFactor): boolean {
    return formFactor === FormFactor.SMALL;
  }

  private setDrawerWidth(formFactor: FormFactor): string {
    return formFactor === FormFactor.MEDIUM || formFactor === FormFactor.LARGE ? '400px' : undefined;
  }

  private setDrawerMode(formFactor: FormFactor): DrawerMode {
    return formFactor === FormFactor.LARGE ? DrawerMode.Push : DrawerMode.Over;
  }
}
