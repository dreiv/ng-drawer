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

  drawersWidth: string;
  areDrawersDocked: boolean;
  drawersMode: DrawerMode;
  showFooter: boolean;
  isFooterTransitioning: boolean;
  isSideMode: boolean;

  constructor(private document$: DocumentService) {}

  ngOnInit(): void {
    this.formFactor = this.document$.formFactor$.getValue();
    this.updateDrawers(this.formFactor);
  }

  ngAfterViewInit(): void {
    this.document$.formFactor$
      .filter(formFactor => formFactor !== this.formFactor)
      .subscribe((formFactor: FormFactor) => {
        this.formFactor = formFactor;
        this.updateDrawers(formFactor);
      });
  }

  private updateDrawers(formFactor: FormFactor): void {
    this.drawersWidth = this.drawerWidth(formFactor);
    this.areDrawersDocked = this.drawerDocked(formFactor);
    this.drawersMode = this.drawerMode(formFactor);
    this.isSideMode = this._isSideMode(formFactor);
    const show = this._showFooter(formFactor);
    if (show !== this.showFooter) {
      this.isFooterTransitioning = true;
    }
    this.showFooter = show;
  }

  private drawerDocked(formFactor: FormFactor): boolean {
    return this.isMediumOrLarge(formFactor);
  }

  private _showFooter(formFactor: FormFactor): boolean {
    return formFactor === FormFactor.S;
  }

  private drawerWidth(formFactor: FormFactor): string {
    return this.isMediumOrLarge(formFactor) ? '20rem' : null;
  }

  private drawerMode(formFactor: FormFactor): DrawerMode {
    switch (formFactor) {
      case FormFactor.XL:
        return DrawerMode.Side;
      case FormFactor.L:
        return DrawerMode.Push;
      default:
        return DrawerMode.Over;
    }
  }

  private _isSideMode(formFactor: FormFactor): boolean {
    return formFactor === FormFactor.XL;
  }

  private isMediumOrLarge(formFactor: FormFactor): boolean {
    return formFactor === FormFactor.M || formFactor === FormFactor.L;
  }
}
