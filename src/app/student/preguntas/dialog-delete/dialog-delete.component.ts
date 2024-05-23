import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.scss']
})
export class DialogDeleteComponent {

  constructor(public dialogRef: MatDialogRef<DialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {}


  onCancelClick(): void {
    console.log('onCancelClick');
    this.dialogRef.close(false);
  }

  onConfirmClick(): void {
    console.log('onConfirmClick');
    this.dialogRef.close(true);
  }

}
