import { AfterViewInit, Component, QueryList, ViewChildren } from '@angular/core';
import { DrawerComponent } from './modules/drawer/components/drawer/drawer.component';
import { DocumentService } from './services/document.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChildren(DrawerComponent) drawers: QueryList<DrawerComponent>;

  constructor(private documentSpy$: DocumentService) { }

  ngAfterViewInit(): void {
    this.documentSpy$.windowWidth$
      .map(width => width > 800)
      .distinctUntilChanged()
      .subscribe((shouldBeDocked: boolean) => {
        this.drawers.forEach((drawer: DrawerComponent) => {
          // TODO: find a better way to do this
          // Added this timeout to avoid angular changed after checked error.
          setTimeout(() => {
            drawer.dock = shouldBeDocked;
          });
        });
      });
  }
}
