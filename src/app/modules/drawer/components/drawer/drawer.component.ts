import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output
} from '@angular/core';

export type DrawerPosition = 'start' | 'end';

export const DrawerPosition = {
  Start: 'start' as DrawerPosition,
  End: 'end' as DrawerPosition
};

export type DrawerMode = 'over' | 'push' | 'side';

export const DrawerMode = {
  Over: 'over' as DrawerMode,
  Push: 'push' as DrawerMode,
  Side: 'side' as DrawerMode
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
  /** Emits whenever the drawer state changes. */
  @Output() onStateChange = new EventEmitter();

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
    this.zIndex = value && this.mode === DrawerMode.Over ? '1' : null;

    this._opened = value;

    this.onStateChange.emit();
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

    this.onStateChange.emit();
  }

  private _docked: boolean;

  @HostBinding('style.z-index')
  private zIndex: string;

  @Input()
  get mode(): DrawerMode {
    return this._mode;
  }

  set mode(value: DrawerMode) {
    this._mode = value;

    this.onStateChange.emit();
  }

  private _mode: DrawerMode = DrawerMode.Over;

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

  constructor(private elRef: ElementRef) {}

  public getElRef(): ElementRef {
    return this.elRef;
  }

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
