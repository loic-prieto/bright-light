import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatListModule } from '@angular/material/list'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

import { CatalogueTreeComponent } from './components/catalogue-tree/catalogue-tree.component'
import { UnitListComponent } from './components/unit-list/unit-list.component';
import { RosterViewComponent } from './components/roster-view/roster-view.component';

@NgModule({
  declarations: [
    AppComponent,
    UnitListComponent,
    CatalogueTreeComponent,
    RosterViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // Material modules
    MatListModule,
    MatToolbarModule,
    MatTabsModule,
    MatTreeModule,
    MatIconModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
