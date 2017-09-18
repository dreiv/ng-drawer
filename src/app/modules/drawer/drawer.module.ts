import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DrawerContainerComponent } from './components/drawer-container/drawer-container.component';
import { DrawerComponent } from './components/drawer/drawer.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    DrawerComponent,
    DrawerContainerComponent
  ],
  exports: [
    DrawerComponent,
    DrawerContainerComponent
  ]
})
export class DrawerModule {}
