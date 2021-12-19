import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CatalogueUnit } from 'src/app/model/CatalogueUnit';
import { UnitCatalogue } from 'src/app/model/UnitCatalogue';
import { CatalogueService } from 'src/app/services/catalogue.service';
import { RosterViewService } from 'src/app/services/roster-view.service';

@Component({
  selector: 'bl-catalogue-panel',
  templateUrl: './catalogue-panel.component.html',
  styleUrls: ['./catalogue-panel.component.css']
})
export class CataloguePanelComponent implements OnInit {

  categoryClassification: Array<CategoryUnits> = [];

  @Output() onUnitAdded = new EventEmitter<UnitCatalogue>();

  constructor(private catalogService: CatalogueService, private rosterViewService: RosterViewService) { }

  ngOnInit(): void {
    let catalogueData = this.catalogService.getFakeCatalogue();
    this.categoryClassification = _build_unit_type_classification(catalogueData)
  }

  addUnit(unit: CatalogueUnit) {
    this.rosterViewService.emitUnitAdded(unit);
  }
  
}

function _build_unit_type_classification(catalogueData: UnitCatalogue): Array<CategoryUnits> {
  return Array.from(catalogueData.unitList.reduce((categorySet, unit) => categorySet.add(unit.category),new Set<string>()))
    .map((category)=> { 
      return {
        category: category, 
        units: catalogueData.unitList.filter((unit)=>unit.category === category)
      }
    });
}

interface CategoryUnits {
  category: string,
  units: Array<CatalogueUnit>
}