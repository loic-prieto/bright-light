import { Component, OnInit } from '@angular/core';
import { UnitCatalogue } from 'src/app/model/UnitCatalogue';
import { RosterViewService } from 'src/app/services/roster-view.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Roster } from 'src/app/model/Roster';

@Component({
  selector: 'bl-roster-view',
  templateUrl: './roster-view.component.html',
  styleUrls: ['./roster-view.component.css'],
  providers: [ RosterViewService ]
})
export class RosterViewComponent implements OnInit {

  roster?: Roster;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      
    })
  }

  onUnitAdded(unit: UnitCatalogue) {

  }
}
