import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

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
  @HostBinding('style') private style;

  /** Whether the drawer is opened. */
  @Input()
  @HostBinding('class.opened')
  get opened(): boolean {
    return this._opened;
  }

  set opened(value: boolean) {
    this._opened = value;
    this.computeStyle();
  }

  private _opened: boolean;

  /** The side that the panel is attached to. */
  @Input() position: DrawerPosition = DrawerPosition.Start;

  /** Whether the drawer is docked to the side of the container. */
  @Input()
  @HostBinding('class.docked')
  get docked(): boolean {
    return this._docked;
  }

  set docked(value: boolean) {
    this._docked = value;
    this.onDockedStateChange.emit();
    this.computeStyle();
  }

  private _docked: boolean;

  /** Emits whenever the drawer docked state changes. */
  @Output() onDockedStateChange = new EventEmitter();

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
  }

  private computeStyle(): void {
    let transformStyle = `transform:`;

    if (!this.opened) {
      const isStart = this.position === DrawerPosition.Start;

      transformStyle += `translateX(${isStart ? '-' : ''}100%)${this.docked ? ` translateX(${!isStart ? '-' : ''}50px` : ''}`;
    } else {
      transformStyle += 'inherit';
    }

    this.style = this.sanitizer.bypassSecurityTrustStyle(transformStyle);
  }
}
