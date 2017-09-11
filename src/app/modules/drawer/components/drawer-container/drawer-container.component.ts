import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, QueryList } from '@angular/core';
import { startWith } from 'rxjs/operator/startWith';
import { DrawerComponent, DrawerPosition } from '../drawer/drawer.component';

/**
 * <app-drawer-container>
 *
 * This is the parent component to one up to two <app-drawer>s that validates their state internally and coordinates their backdrop and
 * content styling.
 */
@Component({
  selector: 'app-drawer-container',
  templateUrl: './drawer-container.component.html',
  styleUrls: ['./drawer-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrawerContainerComponent implements AfterContentInit {
  @ContentChildren(DrawerComponent) drawers: QueryList<DrawerComponent>;

  contentStyle: CSSStyleDeclaration = {} as CSSStyleDeclaration;

  constructor(private ref: ChangeDetectorRef) { }

  ngAfterContentInit(): void {
    this.validatePanels();
    this.drawers.forEach(drawer => this.watch(drawer));
  }

  /** Validate the state of the drawer children components. */
  private validatePanels() {
    if (this.drawers.length > 2) {
      throw Error(`A maximum of two drawers can be declared for a drawer container.`);
    } else if (this.drawers.length === 2 && this.drawers.first.position === this.drawers.last.position) {
      throw Error(`A drawer was already declared for 'position="${this.drawers.first.position}"'.`);
    }
  }

  /** Actions done on panel events. */
  private watch(drawer: DrawerComponent): void {
    startWith.call(drawer.onDockedStateChange, null).subscribe(() => {
      switch (drawer.position) {
        case DrawerPosition.Start:
          this.contentStyle.marginLeft = drawer.docked ? drawer.dockedSize : 'inherit';
          break;
        case DrawerPosition.End:
          this.contentStyle.marginRight = drawer.docked ? drawer.dockedSize : 'inherit';
          break;
      }

      this.ref.markForCheck();
    });
  }
}
