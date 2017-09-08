import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DrawerModule } from './modules/drawer/drawer.module';
import { DocumentService } from './services/document.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    DrawerModule
  ],
  providers: [DocumentService],
  bootstrap: [AppComponent]
})
export class AppModule {}
