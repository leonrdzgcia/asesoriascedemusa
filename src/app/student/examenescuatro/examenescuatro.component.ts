import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Pregunta } from 'src/app/interfaces/pregunta';
import { DataService } from 'src/app/services/data.service';
import { DialogService } from 'src/app/services/dialog.service';
import { ExamenService } from 'src/app/services/examen.service';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import { Resultados } from '../../interfaces/resultados';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-examenescuatro',
  templateUrl: './examenescuatro.component.html',
  styleUrls: ['./examenescuatro.component.scss']
})
export class ExamenescuatroComponent implements OnInit {

  options: any[] = [];
  preguntas: Pregunta[] = [];
  listaRespuestas: string[] = [];
  respuestaSeleccionada: string = '';
  banderBack = true;
  banderNext = false;
  banderSend = true;
  banderaPreguntas = 0;
  totalnumeroPreguntas = 0;
  preguntasCorrectas = 0;
  preguntasIncorrectasnum = 0;
  //info del examen
  numeroIdExamen = '';
  nombreExamen = '';
  stringIidExamen = '';
  preguntas90 = 0;
  tiempoExamen = 0;
  //conatador
  tiempoTotal: number = 10000;///1 con tiempo, 2 sin teimpo
  minutes: number = 0;
  minutesCad: string = '';
  seconds: number = 0;
  interval: any;
  display: any;

  loading = false;

  //banderas preguntas
  srcIdEncabezado: number = 0;
  tipoRespuestas: number = 0;
  idNumeroencabezado: number = 0;
  srcPreguntaImg = '';
  srcRes1 = '';
  srcRes2 = '';
  srcRes3 = '';
  srcEncabezado = '';

  //
  msgEncabezado: string = '';
  msgResCorrectas: string = '';
  msgResIncorrectas: string = '';
  msgCalificacion: string = '';
  msgPgt: string = ' Pregunta ';
  saltos: string = 'Primera línea<br>Segunda línea<br>Tercera línea';
  salto: string = 'Primera línea\\nSegunda línea\\nTercera línea';

  //arrayPreguntasFinal : string[] = [];
  arrayPreguntasIncorrectas: string = '';
  arrayPreguntasFinal: string = '';
  matriculaLogin: string = '';
  arrayPreguntasFinalT: Resultados[] = [];

  public idRes = new FormControl('');
  public idExamen = new FormControl('');
  public matricula = new FormControl('');
  public correctas = new FormControl('');
  public incorrectas = new FormControl('');
  public totalPreguntas = new FormControl('');
  public calificacion = new FormControl('');
  public preguntasIncorrectas = new FormControl('');

  public formularioGuardarResultado = new FormGroup({
    idExamen: this.idExamen,
    matricula: this.matricula,
    correctas: this.correctas,
    incorrectas: this.incorrectas,
    totalPreguntas: this.totalPreguntas,
    calificacion: this.calificacion,
    preguntasIncorrectas: this.preguntasIncorrectas
  });


