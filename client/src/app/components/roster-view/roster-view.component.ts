import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Nothing } from 'purify-ts';
import { CatalogueUnit } from 'src/app/model/CatalogueUnit';
import { Roster } from 'src/app/model/Roster';
import { RosterUnit } from 'src/app/model/RosterUnit';
import { UnitCatalogue } from 'src/app/model/UnitCatalogue';
import { CatalogueService } from 'src/app/services/catalogue.service';
import { AlertDialog } from '../dialogs/alert/alert-dialog.component';

/**
 * Allows the full edition of a roster. 
 * This is the main view of the bright light application.
 */
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
      const navigation = _router.getCurrentNavigation()
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
    const catalogueInfo = this.roster.getCatalogue()
    const fullCatalogueResult = this.catalogueService.getCatalogue(catalogueInfo.name,catalogueInfo.version)
    fullCatalogueResult.ifLeft((error)=>{
      AlertDialog.open(this._dialog,`There was an error while loading catalogue ${catalogueInfo.name}-${catalogueInfo.version}: ${error.message}`,"Drat!")
        .afterClosed().subscribe(()=>{
          this._location.back()
        })
    })
    .orDefault(Nothing)
    .ifNothing(()=>{
      AlertDialog.open(this._dialog,`Could not find catalogue ${catalogueInfo.name}-${catalogueInfo.version}`,"Drat!")
      .afterClosed().subscribe(()=>{
        this._location.back()
      })
    })
    .ifJust(catalogue=>{
      this.catalogue = catalogue
    })
  }

  addUnit(unit: CatalogueUnit) {
    this.roster?.addUnit(RosterUnit.fromCatalogueUnit(unit))
  }
}
