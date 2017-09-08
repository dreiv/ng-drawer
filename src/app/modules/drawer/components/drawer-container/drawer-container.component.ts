import { AfterContentInit, Component, ContentChildren, QueryList } from '@angular/core';
import { startWith } from 'rxjs/operator/startWith';
import { DrawerComponent } from '../drawer/drawer.component';

/** Throws an exception when two <app-drawer>s are matching the same position. */
export function throwDuplicatedError(position: string) {
  throw Error(`A drawer was already declared for 'position="${position}"'`);
}

/**
 * <app-drawer-container>
 *
 * This is the parent component to one up to two <app-drawer>s that validates their state internally and coordinates their backdrop and
 * content styling.
 */
@Component({
  selector: 'app-drawer-container',
  templateUrl: './drawer-container.component.html',
  styleUrls: ['./drawer-container.component.scss']
})
export class DrawerContainerComponent implements AfterContentInit {
  @ContentChildren(DrawerComponent) panels: QueryList<DrawerComponent>;
  /** The drawer child with the `start` position. */
  private start: DrawerComponent;
  /** The drawer child with the `end` position. */
  private end: DrawerComponent;

  constructor() { }

  ngAfterContentInit(): void {
    startWith.call(this.panels.changes, null).subscribe(() => {
      this.validatePanels();
    });
  }

  /** Validate the state of the drawer children components. */
  private validatePanels() {
    this.start = this.end = null;

    // Ensure that we have at most one start and one end drawer.
    this.panels.forEach(panel => {
      if (panel.position === 'end') {
        if (this.end) {
          throwDuplicatedError('end');
        }

        this.end = panel;
      } else {
        if (this.start) {
          throwDuplicatedError('start');
        }

        this.start = panel;
        this.start.position = 'start';
      }
    });
  }

}