  constructor(
    private dialog: MatDialog,
    private api: ExamenService,
    private dataService: DataService,
    private dialogService: DialogService,
    private router: Router,
    private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.interval = setInterval(() => {
      this.tick();
    }, 1000);

    if (this.dataService.matricula == 0) {
      this.ventana('Favor de ingresar al portal nuevamente', 'OK');
      this.logout();


    } else {
      console.log('---  MATRICULA ES :' + this.dataService.matricula);
      console.log(this.dataService);
      console.log(this.dataService.idExamenSeleccionado);
      console.log(this.dataService.matricula);
      this.matriculaLogin = this.dataService.matricula;
      this.stringIidExamen = this.dataService.idExamenSeleccionado.toString();
      this.numeroIdExamen = '50'; // ID EXAMEN QUE SE DEBE DE RECIBIR
      this.obtenerInfoExamen();
      //console.log(this.nombreExamen);    console.log(this.tiempoExamen);    console.log(this.preguntas90);
      console.log('---  ngOnInit  examenes 4');
      console.log(this.numeroIdExamen);
      console.log(this.stringIidExamen);

      //this.api.getPreguntasIdExamen('73').subscribe(data => {
      this.api.getPreguntasIdExamen(this.dataService.idExamenSeleccionado.toString()).subscribe(data => {
        console.log(data);
        this.options = data;
        this.preguntas = data;
        this.totalnumeroPreguntas = this.preguntas.length;
        console.log(this.preguntas);//      /*console.log(this.preguntas.length);      console.log(this.preguntas[0]);      console.log(this.preguntas[0].idExamen);      console.log(this.preguntas[0].idPregunta);      console.log(this.preguntas[0].pregunta);            console.log(this.preguntas[0].correcta);      console.log(data.length); */
        console.log(this.preguntas[0].encabezado);
        this.srcEncabezado = this.preguntas[0].encabezado;
        console.log(this.preguntas[0].pregunta);//      console.log(this.preguntas[0].preguntaImagen);//      console.log(this.preguntas[0].respuesta_1);//console.log(this.preguntas[0].respuesta_2);console.log(this.preguntas[0].respuesta_3);
        this.idNumeroencabezado = this.preguntas[0].id;
        this.srcPreguntaImg = this.preguntas[0].preguntaImagen;
        console.log(this.idNumeroencabezado);//      console.log(this.srcPreguntaImg);
        this.srcRes1 = this.srcRes1 + this.preguntas[0].respuesta_1;
        this.srcRes2 = this.srcRes2 + this.preguntas[0].respuesta_2;
        this.srcRes3 = this.srcRes3 + this.preguntas[0].respuesta_3;
        //this.arrayPreguntasFinal = this.arrayPreguntasFinal + this.preguntas[0].pregunta;      console.log(this.srcRes1);//console.log(this.srcRes2);console.log(this.srcRes3);
      });
      this.srcPreguntaImg = this.srcPreguntaImg + '';
      //this.openDialogWithOptions();
      console.log(this.dataService.tiempoExamen);
      //this.arrayPreguntasFinal = this.arrayPreguntasFinal + this.preguntas[0].pregunta + '\n';
      console.log(this.arrayPreguntasFinal);
      //console.log(this.preguntas[0].pregunta);
      //this.arrayPreguntasFinal.push(this.preguntas[0].pregunta);
      //this.arrayPreguntasFinal = this.arrayPreguntasFinal + this.preguntas[0].pregunta + '\n';
      this.openDialogAndWaitForResponse();
      //this.startTimer();
      //this.idNumeroencabezado


    }
  }

  async obtenerInfoExamen() {
    this.api.getExamenIdExamen(Number(this.numeroIdExamen)).subscribe(
      (data) => {
        console.log(data);
        if (data == null) {
          console.log('-- NO EXISTE EL examen');
        } else {
          this.nombreExamen = data.nombreExamen;
          this.tiempoExamen = data.tiempo;
          this.preguntas90 = data.preguntas90;
          console.log(this.nombreExamen);
          console.log(this.tiempoExamen);
          this.tiempoTotal = this.tiempoExamen;
          console.log(this.tiempoTotal);
          console.log(this.preguntas90);
        }
      },
      (error) => {
        console.error('Error fetching data list:', error);
      }
    );
  }

  preguntaAnterior() {
    this.banderNext = false;
    this.banderSend = true;
    //this.listaRespuestas.indexOf(1)
    //this.listaRespuestas.splice();

    console.log(this.banderaPreguntas);
    this.banderaPreguntas--;
    console.log(this.banderaPreguntas);
   
    console.log(this.preguntas[0].preguntaImagen);
    console.log(this.preguntas[this.banderaPreguntas].preguntaImagen);
    this.srcPreguntaImg = '';
    this.srcPreguntaImg = this.preguntas[this.banderaPreguntas].preguntaImagen;
    //this.reset();
    if (this.banderaPreguntas == 0) {
      console.log('NO HAY PREGUNTAS ANTES ');
      this.banderBack = true;
    }
  }

