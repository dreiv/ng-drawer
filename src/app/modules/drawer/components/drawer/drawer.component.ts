import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output } from '@angular/core';

export type DrawerPosition = 'start' | 'end';

export const DrawerPosition = {
  Start: 'start' as DrawerPosition,
  End: 'end' as DrawerPosition
};

export type DrawerOverlayMode = 'over' | 'push';

export const DrawerMode = {
  Over: 'over' as DrawerOverlayMode,
  Push: 'push' as DrawerOverlayMode
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
export class DrawerComponent implements OnInit {
  /** Whether the drawer is opened. */
  @Input()
  @HostBinding('class.opened')
  get opened(): boolean {
    return this._opened;
  }

  set opened(value: boolean) {
    if (this.docked) {
      this.isHeaderSpun = !value;
    }
    this._opened = value;
  }

  private _opened: boolean;

  @HostBinding('class.start') private isStartPosition = true;
  @HostBinding('class.end') private isEndPosition: boolean;

  /** The side that the panel is attached to. */
  @Input()
  get position(): DrawerPosition {
    return this._position;
  }

  set position(value: DrawerPosition) {
    this.isStartPosition = value === DrawerPosition.Start;
    this.isEndPosition = value === DrawerPosition.End;

    this._position = value;
  }

  private _position: DrawerPosition = DrawerPosition.Start;

  /** Emits whenever the drawer docked state changes. */
  @Output() onDockedStateChange = new EventEmitter();

  /** Whether the drawer is docked to the side of the container. */
  @Input()
  @HostBinding('class.docked')
  get docked(): boolean {
    return this._docked;
  }

  set docked(value: boolean) {
    this._docked = value;
    if (!this.opened && value) {
      this.isHeaderSpun = value;
    }

    this.onDockedStateChange.emit();
  }

  private _docked: boolean;

  @Output() onModeStateChange = new EventEmitter();

  @Input()
  get mode(): DrawerOverlayMode {
    return this._mode;
  }

  set mode(value: DrawerOverlayMode) {
    this._mode = value;

    this.onModeStateChange.emit();
  }

  private _mode: DrawerOverlayMode;

  @Input()
  @HostBinding('style.width')
  get width(): string {
    return this._width;
  }

  set width(value: string) {
    this._width = value;
  }

  private _width: string;

  isHeaderSpun: boolean;

  @HostListener('transitionend')
  onTransitionEnd() {
    if (!this.docked) {
      this.isHeaderSpun = false;
    }
  }

  constructor() {}

  ngOnInit(): void {
    this.isStartPosition = this._position === DrawerPosition.Start;
    this.isEndPosition = this._position === DrawerPosition.End;
  }

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
}
