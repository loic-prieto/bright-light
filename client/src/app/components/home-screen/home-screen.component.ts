import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Roster } from 'src/app/model/Roster';
import { AlertDialog } from '../dialogs/alert/alert-dialog.component';
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
    private _dialog: MatDialog,
    private router: Router
    ) { }

  createNewBand() {
    const dialogRef: MatDialogRef<HomeScreenCreateBandDialogComponent,CreateBandDialogData> = this._dialog.open(HomeScreenCreateBandDialogComponent,{data:{bandName:"",selectedCatalogue:{},confirmed:false}} as MatDialogConfig<CreateBandDialogData>)
    dialogRef.afterClosed().subscribe(result => {
      if(result?.confirmed) {
        if (result.bandName && result?.selectedCatalogue) { // narrowing clause, this should never be false
          let roster = new Roster(result.bandName, result.selectedCatalogue,[]);
          this.router.navigate(['roster'],{state:{roster:roster}}).catch((error)=>{
            console.log(`Error while opening roster: ${error}`)
            AlertDialog.open(this._dialog,`Could not open the roster: ${error}`,"Fuck")
          })
        }
      }
    });
  }

  loadBand() {
    AlertDialog.open(this._dialog,"This functionality is not implemented yet","That's a shame")
  }

}