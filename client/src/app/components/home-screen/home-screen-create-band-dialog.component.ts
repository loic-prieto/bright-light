import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CatalogueListItem, CatalogueService } from "src/app/services/catalogue.service";
import { FormControl,Validators } from '@angular/forms';
import { AlertDialog } from '../dialogs/alert/alert-dialog.component';

@Component({
    selector: 'bl-home-screen-create-new-band-dialog',
    templateUrl: './create-band-dialog.component.html',
    styleUrls: ['./create-band-dialog.component.css']
  })
  export class HomeScreenCreateBandDialogComponent implements OnInit{

    catalogueControl = new FormControl('', [Validators.required])
    bandNameControl = new FormControl('',[Validators.required])
  
    availableCatalogues?: Array<CatalogueListItem>;
  
    constructor(
      public dialogRef: MatDialogRef<HomeScreenCreateBandDialogComponent,CreateBandDialogData>,
      @Inject(MAT_DIALOG_DATA) public data: CreateBandDialogData,
      private catalogueService: CatalogueService,
      private alertDialog: MatDialog
    ) {}
  
    ngOnInit(): void {
      // This will have to be async in the future
      this.availableCatalogues = this.catalogueService.getAvailableCatalogues()
        .ifLeft((error)=>{
          console.error(`Could not load list of available catalogues: ${error.message}`)
          AlertDialog.open(this.alertDialog,"The catalogues could not be loaded, check console for errors","Why is life so difficult?")
        })
        .orDefault([])
    }
  
    onCancel(): void {
      this.dialogRef.close({confirmed: false})
    }

  }
  
  export interface CreateBandDialogData {
    selectedCatalogue?: CatalogueListItem
    bandName?: string
    confirmed: boolean
  }