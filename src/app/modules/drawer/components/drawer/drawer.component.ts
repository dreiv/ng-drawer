import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

export type DrawerPosition = 'start' | 'end';

export const DrawerPosition = {
  Start: 'start' as DrawerPosition,
  End: 'end' as DrawerPosition
};

/**
 * <app-drawer>
 *
 * This component corresponds to a drawer that can be opened in the drawer container.
 *
 * Please refer to README.md for examples on how to use it.
 */
@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrawerComponent {
  @HostBinding('style') private style: SafeStyle = this.getStyle();

  /** Whether the drawer is opened. */
  @Input()
  get opened(): boolean {
    return this._opened;
  }

  set opened(value: boolean) {
    this._opened = value;
    this.style = this.getStyle();
  }

  private _opened: boolean;

  /** The side that the panel is attached to. */
  @Input() position: DrawerPosition = DrawerPosition.Start;

  /** Whether the drawer is docked to the side of the container. */
  @Input()
  get docked(): boolean {
    return this._docked;
  }

  set docked(value: boolean) {
    this._docked = value;
    this.style = this.getStyle();
  }

  private _docked: boolean;

  /** Emits whenever the panel has started opening. */
  @Output() onOpen = new EventEmitter();

  /** Emits whenever the panel has started closing. */
  @Output() onClose = new EventEmitter();

  constructor(private sanitizer: DomSanitizer) { }

  /** Open the drawer. */
  public open() {
    this.toggle(true);
  }

  /** Close the drawer. */
  public close() {
    this.toggle(false);
  }

  /**
   * Toggle the drawer.
   * @param isOpen Whether the drawer should be open.
   */
  toggle(isOpen: boolean = !this.opened) {
    this.opened = isOpen;
    isOpen ? this.onOpen.emit() : this.onClose.emit();
  }

  private getStyle(): SafeStyle {
    let transformStyle = `transform:`;

    if (!this.opened) {
      const isStart = this.position === DrawerPosition.Start;
      const transformPosition = `translateX(${isStart ? '-' : ''}100%)`;
      const transformDocked = this.docked ? ` translateX(${!isStart ? '-' : ''}50px)` : '';

      transformStyle += `${transformPosition}${transformDocked}`;
    } else {
      transformStyle += 'inherit';
    }

    return this.sanitizer.bypassSecurityTrustStyle(transformStyle);
  }

}