  siguientePRegunta() {
    console.log(this.banderaPreguntas);
    //this.idNumeroencabezado++;
    console.log(this.preguntas[this.banderaPreguntas + 1].encabezado);
    //this.arrayPreguntasFinal.push(this.preguntas[this.banderaPreguntas + 1].pregunta);
    /*this.arrayPreguntasFinalT?.push({idPregunta: this.banderaPreguntas + 1, pregunta: this.preguntas[this.banderaPreguntas].pregunta, tipoRespuesta: this.preguntas[this.banderaPreguntas].tipoRespuestas,respuestaCorrecta: 'RESPUESTA'});*/
    this.arrayPreguntasFinal = this.arrayPreguntasFinal + ' Pregunta ' + (this.banderaPreguntas + 1).toString() + ' -' + this.preguntas[this.banderaPreguntas].pregunta + '\n';
    console.log(this.arrayPreguntasFinalT);
    console.log(this.arrayPreguntasFinal);
    if (this.preguntas[this.banderaPreguntas + 1].encabezado == 'NA') {
      this.srcEncabezado = 'NA';
      console.log('--ENCABEZADO ES NA = ' + this.idNumeroencabezado);
      console.log(this.idNumeroencabezado);
    } else {
      if (this.preguntas[this.banderaPreguntas + 1].encabezado == this.idNumeroencabezado.toString()) {
        console.log('eencabezado ' + this.preguntas[this.banderaPreguntas + 1].encabezado + ' es igual al anterior  ' + this.idNumeroencabezado);
      } else {
        console.log('eencabezado igual a ' + this.preguntas[this.banderaPreguntas + 1].encabezado + ' no es igual al anterior que es ' + this.idNumeroencabezado);
        this.srcEncabezado = '';
        this.srcEncabezado = this.preguntas[this.banderaPreguntas + 1].encabezado;
        this.idNumeroencabezado = this.preguntas[this.banderaPreguntas + 1].id;
        console.log(this.preguntas[this.banderaPreguntas + 1].id);
        console.log(this.idNumeroencabezado);
      }
    }
    //reset valor
    this.srcPreguntaImg = '';//this.srcRes1 = '';
    console.log(this.srcRes1);//console.log(this.srcRes2);console.log(this.srcRes3);
    //SETEO IMAGENES 
    this.srcPreguntaImg = this.preguntas[this.banderaPreguntas + 1].preguntaImagen;
    this.srcRes1 = this.preguntas[this.banderaPreguntas + 1].respuesta_1;
    this.srcRes2 = this.preguntas[this.banderaPreguntas + 1].respuesta_2;
    this.srcRes3 = this.preguntas[this.banderaPreguntas + 1].respuesta_3;
    console.log(this.preguntas[this.banderaPreguntas + 1].respuesta_1);//    console.log(this.preguntas[this.banderaPreguntas + 1].respuesta_2);    console.log(this.preguntas[this.banderaPreguntas + 1].respuesta_3);    
    console.log(this.srcPreguntaImg);//console.log(this.srcRes2);//    console.log(this.srcRes2);    console.log(this.srcRes3);
    this.banderBack = false;
    console.log('------  siguientePRegunta');//console.log(this.preguntas[this.banderaPreguntas].correcta);
    console.log(this.preguntas[this.banderaPreguntas].respuesta_1);//    console.log(this.preguntas[this.banderaPreguntas].respuesta_2);    console.log(this.preguntas[this.banderaPreguntas].respuesta_3);
    this.listaRespuestas.push(this.preguntas[this.banderaPreguntas].respuesta_1);
    this.listaRespuestas.push(this.preguntas[this.banderaPreguntas].respuesta_2);
    this.listaRespuestas.push(this.preguntas[this.banderaPreguntas].respuesta_3);
    //console.log(this.listaRespuestas);
    console.log(this.listaRespuestas[0]);//console.log(this.listaRespuestas[1]);console.log(this.listaRespuestas[2]);
    //console.log(this.listaRespuestas[Number(this.preguntas[this.banderaPreguntas].correcta) - 1]);
    console.log('-----');
    console.log(this.respuestaSeleccionada);
    console.log(this.listaRespuestas[Number(this.preguntas[this.banderaPreguntas].correcta) - 1]);
    console.log('-----');

    //    this.arrayPreguntasFinal.push(this.preguntas[0].pregunta);

    if (this.respuestaSeleccionada == this.listaRespuestas[Number(this.preguntas[this.banderaPreguntas].correcta) - 1]) {
      console.log(' -- RESPUESTA CORRECTA ');
      this.arrayPreguntasFinal = this.arrayPreguntasFinal + '- respuesta correcta = ' + this.respuestaSeleccionada + '\n';

      if (this.preguntas[this.banderaPreguntas].tipoRespuestas == '1') {
        this.arrayPreguntasFinalT?.push({
          idPregunta: this.banderaPreguntas + 1,
          pregunta: this.preguntas[this.banderaPreguntas].pregunta,
          tipoRespuesta: this.preguntas[this.banderaPreguntas].tipoRespuestas,
          correcta: true,
          respuestaCorrecta: this.respuestaSeleccionada,
          respuestaIncorrecta: 'NA'
        });
      } else if (this.preguntas[this.banderaPreguntas].tipoRespuestas == '2') {
        this.arrayPreguntasFinalT?.push({
          idPregunta: this.banderaPreguntas + 1,
          pregunta: this.preguntas[this.banderaPreguntas].pregunta,
          tipoRespuesta: this.preguntas[this.banderaPreguntas].tipoRespuestas,
          correcta: true,
          respuestaCorrecta: this.respuestaSeleccionada,
          respuestaIncorrecta: 'NA'
        });
      }

      this.preguntasCorrectas++;
    } else {
      console.log(' -- RESPUESTA INCORRECTA ');
      //this.arrayPreguntasFinal = this.arrayPreguntasFinal + '- respuesta incorrecta = ' + this.respuestaSeleccionada + '\n';

      if (this.preguntas[this.banderaPreguntas].tipoRespuestas == '1') {
        console.log(' -- tipoRespuestas == 1 ');
        this.arrayPreguntasFinalT?.push({
          idPregunta: this.banderaPreguntas + 1,
          pregunta: this.preguntas[this.banderaPreguntas].pregunta,
          tipoRespuesta: this.preguntas[this.banderaPreguntas].tipoRespuestas,
          correcta: false,
          respuestaCorrecta: this.listaRespuestas[Number(this.preguntas[this.banderaPreguntas].correcta) - 1],
          respuestaIncorrecta: this.respuestaSeleccionada
        });
      } else if (this.preguntas[this.banderaPreguntas].tipoRespuestas == '2') {
        console.log(' -- tipoRespuestas == 2 ');
        this.arrayPreguntasFinalT?.push({
          idPregunta: this.banderaPreguntas + 1,
          pregunta: this.preguntas[this.banderaPreguntas].pregunta,
          tipoRespuesta: this.preguntas[this.banderaPreguntas].tipoRespuestas,
          correcta: false,
          respuestaCorrecta: this.listaRespuestas[Number(this.preguntas[this.banderaPreguntas].correcta) - 1],
          respuestaIncorrecta: this.respuestaSeleccionada
        });
      }
      this.arrayPreguntasIncorrectas = this.arrayPreguntasIncorrectas + (this.banderaPreguntas + 1) + ',';
      console.log(this.arrayPreguntasIncorrectas);
      this.preguntasIncorrectasnum++;
    }
    this.banderaPreguntas++;
    //this.totalPreguntas++;
    //this.reset();
    if (this.banderaPreguntas == (this.totalnumeroPreguntas - 1)) {
      console.log('ULTIMA PREGUNTA ');
      this.banderNext = true;
      this.banderSend = false;
    } else {
      this.respuestaSeleccionada = '';
      //this.listaRespuestas = [];
      //this.listaRespuestas=;
      this.banderSend = true;
    }

    this.listaRespuestas = [];
  }

