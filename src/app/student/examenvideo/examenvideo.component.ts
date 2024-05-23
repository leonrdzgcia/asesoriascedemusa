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
  selector: 'app-examenvideo',
  templateUrl: './examenvideo.component.html',
  styleUrls: ['./examenvideo.component.scss']
})
export class ExamenvideoComponent {

  //api: VgApiService = new VgApiService;
  srcV = "./assets/img/";
  srcVc = "./assets/img/";
  banderaPreguntas = 0;
  totalPreguntas = 0;
  examenidvideo = 0;
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
    [12, "12 Distancia entre puntos y PM"],
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

  ngOnInit(): void {

    console.log(this.dataService.examenavideo);
    this.examenidvideo = this.dataService.examenavideo;
    
    /*console.log(this.listaPreguntas[0]);
    this.totalPreguntas = this.listaPreguntas.length;
    console.log('totalPreguntas :', this.totalPreguntas);
    console.log('valor bandera :', this.banderaPreguntas);
    this.tipoRespuesta = this.listaPreguntas[0].tipoRespuestas;
    console.log('--tipo respuesta', this.tipoRespuesta);
    this.srcV = this.srcV + this.listaPreguntas[0].imagen + ".mp4";
    console.log(this.srcV);*/

    console.log(this.dataService.video);
    this.arrayVideos[0];
    console.log(this.arrayVideos[0]);
    console.log(this.arrayVideos[this.dataService.video]);
    console.log(this.arrayVideos[this.dataService.video][0]);
    console.log(this.arrayVideos[this.dataService.video][1]);
    this.srcVc ="./assets/img/"+this.arrayVideos[this.dataService.video][1];
    console.log(this.srcVc);
  }

  /*
  reset() {
    console.log('-----------------');
    console.log('--- RESET');
    this.srcV = "./assets/img/";
    this.srcV = this.srcV + this.listaPreguntas[this.banderaPreguntas].imagen + ".mp4";
    console.log(this.srcV);
  }

  back() {
    this.banderNext = false;
    this.banderSend = true;
    console.log('---BACK');
    console.log('Valor bandera ', this.banderaPreguntas);
    this.banderaPreguntas--;
    this.reset();
    console.log('Valor bandera ', this.banderaPreguntas);
    if (this.banderaPreguntas == 0) {
      console.log('NO HAY PREGUNTAS ANTES ');
      this.banderBack = true;
    }
    console.log('-----------------');
  }

  next() {
    this.banderBack = false;
    console.log('------- NEXT');
    console.log(this.listaPreguntas[0]);
    //console.log('next');
    console.log('Valor bandera ', this.banderaPreguntas);
    console.log('total preguntas', this.totalPreguntas);
    this.banderaPreguntas++;
    console.log('Valor bandera ', this.banderaPreguntas);
    this.reset();

    console.log('Valor bandera ', this.banderaPreguntas);
    console.log(this.listaPreguntas[this.banderaPreguntas]);

    if (this.banderaPreguntas == (this.totalPreguntas - 1)) {
      console.log('ULTIMA PREGUNTA ');
      this.banderNext = true;
      this.banderSend = false;
    } else {
      console.log('Valor bandera ', this.banderaPreguntas);
      this.banderSend = true;
    }
    console.log('-----------------');
  }

  onPlayerReady(source: VgApiService) {
    this.api = source;
    this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(
      this.autoplay.bind(this)
    )
  }

  autoplay() {
    this.api.play();
  }

  listaPreguntas = [{
    id: 1,
    imagen: "1 Sumas y Restas"
  }, {
    id: 2,
    imagen: "2 Jerarquia de Operaciones"
  }, {
    id: 3,
    imagen: "3 Suma de Polinomios"
  }, {
    id: 4,
    imagen: "4 Multiplicación de Polinomios"
  }, {
    id: 5,
    imagen: "5 Leyes de los exponentes"
  }, {
    id: 6,
    imagen: "6 Funciones Lineales"
  }, {
    id: 7,
    imagen: "7 Factorizacion de Polinomios"
  }, {
    id: 8,
    imagen: "8 Solución de ecuaciones lineales"
  }, {
    id: 9,
    imagen: "9 Funciones Cuadráticas"
  }, {
    id: 10,
    imagen: "10 Solución de Ecuaciones Cuadraticas"
  }, {
    id: 11,
    imagen: "11 Teorema de Pitagoras"
  }, {
    id: 12,
    imagen: "12 Distancia entre puntos y PM"
  }, {
    id: 13,
    imagen: "13 Teorema de Thales"
  }, {
    id: 14,
    imagen: "14 Razones y proporciones"
  }
  ];
  */
}