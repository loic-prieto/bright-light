import { Injectable } from '@angular/core';
import { Roster } from '../model/Roster';
import { Unit } from '../model/Unit';

@Injectable({
  providedIn: 'root',
})
export class RosterService {
  constructor() { }

  public getMockRoster(): Roster {
      let mockRoster = new Roster();
      mockRoster.addUnit(new Unit("Blades of Sederath","Edged Elves Fighters","Sederath is a badass guy leading this squad"))
      mockRoster.addUnit(new Unit("Shark Jumpers","Laser-equipped raptors","Raptors with tank destroying lasers roaring their angst"))
      mockRoster.addUnit(new Unit("The Loyal","Lobotomised Penal Serfs","They no longer served a purpose in their lands and are now commited to a higher cause"))

      return mockRoster;
  }
}