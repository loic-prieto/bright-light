import { Component, OnInit} from '@angular/core';
import { Roster } from '../model/Roster';
import { RosterService } from '../services/RosterService';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css']
})
export class RosterComponent implements OnInit {

  currentRoster?: Roster;

  constructor(private rosterService: RosterService) { }

  ngOnInit(): void {
    this.currentRoster = this.rosterService.getMockRoster();
  }

}
