import { Injectable } from '@angular/core';
import { Roster } from '../model/Roster';
import { RosterUnit } from '../model/RosterUnit';

@Injectable({
  providedIn: 'root',
})
export class RosterService {
  constructor() { }

  public getMockRoster(): Roster {
      let mockRoster = new Roster();
      mockRoster.addUnit(new RosterUnit("Blades of Sederath","Edged Elves Fighters","Sederath is a badass guy leading this squad"))
      mockRoster.addUnit(new RosterUnit("Shark Jumpers","Laser-equipped raptors","Raptors with tank destroying lasers roaring their angst"))
      mockRoster.addUnit(new RosterUnit("The Loyal","Lobotomised Penal Serfs","They no longer served a purpose in their lands and are now commited to a higher cause"))

      return mockRoster;
  }
}