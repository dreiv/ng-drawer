import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
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
export class DrawerComponent implements OnInit {
  @HostBinding('style') private style;

  /** Whether the drawer is opened. */
  @Input()
  @HostBinding('class.opened')
  get opened(): boolean {
    return this._opened;
  }

  set opened(value: boolean) {
    this._opened = value;
  }

  private _opened: boolean;

  @HostBinding('class.start') private isStartPosition: boolean;

  @HostBinding('class.end') private isEndPosition: boolean;

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
  }

  private _docked: boolean;

  /** Emits whenever the drawer docked state changes. */
  @Output() onDockedStateChange = new EventEmitter();

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.isStartPosition = this.position === DrawerPosition.Start;
    this.isEndPosition = this.position === DrawerPosition.End;
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
