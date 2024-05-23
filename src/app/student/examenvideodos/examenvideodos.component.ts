import { Component, OnInit } from '@angular/core';
//import { VgApiService, VgCoreModule } from '@videogular/ngx-videogular/core';
//import { VgControlsModule } from '@videogular/ngx-videogular/controls';
//import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
//import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
//import { VgStreamingModule } from '@videogular/ngx-videogular/streaming'
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { ExamenService } from 'src/app/services/examen.service';
import { MenuService } from 'src/app/services/menu.service';
@Component({
  selector: 'app-examenvideodos',
  templateUrl: './examenvideodos.component.html',
  styleUrls: ['./examenvideodos.component.scss']
})
export class ExamenvideodosComponent {

  
  //api: VgApiService = new VgApiService;
  srcV = "./assets/img/";
  srcVc = "./assets/img/";
  banderaPreguntas = 0;
  totalPreguntas = 0;
  banderBack = true;
  banderNext = false;
  banderSend = true;

  arrayVideos: Array<[number, string]> = [
    [1, "1 Sumas y Restas.mp4"],
    [2, "2 Jerarquia de Operaciones.mp4"],
    [3, "3 Suma de Polinomios.mp4"],
    [4, "4 Multiplicación de Polinomios"],
    [5, "5 Leyes de los exponentes"],
    [6, "6 Funciones Lineales"],
    [7, "7 Factorizacion de Polinomios"],
    [8, "8 Solución de ecuaciones lineales"],
    [9, "9 Funciones Cuadráticas"],
    [10, "10 Solución de Ecuaciones Cuadraticas"],
    [11, "11 Teorema de Pitagoras"],
    [12, "dos"],
    [13, "uno"],
    [14, "dos"],
];


constructor( 
  private dataService: DataService, 
  private api: ExamenService,
  private _snackBar: MatSnackBar,
  private router: Router,
  private menuServices: MenuService
  ) {

}
}
