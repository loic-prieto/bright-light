import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule }    from '@angular/common/http';

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
import { MatTooltipModule } from '@angular/material/tooltip';

import { CataloguePanelComponent } from './components/catalogue-panel/catalogue-panel.component'
import { UnitListComponent, UnitListRenameUnitDialogComponent, UnitListUnitNotesDialogComponent } from './components/unit-list/unit-list.component';
import { RosterViewComponent } from './components/roster-view/roster-view.component';
import { HomeScreenComponent} from './components/home-screen/home-screen.component';
import { HomeScreenCreateBandDialogComponent} from './components/home-screen/home-screen-create-band-dialog.component';
import { AlertDialog } from './components/dialogs/alert/alert-dialog.component';
import { DatasetCodec } from './services/datasets/dataset-reader.service'
import { BattlescribeDatasetCodec } from './services/datasets/battlescribe-codec';

/**
 * This DI token is used to dynamically inject the appropriate dataset reader. We will start with
 * the battlescribe codec in milestone alpha 2, but we are planning to have a "native" bright light 
 * codec in addition to the battlescribe one later on, if we feel the need to change the data format.
 * 
 * This is to be injected in the DatasetReader service.
 * 
 * Any part of the code can directly use the battlescribe codec service instead, if it wishes to do so.
 */
export declare const DATASET_CODEC_DI_TOKEN: InjectionToken<DatasetCodec>;

@NgModule({
  declarations: [
    AppComponent,
    UnitListComponent,
    CataloguePanelComponent,
    RosterViewComponent,
    UnitListRenameUnitDialogComponent,
    UnitListUnitNotesDialogComponent,
    HomeScreenComponent,
    HomeScreenCreateBandDialogComponent,
    // Standard dialogs
    AlertDialog
  ],
  imports: [
    // General Angular modules for web
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    // Http client to load server files
    HttpClientModule,
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
    MatSelectModule,
    MatTooltipModule
  ],
  providers: [
    // Material form field default style to fill as recommended
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}},
    // For now the implementer of datasetcodec is battlescribe
    {provide: DATASET_CODEC_DI_TOKEN, useClass: BattlescribeDatasetCodec}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
