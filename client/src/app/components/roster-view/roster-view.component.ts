import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogueUnit } from 'src/app/model/CatalogueUnit';
import { Roster } from 'src/app/model/Roster';
import { RosterUnit } from 'src/app/model/RosterUnit';
import { UnitCatalogue } from 'src/app/model/UnitCatalogue';
import { CatalogueService } from 'src/app/services/catalogue.service';
import { AlertDialog } from '../dialogs/alert/alert-dialog.component';
import { Location } from '@angular/common'

@Component({
  selector: 'bl-roster-view',
  templateUrl: './roster-view.component.html',
  styleUrls: ['./roster-view.component.css']
})
export class RosterViewComponent implements OnInit {

  roster: Roster;
  catalogue?: UnitCatalogue

  constructor(
    private _router: Router, 
    private _location: Location,
    private catalogueService: CatalogueService,
    private _dialog: MatDialog) {
      let navigation = _router.getCurrentNavigation()
      if(navigation?.extras?.state) {
        this.roster = navigation.extras.state['roster']
        if(!this.roster) {
          throw new Error("A roster has not been given to the component")
        }
      } else {
        throw new Error("The roster view component cannot find the roster that should be provided in the navigation state")
      }
    }

  ngOnInit(): void {
    let catalogueInfo = this.roster.getCatalogue()
    let fullCatalogueResult = this.catalogueService.getCatalogue(catalogueInfo.name,catalogueInfo.version)
    if(fullCatalogueResult.isNothing()) {
      AlertDialog.open(this._dialog,`Could not find catalogue ${catalogueInfo.name}-${catalogueInfo.version}`,"Drat!")
      this._location.back()
    }

    this.catalogue = fullCatalogueResult.extract()
  }

  addUnit(unit: CatalogueUnit) {
    this.roster?.addUnit(RosterUnit.fromCatalogueUnit(unit))
  }
}
