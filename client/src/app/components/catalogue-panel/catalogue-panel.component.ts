import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CatalogueUnit } from 'src/app/model/CatalogueUnit';
import { UnitCatalogue } from 'src/app/model/UnitCatalogue';

@Component({
  selector: 'bl-catalogue-panel',
  templateUrl: './catalogue-panel.component.html',
  styleUrls: ['./catalogue-panel.component.css']
})
export class CataloguePanelComponent implements OnInit {

  @Input() catalogue?: UnitCatalogue
  @Output() onUnitAdded = new EventEmitter<CatalogueUnit>()

  categoryClassification: Array<CategoryUnits> = []

  ngOnInit(): void {
    if(!this.catalogue) {
      throw new Error("A catalogue should have been provided by the including component of the catalogue panel")
    }
    this.categoryClassification = _build_unit_type_classification(this.catalogue)
  }

  addUnit(unit: CatalogueUnit) {
    this.onUnitAdded.emit(unit)
  }
  
}

function _build_unit_type_classification(catalogueData: UnitCatalogue): Array<CategoryUnits> {
  return Array.from(catalogueData.getUnitList().reduce((categorySet, unit) => categorySet.add(unit.category),new Set<string>()))
    .map((category)=> { 
      return {
        category: category, 
        units: catalogueData.getUnitList().filter((unit)=>unit.category === category)
      }
    });
}

interface CategoryUnits {
  category: string,
  units: Array<CatalogueUnit>
}