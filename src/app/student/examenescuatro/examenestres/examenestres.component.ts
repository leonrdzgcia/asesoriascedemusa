import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatProgressSpinner, MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgFor } from '@angular/common';
import { EnviarinformacionService } from 'src/app/services/enviarinformacion.service';
import { DataService } from 'src/app/services/data.service';
import { ExamenService } from 'src/app/services/examen.service';
import { Pregunta } from 'src/app/interfaces/pregunta';
@Component({
  selector: 'app-examenestres',
  templateUrl: './examenestres.component.html',
  styleUrls: ['./examenestres.component.scss']
})
export class ExamenestresComponent {

  formExamen: FormGroup;
  dataSource: any[] = [];
  preguntas: Pregunta[] = [];

   
  favoriteSeason: string = '';
  seasons: string[] = [];
  interval: any;
  time: number = 600;
  display: any;
  totalPreguntas = 0;
  loading = false;
  banderaPreguntas = 0;

  banderBack = true;
  banderNext = false;
  banderSend = true;

  constructor(
    private api: ExamenService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private _snackBar: MatSnackBar,
    private mat: MatProgressSpinnerModule, private servi: EnviarinformacionService, private dataService: DataService) {
    this.route.params.subscribe(params => {
      //this.receivedPar1 = params['par1'];
      //this.receivedPar2 = params['par2'];//console.log(this.receivedPar1);console.log(this.receivedPar2);
    });

    //this.receivedData = this.route.snapshot.toString;
    this.formExamen = this.fb.group({
      examen: ['AA', Validators.required]
    }
    )
  }

  ngOnInit(): void {
    //this.llenadoListadePreguntas();
    console.log(this.dataService.examenasignado)
    console.log('-------ngOnInit  ExamenestresComponent ');
    //console.log(this.listaPreguntasR.examen[0]);
    //console.log(this.listaPreguntas1[0]);
    this.llenadoListadePreguntasporIdExamen();
    console.log(this.dataSource);
    
    
    //this.tipoRespuesta = this.listaPreguntas[0].tipoRespuestas;
    //console.log('--tipo respuesta', this.tipoRespuesta);
    /*if (this.listaPreguntas1[0].imagen == '') {
      console.log('NO HAY IMAGEN');
    } else {
      console.log(' HAY IMAGEN');
      this.fImg == true;
      this.src = this.src + this.listaPreguntas1[4].imagen;
    }*/
    this.startTimer();
  }

  listaPreguntas1 = [
    {
      id: 1,
      encabezado: '',
      textopregunta: '¿Cuál de los siguientes no es un elemento de los niveles administrativos en una empresa?',
      imagen: "",
      tipoRespuestas: "1",
      respuestas: ['Alta gerencia', 'Emprendedores', 'Supervisores'],
      respuestaSeleccionada: null,
      respuestaCorrecta: 'Emprendedores'
    }, {
      id: 2,
      encabezado: '',
      textopregunta: '¿A quién se le considera como el padre de la administración científica?',
      imagen: "",
      tipoRespuestas: "1",
      respuestas: ['Henry L. Gantt', 'Adam Smith', 'Frederick Taylor'],
      respuestaSeleccionada: null,
      respuestaCorrecta: 'Frederick Taylor'
    }, {
      id: 3,
      encabezado: '',
      textopregunta: 'A cuál de los siguientes se le considera un sistema que interactua libremente con su ambiente?',
      imagen: "",
      tipoRespuestas: "1",
      respuestas: ['Sistema abierto', 'Sistema aislado', 'Sistema cerrado'],
      respuestaSeleccionada: null,
      respuestaCorrecta: 'Sistema abierto'
    }
  ];



  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return minutes + ':' + (value - minutes * 60);
  }

  llenadoListadePreguntas() {
    this.api.getPreguntas().subscribe(
      (data) => {
        this.dataSource = data;
        console.log(data);
        console.log(this.dataSource);
        console.log(this.dataSource[0]);
        console.log(this.dataSource[0].pregunta);
        console.log(this.dataSource[0].respuesta_1);
        /*this.seasons.push(this.dataSource[0].respuesta_1);this.seasons.push(this.dataSource[0].respuesta_2);
        this.seasons.push(this.dataSource[0].respuesta_3);*/
        console.log(this.seasons);

      },
      (error) => {
        console.error('Error fetching data list:', error);
      }
    );//this.dataSource2 = new MatTableDataSource(this.dataSource);
  }

  llenadoListadePreguntasporIdExamen() {
    console.log(this.dataService.examenasignado)
    this.api.getPreguntasIdExamen(this.dataService.examenasignado).subscribe(
      (data) => {
        this.dataSource = data;

      //this.options = data;
      this.preguntas = data;


        console.log(data);
        console.log(this.dataSource);
        console.log(this.dataSource.length);
        this.totalPreguntas = this.dataSource.length;
        console.log(this.banderaPreguntas);
        /*for (let index = 0; index < this.dataSource.length; index++) {
          console.log(this.dataSource[index].pregunta);
        }*/
        console.log(this.dataSource[0]);
        console.log(this.dataSource[0].pregunta);
        console.log(this.dataSource[0].respuesta_1);
        console.log(this.dataSource[1]);
        console.log(this.dataSource[1].pregunta);
        console.log(this.dataSource[1].respuesta_1);
        /*this.seasons.push(this.dataSource[0].respuesta_1);
        this.seasons.push(this.dataSource[0].respuesta_2);
        this.seasons.push(this.dataSource[0].respuesta_3);*/
        //console.log(this.seasons);

      },
      (error) => {
        console.error('Error fetching data list:', error);
      }
    );//this.dataSource2 = new MatTableDataSource(this.dataSource);
  }

  reset() {
    console.log('-----------------RESET');

  }

  back() {
    console.log('---BACK');
    this.banderNext = false;
    this.banderSend = true;
    console.log('Valor bandera ', this.banderaPreguntas);
    this.banderaPreguntas--;
    this.reset();
    console.log('Valor bandera ', this.banderaPreguntas);
    if (this.banderaPreguntas == 0) {
      console.log('NO HAY PREGUNTAS ANTES ');
      this.banderBack = true;
    }
  }

  next() {
    console.log('------- NEXT');
    this.banderBack = false;
    
    console.log('Valor bandera ', this.banderaPreguntas);
    console.log('total preguntas', this.totalPreguntas);
    this.banderaPreguntas++;
    this.reset();
    
    if (this.banderaPreguntas == (this.totalPreguntas - 1)) {
      console.log('ULTIMA PREGUNTA ');
      this.banderNext = true;
      this.banderSend = false;
    } else {
      this.banderSend = true;
    }
  }

  calificarExamen() {
    console.log("=====> CALIFICAR EXANEB");
    
    let aciertos = 0;
    //let fin=0;
    
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.time === 0) {
        console.log(this.time);
      } else {
        this.time--;
        if (this.time == 0) {
          this.fakeLoading();
        }
      }
      this.display = this.transform(this.time)
    }, 1000);
  }

  fakeLoading() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['login']);
      //this.loading = false;
    }, 1500);

  }

}
