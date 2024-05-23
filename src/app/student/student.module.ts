import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentRoutingModule } from './student-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SharedModule } from '../shared/shared.module';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { ExamenesComponent } from './examenes/examenes.component';
import { ExamenestresComponent } from './examenescuatro/examenestres/examenestres.component';
import { ExamenvideoComponent } from './examenvideo/examenvideo.component';
import { ExamenvideodosComponent } from './examenvideodos/examenvideodos.component';
import { ExamentresComponent } from './examentres/examentres.component';
//import { ExamencuatroComponent } from './examencuatro/examencuatro.component';
import { ExamenvideotresComponent } from './examenvideotres/examenvideotres.component';
import { ExamenvideocuatroComponent } from './examenvideocuatro/examenvideocuatro.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { ExamenescuatroComponent } from './examenescuatro/examenescuatro.component';
import { DialogContentComponent } from './dialog-content/dialog-content.component';
import { DialogContentmComponent } from './dialog-contentm/dialog-contentm.component';
import { MessageDialogComponent } from './examenescuatro/message-dialog/message-dialog.component';
import { AsignacionesComponent } from './asignaciones/asignaciones.component';
import { DialogDeleteComponent } from './preguntas/dialog-delete/dialog-delete.component';



@NgModule({
  declarations: [
    AsignacionesComponent,
    ResultadosComponent,    
    
    UsuariosComponent,
    PreguntasComponent,
    ExamenesComponent,
    ExamenestresComponent,
    ExamenvideoComponent,
    ExamenvideodosComponent,
    ExamentresComponent,    
    ExamenvideotresComponent,
    ExamenvideocuatroComponent,
    
    ResultadosComponent,
    ExamenescuatroComponent,
    DialogContentComponent,
    DialogContentmComponent,
    MessageDialogComponent,
    DialogDeleteComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedModule
  ]
})
export class StudentModule { }
