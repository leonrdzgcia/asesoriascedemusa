import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Resultados } from 'src/app/interfaces/resultados';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) 
  public data: { 
    encabezado: string , 
    message: string , 
    message1: string , 
    message2: string ,
    message3: Resultados[]
  }) { }

}
