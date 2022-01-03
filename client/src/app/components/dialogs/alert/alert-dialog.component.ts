import { Component, Inject } from "@angular/core";
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'bl-dialogs-alert',
    templateUrl: './alert-dialog.component.html',
    styleUrls: ['./alert-dialog.component.scss']
  })
export class AlertDialog {

    public static open(
        dialog: MatDialog, message: string, actionMessage: string = "Ok", title: string="Error"): MatDialogRef<AlertDialog,AlertDialogData> {
        return dialog.open(AlertDialog,{data: {title: title,message: message, actionMessage: actionMessage}} as MatDialogConfig<AlertDialogData>)
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
