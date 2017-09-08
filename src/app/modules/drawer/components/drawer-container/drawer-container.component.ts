import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, QueryList } from '@angular/core';
import { DrawerComponent } from '../drawer/drawer.component';

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
  @ContentChildren(DrawerComponent) panels: QueryList<DrawerComponent>;

  constructor() { }

  ngAfterContentInit(): void {
    this.validatePanels();
  }

  /** Validate the state of the drawer children components. */
  private validatePanels() {
    if (this.panels.length > 2) {
      throw Error(`A maximum of two drawers can be declared for a drawer container.`);
    } else if (this.panels.length === 2 && this.panels.first.position === this.panels.last.position) {
      throw Error(`A drawer was already declared for 'position="${this.panels.first.position}"'.`);
    }
  }

}
