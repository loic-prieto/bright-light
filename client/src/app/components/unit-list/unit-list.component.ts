import { Component, OnInit} from '@angular/core';
import { Roster } from '../../model/Roster';
import { RosterService } from '../../services/roster.service';

@Component({
  selector: 'bl-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.css']
})
export class UnitListComponent implements OnInit {

  currentRoster?: Roster;

  constructor(private rosterService: RosterService) { }

  ngOnInit(): void {
    this.currentRoster = this.rosterService.getMockRoster();
  }

}