  enviarUltimaPregunta() {
    console.log(this.preguntasCorrectas);//console.log(this.preguntasIncorrectas);console.log(this.totalPreguntas);console.log(this.banderaPreguntas);
    console.log(this.preguntas[this.banderaPreguntas].respuesta_1);//console.log(this.preguntas[this.banderaPreguntas].respuesta_2);console.log(this.preguntas[this.banderaPreguntas].respuesta_3);
    console.log(this.preguntas[this.banderaPreguntas].correcta);
    this.listaRespuestas.push(this.preguntas[this.banderaPreguntas].respuesta_1);
    this.listaRespuestas.push(this.preguntas[this.banderaPreguntas].respuesta_2);
    this.listaRespuestas.push(this.preguntas[this.banderaPreguntas].respuesta_3);
    console.log(this.listaRespuestas);
    this.arrayPreguntasFinal = this.arrayPreguntasFinal + ' Pregunta ' + (this.banderaPreguntas + 1).toString() + ' -' + this.preguntas[this.banderaPreguntas].pregunta + '\n';
    console.log(this.arrayPreguntasFinalT);
    console.log(this.respuestaSeleccionada);
    console.log(this.listaRespuestas[Number(this.preguntas[this.banderaPreguntas].correcta)]);

    if (this.respuestaSeleccionada == this.listaRespuestas[Number(this.preguntas[this.banderaPreguntas].correcta) - 1]) {
      console.log(' -- RESPUESTA CORRECTA ');
      this.arrayPreguntasFinal = this.arrayPreguntasFinal + '- respuesta correcta = ' + this.respuestaSeleccionada + '\n';
      this.preguntasCorrectas++;
      if (this.preguntas[this.banderaPreguntas].tipoRespuestas == '1') {
        this.arrayPreguntasFinalT?.push({
          idPregunta: this.banderaPreguntas + 1,
          pregunta: this.preguntas[this.banderaPreguntas].pregunta,
          tipoRespuesta: this.preguntas[this.banderaPreguntas].tipoRespuestas,
          correcta: true,
          respuestaCorrecta: this.respuestaSeleccionada,
          respuestaIncorrecta: 'NA'
        });
      } else if (this.preguntas[this.banderaPreguntas].tipoRespuestas == '2') {
        this.arrayPreguntasFinalT?.push({
          idPregunta: this.banderaPreguntas + 1,
          pregunta: this.preguntas[this.banderaPreguntas].pregunta,
          tipoRespuesta: this.preguntas[this.banderaPreguntas].tipoRespuestas,
          correcta: true,
          respuestaCorrecta: this.respuestaSeleccionada,
          respuestaIncorrecta: 'NA'
        });
      }
    } else {
      console.log(' -- RESPUESTA IN CORRECTA ');
      this.arrayPreguntasFinal = this.arrayPreguntasFinal + '- respuesta incorrecta = ' + this.respuestaSeleccionada + '\n';
      this.arrayPreguntasFinal = this.arrayPreguntasFinal + '- respuesta correcta = ' + this.listaRespuestas[Number(this.preguntas[this.banderaPreguntas].correcta) - 1] + '\n';

      if (this.preguntas[this.banderaPreguntas].tipoRespuestas == '1') {
        this.arrayPreguntasFinalT?.push({
          idPregunta: this.banderaPreguntas + 1,
          pregunta: this.preguntas[this.banderaPreguntas].pregunta,
          tipoRespuesta: this.preguntas[this.banderaPreguntas].tipoRespuestas,
          correcta: false,
          //respuestaCorrecta: "Respuesta incorrecta : " + this.respuestaSeleccionada + ' / - respuesta correcta = '+ this.listaRespuestas[Number(this.preguntas[this.banderaPreguntas].correcta) - 1]
          respuestaCorrecta: this.listaRespuestas[Number(this.preguntas[this.banderaPreguntas].correcta) - 1],
          respuestaIncorrecta: this.respuestaSeleccionada
        });
      } else if (this.preguntas[this.banderaPreguntas].tipoRespuestas == '2') {
        this.arrayPreguntasFinalT?.push({
          idPregunta: this.banderaPreguntas + 1,
          pregunta: this.preguntas[this.banderaPreguntas].pregunta,
          tipoRespuesta: this.preguntas[this.banderaPreguntas].tipoRespuestas,
          correcta: false,
          respuestaCorrecta: this.listaRespuestas[Number(this.preguntas[this.banderaPreguntas].correcta) - 1],
          respuestaIncorrecta: this.respuestaSeleccionada
        });
      }
      this.arrayPreguntasIncorrectas = this.arrayPreguntasIncorrectas + (this.banderaPreguntas + 1) + '.';
      this.preguntasIncorrectasnum++;
      console.log(this.arrayPreguntasIncorrectas);

    }

    console.log(this.arrayPreguntasFinalT);
    this.calificar();

  }

