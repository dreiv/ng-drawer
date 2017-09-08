import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

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
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent {
  /** Whether the drawer is opened. */
  @HostBinding('class.opened') opened: boolean;

  /** Whether the drawer is located at the start of it's container. */
  @HostBinding('class.start')
  get isStart() {
    return this.position === 'start';
  }

  /** Whether the drawer is located at the end of it's container. */
  @HostBinding('class.end')
  get isEnd() {
    return this.position === 'end';
  }

  /** The side that the panel is attached to. */
  @Input() position: 'start' | 'end';
  /** Whether the drawer is docked to the side of the container. */
  @Input() dock: boolean;

  /** Emits whenever the panel has started opening. */
  @Output() onOpen = new EventEmitter();

  /** Emits whenever the panel has started closing. */
  @Output() onClose = new EventEmitter();

  constructor() { }

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
