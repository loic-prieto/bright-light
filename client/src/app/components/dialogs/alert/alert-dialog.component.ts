import { Component, Inject } from "@angular/core";
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'bl-dialogs-alert',
    templateUrl: './alert-dialog.component.html',
    styleUrls: ['./alert-dialog.component.css']
  })
export class AlertDialog {

    public static open(
        dialog: MatDialog, params: AlertDialogData): MatDialogRef<AlertDialog,AlertDialogData> {
        return dialog.open(AlertDialog,{data: params} as MatDialogConfig<AlertDialogData>)
    }

    constructor(
        public dialogRef: MatDialogRef<AlertDialog,AlertDialogData>,
        @Inject(MAT_DIALOG_DATA) public data: AlertDialogData,
      ) {}
}

export interface AlertDialogData {
    title: string,
    message: string,
    actionMessage: string
}