  calificar() {
    var res = 0;
    var resT = 0;
    console.log(this.arrayPreguntasFinalT);
    console.log(this.preguntas[this.banderaPreguntas].pregunta);
    //console.log(this.preguntas[this.banderaPreguntas + 1].pregunta);
    //this.arrayPreguntasFinal = this.arrayPreguntasFinal + this.preguntas[this.banderaPreguntas].pregunta;
    console.log(' -- preguntasCorrectas   son = ' + this.preguntasCorrectas);
    console.log(' -- preguntasIncorrectas son = ' + this.preguntasIncorrectasnum);
    console.log(this.totalnumeroPreguntas);

    if (this.totalnumeroPreguntas == 90) {
      console.log('-- EXAMEN SIMULACION DE 90 PREGUNTAS');

      var puntosBase = 700;
      this.msgEncabezado = 'Resultado obtenido :  Total de preguntas ' + this.totalnumeroPreguntas;
      this.msgResCorrectas = 'Preguntas contestadas correctamente : ' + this.preguntasCorrectas.toString();
      this.msgResIncorrectas = 'Preguntas contestadas incorrectamente : ' + this.preguntasIncorrectasnum.toString();
      res = puntosBase + (this.preguntasCorrectas * 6.6);
      resT = Number(res.toFixed(2)); // Trunca a 2 decimales

      console.log(res);
      this.msgCalificacion = 'Calificacion obtenida : ' + resT.toString() + ' de 1300 ';
    } else {
      console.log('-- EXAMEN BASE 100 % ');

      this.msgEncabezado = 'Resultado obtenido :  Total de preguntas ' + this.totalnumeroPreguntas;
      this.msgResCorrectas = 'Preguntas contestadas correctamente : ' + this.preguntasCorrectas.toString();
      this.msgResIncorrectas = 'Preguntas contestadas incorrectamente : ' + this.preguntasIncorrectasnum.toString();
      res = 100 / this.totalnumeroPreguntas * this.preguntasCorrectas;
      resT = Number(res.toFixed(2)); // Trunca a 2 decimales
      console.log(res);
      this.msgCalificacion = 'Calificacion obtenida : ' + resT.toString() + ' de 100 ';
    }
    console.log(this.msgResCorrectas);
    console.log(this.msgResIncorrectas);
    console.log(this.msgCalificacion);
    console.log(this.arrayPreguntasFinal);

    console.log('CADENA DE PREGUNTAS = ');
    console.log(this.arrayPreguntasIncorrectas);
    this.formularioGuardarResultado.value.idExamen = this.stringIidExamen;
    this.formularioGuardarResultado.value.matricula = this.matriculaLogin;
    this.formularioGuardarResultado.value.correctas = this.preguntasCorrectas.toString();
    this.formularioGuardarResultado.value.totalPreguntas = this.totalnumeroPreguntas.toString();
    this.formularioGuardarResultado.value.incorrectas = this.preguntasIncorrectasnum.toString();
    this.formularioGuardarResultado.value.calificacion = res.toString();
    this.formularioGuardarResultado.value.preguntasIncorrectas = this.arrayPreguntasIncorrectas;

    //GUARDAR RESULTADOS
    console.log(this.formularioGuardarResultado.value);
    this.api.guardarResultado(this.formularioGuardarResultado.value).subscribe(
      (response) => {
        console.log('Data added successfully:', response);
        this.ventana('EXAMEN FINALIZADO EXITOSAMENTE', 'OK');


        //this.llenadoListaUsuarios();
      }, (error) => {
        console.error('Error adding data:', error);
      }
    );
    this.abrirMensajeResultados();//this.ventana('Respuestas correctas :' + this.preguntasCorrectas + ' / Respuestas incorrectas ' + this.preguntasIncorrectas, 'OK');
  }

