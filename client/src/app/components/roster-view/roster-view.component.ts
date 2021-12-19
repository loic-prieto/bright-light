import { Component, OnInit } from '@angular/core';
import { UnitCatalogue } from 'src/app/model/UnitCatalogue';
import { RosterViewService } from 'src/app/services/roster-view.service';

@Component({
  selector: 'bl-roster-view',
  templateUrl: './roster-view.component.html',
  styleUrls: ['./roster-view.component.css'],
  providers: [ RosterViewService ]
})
export class RosterViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onUnitAdded(unit: UnitCatalogue) {

  }
}
