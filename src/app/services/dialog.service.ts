import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from '../student/dialog-content/dialog-content.component';
import { DialogContentmComponent } from '../student/dialog-contentm/dialog-contentm.component';


@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openDialog(options: any): any {
    console.log('-------openDialog  ');
    this.dialog.open(DialogContentComponent, { data: options });
  }

  openDialogWithTimer(message: string, timeout: number): void {
    console.log('-------openDialogWithTimer ');
    const dialogRef = this.dialog.open(DialogContentComponent, { data: { message } });

    setTimeout(() => {
      dialogRef.close();
    }, timeout);
  }

  openDialogAndGetResponse(): Promise<any> {
    const dialogRef = this.dialog.open(DialogContentComponent);

    return dialogRef.afterClosed().toPromise();
  }

  openDialogAndGetResponseM(): Promise<any> {
    const dialogRef = this.dialog.open(DialogContentmComponent);

    return dialogRef.afterClosed().toPromise();
  }

}