  /*getStringsWithLineBreaks(): string {
    // Unir los elementos del array en una sola cadena con saltos de línea
    return this.arrayPreguntasFinal.join('\n');  }*/

  abrirMensajeResultados(): void {
    console.log(this.arrayPreguntasFinalT);
    this.dialog.open(MessageDialogComponent, {
      width: '1200px', // Ancho del diálogo
      height: '1000px',
      data: {
        encabezado: this.msgEncabezado,
        message: this.msgResCorrectas,
        message1: this.msgResIncorrectas,
        message2: this.msgCalificacion,
        message3: this.arrayPreguntasFinalT
      }
    });
  }

  async openDialogAndWaitForResponse(): Promise<void> {
    const respuesta = await this.dialogService.openDialogAndGetResponse();
    console.log('Respuesta del usuario:', respuesta);
    /*console.log(this.dataService.tiempoExamen);
    console.log(this.dataService.tiempoExamen);*/
    if (this.dataService.tiempoExamen == 1) {
      console.log('tiempoExamen == 1 ');
      this.startTimer();

    } else {
      if (this.dataService.tiempoExamen == 2) {
        console.log('tiempoExamen == 2 ');
      }
    }
  }

  async openDialogAndWaitForResponseM(): Promise<void> {
    const respuesta = await this.dialogService.openDialogAndGetResponseM();
    console.log('Respuesta del usuario:', respuesta);
    console.log(this.dataService.tiempoExamen);
    console.log(this.dataService.tiempoExamen);
  }

