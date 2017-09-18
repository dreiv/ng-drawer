import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  HostBinding,
  HostListener,
  QueryList
} from '@angular/core';
import { startWith } from 'rxjs/operator/startWith';
import { DrawerComponent, DrawerMode, DrawerPosition } from '../drawer/drawer.component';

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

  @HostBinding('class.backdrop') private hasBackdrop;

  /** The drawer child that is currently opened. */
  private active: DrawerComponent;

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    if (this.hasBackdrop && !this.active.el().nativeElement.contains(event.target)) {
      this.active.close();
    }
  }

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
    startWith.call(drawer.onStateChange, null).subscribe(() => {

      if (drawer.opened && drawer.mode === DrawerMode.Push) {
        switch (drawer.position) {
          case DrawerPosition.Start:
            this.contentStyle.marginLeft = drawer.docked ? drawer.width : undefined;
            break;
          case DrawerPosition.End:
            this.contentStyle.marginRight = drawer.docked ? drawer.width : undefined;
            break;
        }
      } else {
        switch (drawer.position) {
          case DrawerPosition.Start:
            this.contentStyle.marginLeft = drawer.docked ? '50px' : undefined;
            break;
          case DrawerPosition.End:
            this.contentStyle.marginRight = drawer.docked ? '50px' : undefined;
            break;
        }
      }

      this.active = drawer.opened && drawer.mode === DrawerMode.Over ? drawer : undefined;
      this.hasBackdrop = this.active;

      this.ref.markForCheck();
    });

  }
}
