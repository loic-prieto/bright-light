import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { RosterUnit } from 'src/app/model/RosterUnit';
import { Roster } from '../../model/Roster';

@Component({
  selector: 'bl-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.css']
})
export class UnitListComponent implements OnInit {

  @Input() roster?: Roster

  rosterUnitMenuPosition = {x:"0px",y:"0px"}

  @ViewChild(MatMenuTrigger,{static: true}) rosterUnitMenu!:MatMenuTrigger;
  
  constructor(
    private _dialog: MatDialog) {
   }
  
  ngOnInit(): void {
    // This component cannot start if roster is not given
    if(!this.roster) {
      throw new Error("A roster must be provided to the unit list component to be able to start")
    }
   }

  openRenameUnitDialog(unit: RosterUnit): void {
    const dialogRef = this._dialog.open(UnitListRenameUnitDialogComponent, {
      width: '250px',
      data: {name: unit.name},
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.confirmed) {
        unit.name = result.name
      }
    });
  }

  openUnitMenu(event: Event, unit: RosterUnit): void {
    event.preventDefault(); 
    let mevent = event as MouseEvent
    this.rosterUnitMenuPosition.x = `${mevent.clientX}px`
    this.rosterUnitMenuPosition.y = `${mevent.clientY}px`

    console.log(`x: ${this.rosterUnitMenuPosition.x}, y: ${this.rosterUnitMenuPosition.y}`)
    this.rosterUnitMenu.menuData = {unit: unit}
    this.rosterUnitMenu.openMenu()
  }

  removeUnit(unit: RosterUnit): void {
    if(this.roster) {
      this.roster.removeUnit(unit)
    }
  }

}

export interface RenameUnitDialogData {
  name: string;
}

@Component({
  selector: 'bl-unit-list-rename-unit-dialog',
  templateUrl: './rename-unit-dialog.component.html',
})
export class UnitListRenameUnitDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<UnitListRenameUnitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RenameUnitDialogData,
  ) {}

  onCancel(): void {
    this.dialogRef.close({confirmed:false,name:this.data.name});
  }
}