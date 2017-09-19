import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DrawerMode } from './modules/drawer/components/drawer/drawer.component';
import { DocumentService, FormFactor } from './services/document.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  private formFactor: FormFactor;

  drawerWidth: string;
  isDrawerDocked: boolean;
  drawerMode: DrawerMode;
  showFooter: boolean;
  isFooterTransitioning: boolean;

  constructor(private document$: DocumentService) {}

  ngOnInit(): void {
    this.formFactor = this.document$.formFactor$.getValue();
    this.updateDrawer(this.formFactor);
  }

  ngAfterViewInit(): void {
    this.document$.formFactor$
      .filter(formFactor => formFactor !== this.formFactor)
      .subscribe((formFactor: FormFactor) => {
        this.formFactor = formFactor;
        this.updateDrawer(formFactor);
      });
  }

  private updateDrawer(formFactor: FormFactor): void {
    this.drawerWidth = this.setDrawerWidth(formFactor);
    this.isDrawerDocked = this.setDrawerDocked(formFactor);
    this.drawerMode = this.setDrawerMode(formFactor);
    const show = this._showFooter(formFactor);
    if (show !== this.showFooter) {
      this.isFooterTransitioning = true;
    }
    this.showFooter = show;
  }

  private setDrawerDocked(formFactor: FormFactor): boolean {
    return this.isMediumOrLarge(formFactor);
  }

  private _showFooter(formFactor: FormFactor): boolean {
    return formFactor === FormFactor.S;
  }

  private setDrawerWidth(formFactor: FormFactor): string {
    return this.isMediumOrLarge(formFactor) ? '20rem' : null;
  }

  private setDrawerMode(formFactor: FormFactor): DrawerMode {
    switch (formFactor) {
      case FormFactor.XL:
        return DrawerMode.Side;
      case FormFactor.L:
        return DrawerMode.Push;
      default:
        return DrawerMode.Over;
    }
  }

  private isMediumOrLarge(formFactor: FormFactor): boolean {
    return formFactor === FormFactor.M || formFactor === FormFactor.L;
  }
}
