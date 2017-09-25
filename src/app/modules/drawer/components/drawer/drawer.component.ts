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
    this._opened = value;
    if (this.docked) {
      this.isHeaderSpun = !value;
    }

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
    this.handlePositionClasses();
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

  @HostBinding('class.over') private isOverMode = true;
  @HostBinding('class.push') private isPushMode: boolean;
  @HostBinding('class.side') isSideMode: boolean;

  @Input()
  get mode(): DrawerMode {
    return this._mode;
  }

  set mode(value: DrawerMode) {
    this._mode = value;
    if (value === DrawerMode.Side) {
      this.isHeaderSpun = false;
    }

    this.handleModeClasses();
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
    this.handlePositionClasses();
    this.handleModeClasses();
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

  // Helpers
  handlePositionClasses(): void {
    this.isStartPosition = this._position === DrawerPosition.Start;
    this.isEndPosition = this._position === DrawerPosition.End;
  }

  handleModeClasses(): void {
    this.isOverMode = this._mode === DrawerMode.Over;
    this.isPushMode = this._mode === DrawerMode.Push;
    this.isSideMode = this._mode === DrawerMode.Side;
  }
}
