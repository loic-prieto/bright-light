import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { CreateBandDialogData, HomeScreenCreateBandDialogComponent } from './home-screen-create-band-dialog.component';

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
    const dialogRef: MatDialogRef<HomeScreenCreateBandDialogComponent,CreateBandDialogData> = this.createBandDialog.open(HomeScreenCreateBandDialogComponent,{data:{}} as MatDialogConfig<CreateBandDialogData>)
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