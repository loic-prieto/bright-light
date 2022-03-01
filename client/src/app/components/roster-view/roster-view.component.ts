import {Location} from '@angular/common';
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {CatalogueUnit} from 'src/app/model/CatalogueUnit';
import {Roster, ShortCatalogue} from 'src/app/model/Roster';
import {RosterUnit} from 'src/app/model/RosterUnit';

/**
 * Allows the full edition of a roster.
 * This is the main view of the bright light application.
 */
@Component({
    selector: 'bl-roster-view',
    templateUrl: './roster-view.component.html',
    styleUrls: ['./roster-view.component.css']
})
export class RosterViewComponent {

    roster: Roster;
    catalogueInfo: ShortCatalogue

    constructor(
        private _router: Router,
        private _location: Location) {
        const navigation = _router.getCurrentNavigation()
        if (navigation?.extras?.state) {
            this.roster = navigation.extras.state['roster']
            if (!this.roster) {
                throw new Error("A roster has not been given to the component")
            }
            this.catalogueInfo = this.roster.getCatalogue()
        } else {
            throw new Error("The roster view component cannot find the roster that should be provided in the navigation state")
        }
    }

  addUnit(unit: CatalogueUnit) {
      this.roster.addUnit(RosterUnit.fromCatalogueUnit(unit))
  }
}
