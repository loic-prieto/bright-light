import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CatalogueListItem, CatalogueService } from "src/app/services/catalogue.service";
import { FormControl,Validators } from '@angular/forms';

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
      private _catalogueService: CatalogueService
    ) {}
  
    ngOnInit(): void {
      this.availableCatalogues = this._catalogueService.getAvailableCatalogues()
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