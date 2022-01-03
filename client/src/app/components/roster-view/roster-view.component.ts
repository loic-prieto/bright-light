import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CatalogueUnit } from 'src/app/model/CatalogueUnit';
import { Roster } from 'src/app/model/Roster';
import { RosterUnit } from 'src/app/model/RosterUnit';
import { UnitCatalogue } from 'src/app/model/UnitCatalogue';
import { CatalogueListItem, CatalogueService } from 'src/app/services/catalogue.service';
import { AlertDialog } from '../dialogs/alert/alert-dialog.component';

@Component({
  selector: 'bl-roster-view',
  templateUrl: './roster-view.component.html',
  styleUrls: ['./roster-view.component.css']
})
export class RosterViewComponent implements OnInit {

  roster?: Roster;
  catalogue?: UnitCatalogue

  constructor(
    private route: ActivatedRoute, 
    private catalogueService: CatalogueService,
    private _dialog: MatDialog) {}

  ngOnInit(): void {
    this.route.data.subscribe(data=>{
      this.roster = data['roster'] as Roster
      let catalogueInfo = this.roster.getCatalogue()
      let fullCatalogueResult = this.catalogueService.getCatalogue(catalogueInfo.name,catalogueInfo.version)
      // As soon as we learn how to navigate back change this ugliness
      if(fullCatalogueResult.isNothing()) {
        AlertDialog.open(this._dialog,{
          title:"Error",
          message:`Could not find catalogue ${catalogueInfo.name}-${catalogueInfo.version}`,
          actionMessage: "Drat!"})
      }

      this.catalogue = fullCatalogueResult.extract()
    })
  }

  addUnit(unit: CatalogueUnit) {
    this.roster?.addUnit(RosterUnit.fromCatalogueUnit(unit))
  }
}