  openDialogWithOptions(): void {
    console.log('---  openDialogWithOptions 4');
    /*const options = ['Opción 1', 'Opción 2', 'Opción 3'];
    this.dialogService.openDialog(options);
    console.log(this.dialogService.openDialog(options));*/
    //this.dialogService.openDialogWithTimer('Este diálogo se cerrará en 5 segundos.', 15000);
  }

  startTimer() {
    console.log('---  startTimer 4', this.tiempoTotal);
    this.interval = setInterval(() => {
      if (this.tiempoTotal === 0) {
        //console.log(this.tiempoTotal);
      } else {
        //console.log(this.tiempoTotal);
        this.tiempoTotal--;
        if (this.tiempoTotal == 0) {
          this.fakeLoading();
        }
      }
      this.display = this.transform(this.tiempoTotal)
    }, 1000);
  }

  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    this.minutesCad = this.minutes.toString();
    /*console.log(this.minutes);
    console.log(this.minutesCad);
    console.log(this.minutesCad.length);*/
    //console.log(this.minutes);
    return minutes + ':' + (value - minutes * 60);
  }

  fakeLoading() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['login']);
      //this.loading = false;
    }, 1500);
  }

  ventana(msj: string, sts: string) {
    this._snackBar.open(msj, sts, {
      duration: 10000, horizontalPosition: 'center', verticalPosition: 'bottom'
    });
  }

  tick() {
    this.seconds++;
    if (this.seconds === 60) {
      this.seconds = 0;
      this.minutes++;
      //console.log(this.minutes);
    }
  }

  logout() {
    this.router.navigateByUrl('/login');
  }
}