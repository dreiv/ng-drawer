import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';

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
  /** Whether the drawer is opened. */
  @HostBinding('class.opened') private opened: boolean;
  /** Whether the drawer is located at the start of it's container. */
  @HostBinding('class.start') private isPositionStart: boolean;
  /** Whether the drawer is located at the end of it's container. */
  @HostBinding('class.end') private isPositionEnd: boolean;

  /** The side that the panel is attached to. */
  @Input() position: DrawerPosition = DrawerPosition.Start;
  /** Whether the drawer is docked to the side of the container. */
  @HostBinding('class.docked')
  @Input() dock: boolean;

  /** Emits whenever the panel has started opening. */
  @Output() onOpen = new EventEmitter();

  /** Emits whenever the panel has started closing. */
  @Output() onClose = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.isPositionStart = this.position === DrawerPosition.Start;
    this.isPositionEnd = this.position === DrawerPosition.End;
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
    isOpen ? this.onOpen.emit() : this.onClose.emit();
  }

}
