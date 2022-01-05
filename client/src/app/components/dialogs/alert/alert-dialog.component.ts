import { Component, Inject } from "@angular/core";
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

/**
 * This is an utility component to be able to easily open alert dialogs in
 * a standard way across the application. It is not designed to be used as a
 * component but rather invoke the static method `open`, which depends on 
 * being provided an injected MatDialog instance.
 */
@Component({
    selector: 'bl-dialogs-alert',
    templateUrl: './alert-dialog.component.html',
    styleUrls: ['./alert-dialog.component.scss']
  })
export class AlertDialog {

    public static open(
        dialog: MatDialog, message: string, actionMessage = "Ok", title="Error"): MatDialogRef<AlertDialog,AlertDialogData> {
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
