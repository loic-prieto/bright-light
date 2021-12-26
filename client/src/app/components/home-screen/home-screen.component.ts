import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { CatalogueListItem, CatalogueService } from 'src/app/services/catalogue.service';

/**
 * This is the component that is opened when the bright light client is opened.
 * It offers options to create a new band, saving or loading
 */
@Component({
  selector: 'bl-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent {

  constructor(
    private _snackBar: MatSnackBar,
    private createBandDialog: MatDialog,
    ) { }

  createNewBand() {
    const dialogRef: MatDialogRef<HomeScreenCreateBandDialogComponent,CreateBandDialogData> = this.createBandDialog.open(HomeScreenCreateBandDialogComponent,{} as MatDialogConfig<CreateBandDialogData>)
    dialogRef.afterClosed().subscribe(result => {
      if(result?.confirmed) {
        this._snackBar.open(`Good Job creating band ${result.bandName}!`,"Thanks!",{duration: 2000})
      }
    });
  }

  loadBand() {
    this._snackBar.open('Not implemented yet',"That's a shame",{duration: 3000})
  }

}

@Component({
  selector: 'bl-home-screen-create-new-band-dialog',
  templateUrl: './create-band-dialog.component.html',
})
export class HomeScreenCreateBandDialogComponent implements OnInit{

  availableCatalogues?: Array<CatalogueListItem>;

  constructor(
    public dialogRef: MatDialogRef<HomeScreenCreateBandDialogComponent,CreateBandDialogData>,
    @Inject(MAT_DIALOG_DATA) public data: CreateBandDialogData,
    private _catalogueService: CatalogueService
  ) {}

  ngOnInit(): void {
    this.availableCatalogues = this._catalogueService.getAvailableCatalogues()
  }

  onCancel(): void {
    this.dialogRef.close({confirmed: false})
  }
}

interface CreateBandDialogData {
  selectedCatalogue?: CatalogueListItem
  bandName?: string
  confirmed: boolean
}