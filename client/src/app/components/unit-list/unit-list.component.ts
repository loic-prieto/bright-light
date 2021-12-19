import { Component, OnInit} from '@angular/core';
import { CatalogueUnit } from 'src/app/model/CatalogueUnit';
import { RosterUnit } from 'src/app/model/RosterUnit';
import { RosterViewService } from 'src/app/services/roster-view.service';
import { Roster } from '../../model/Roster';
import { RosterService } from '../../services/roster.service';

@Component({
  selector: 'bl-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.css']
})
export class UnitListComponent implements OnInit {

  currentRoster?: Roster;

  constructor(private rosterService: RosterService, private rosterViewService: RosterViewService) {
    this.rosterViewService.unitAdded$.subscribe((unit)=>this.addUnit(unit))
   }
  
   private addUnit(unit: CatalogueUnit) {
     this.currentRoster?.addUnit(RosterUnit.fromCatalogueUnit(unit))
   }

  ngOnInit(): void {
    this.currentRoster = this.rosterService.getMockRoster();
  }

}
