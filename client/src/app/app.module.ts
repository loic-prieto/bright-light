import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatListModule } from '@angular/material/list'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';

import { CataloguePanelComponent } from './components/catalogue-panel/catalogue-panel.component'
import { UnitListComponent, UnitListRenameUnitDialogComponent } from './components/unit-list/unit-list.component';
import { RosterViewComponent } from './components/roster-view/roster-view.component';
import { HomeScreenComponent} from './components/home-screen/home-screen.component';
import { HomeScreenCreateBandDialogComponent} from './components/home-screen/home-screen-create-band-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    UnitListComponent,
    CataloguePanelComponent,
    RosterViewComponent,
    UnitListRenameUnitDialogComponent,
    HomeScreenComponent,
    HomeScreenCreateBandDialogComponent
  ],
  imports: [
    // General Angular modules for web
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    // Material modules
    MatListModule,
    MatToolbarModule,
    MatTabsModule,
    MatIconModule,
    MatSidenavModule,
    MatExpansionModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSelectModule
  ],
  providers: [
    // Material form field default style to fill as recommended
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
