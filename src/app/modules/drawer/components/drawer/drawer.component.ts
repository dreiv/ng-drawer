import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
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
export class DrawerComponent implements OnInit {
  @HostBinding('style') private style: SafeStyle;

  /** Whether the drawer is opened. */
  @Input()
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
  get docked(): boolean {
    return this._docked;
  }

  set docked(value: boolean) {
    this._docked = value;
    this.onDockedStateChange.emit();
    this.computeStyle();
  }

  private _docked: boolean;

  @Input()
  get dockedSize(): string {
    return this._dockedSize;
  }

  set dockedSize(value: string) {
    this._dockedSize = value;
    this.onDockedStateChange.emit();
    this.computeStyle();
  }

  /** Emits whenever the drawer docked state changes. */
  @Output() onDockedStateChange = new EventEmitter();

  private _dockedSize = '50px';

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.computeStyle();
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

  private computeStyle() {
    let transformStyle = `transform:`;

    if (!this.opened) {
      switch (this.position) {
        case DrawerPosition.Start:
          transformStyle += `translateX(-100%)`;
          break;
        case DrawerPosition.End:
          transformStyle += `translateX(100%)`;
          break;
      }
      if (this.docked) {
        switch (this.position) {
          case DrawerPosition.Start:
            transformStyle += ` translateX(${this.dockedSize})`;
            break;
          case DrawerPosition.End:
            transformStyle += ` translateX(-${this.dockedSize})`;
            break;
        }
      }
    } else {
      transformStyle += 'inherit';
    }

    this.style = this.sanitizer.bypassSecurityTrustStyle(transformStyle);
  }

}
