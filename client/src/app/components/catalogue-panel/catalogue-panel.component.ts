import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CatalogueUnit} from 'src/app/model/CatalogueUnit';
import {UnitCatalogue} from 'src/app/model/UnitCatalogue';
import {ShortCatalogue} from "../../model/Roster";
import {CatalogueService} from "../../services/catalogue.service";
import {MatDialog} from "@angular/material/dialog";
import {AlertDialog} from "../dialogs/alert/alert-dialog.component";

/**
 * Displays a panel with the units and configurations defined in a Catalogue
 * and allows to add units to a roster from it.
 */
@Component({
  selector: 'bl-catalogue-panel',
  templateUrl: './catalogue-panel.component.html',
  styleUrls: ['./catalogue-panel.component.css']
})
export class CataloguePanelComponent implements OnInit {

  @Input() catalogueInfo?: ShortCatalogue
  @Output() onUnitAdded = new EventEmitter<CatalogueUnit>()

  categoryClassification: Array<CategoryUnits> = []

  constructor(
      private catalogueService: CatalogueService,
      private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    if (!this.catalogueInfo) {
      const errorMessage = "The component should have been provided with a catalogue info, it cannot initialize otherwise"
      console.error(errorMessage)
      AlertDialog.open(this.dialog, errorMessage, "A tad weird, I reckon")
    } else {
      const self = this
      this.catalogueService.getCatalogue(this.catalogueInfo.name, this.catalogueInfo.version)
          .subscribe({
            next(catalogue) {
              self.categoryClassification = _build_unit_type_classification(catalogue)
            },
            error(error: Error) {
              const errorMessage = `There was an error while retrieving the catalogue in the catalogue panel: ${error.message}`
              console.error(errorMessage)
              AlertDialog.open(self.dialog, errorMessage, "Well...that's it, then, ain't it?")
            }
          })
    }
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