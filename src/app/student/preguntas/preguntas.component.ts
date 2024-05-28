import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/interfaces/usuario';
import { MenuService } from 'src/app/services/menu.service';
import { ExamenService } from 'src/app/services/examen.service';
import { Pregunta } from 'src/app/interfaces/pregunta';
import { DataService } from 'src/app/services/data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';



@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.scss']
})
export class PreguntasComponent {

  //displayedColumns: string[] = ['idPregunta', 'idExamen', 'pregunta', 'respuesta_1', 'respuesta_2', 'respuesta_3', 'correcta'];
  displayedColumns: string[] = ['idPregunta', 'idExamen', 'pregunta', 'respuesta_1', 'respuesta_2', 'respuesta_3', 'correcta'];
  //dataPreguntas: any[] = []; 
  dataPreguntas = new MatTableDataSource<any>();
  dataPregunta: Pregunta = {
    //idPregunta: 0,
    idExamen: 0,
    id: 0,
    encabezado: '',
    pregunta: '',
    preguntaImagen: '',
    respuesta_1: '',
    respuesta_2: '',
    respuesta_3: '',
    correcta: '',
    tipoRespuestas: ''
  };

  constructor(
    private api: ExamenService,
    private dataService: DataService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) {
  }
  public idPregunta = new FormControl('', Validators.required);
  public idExamen = new FormControl('', Validators.required);
  public pregunta = new FormControl('', Validators.required);
  public respuesta_1 = new FormControl('', Validators.required);
  public respuesta_2 = new FormControl('', Validators.required);
  public respuesta_3 = new FormControl('', Validators.required);
  public correcta = new FormControl('', Validators.required);

  public formularioPreguntas = new FormGroup({
    idPregunta: this.idPregunta,
    idExamen: this.idExamen,
    pregunta: this.pregunta,
    respuesta_1: this.respuesta_1,
    respuesta_2: this.respuesta_2,
    respuesta_3: this.respuesta_3,
    correcta: this.correcta
  });

  ngOnInit(): void {
    console.log('--ngOnInit UsuariosComponent ');
    console.log(this.dataService.nombre);
    console.log(this.dataService.perfil);
    this.llenadoListaPreguntas();//this.obtenerPreguntaId();
  }

  obtenerPreguntaId() {
    //console.log(this.listaUsuarios);
    console.log(this.formularioPreguntas.value);
    this.api.getPreguntasId(Number(this.formularioPreguntas.value.idPregunta)).subscribe(
      (data) => {
        this.dataPreguntas = data;
        

        console.log(data);
      },
      (error) => {
        console.error('Error fetching data list:', error);
      }
    );
  }

  llenadoListaPreguntas() {
    //console.log(this.listaUsuarios);
    this.api.getPreguntas().subscribe(
      (data) => {
        this.dataPreguntas = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching data list:', error);
      }
    );
    //this.dataSource2 = new MatTableDataSource(this.dataSource);
  }

  buscarporidExamen() {
    var valor = '';
    var valor2 = 0;//console.log(this.newData)

    console.log(this.dataPregunta)
    console.log(this.dataPregunta)
    console.log(this.formularioPreguntas);
    if (this.dataPregunta.idPregunta == null) {
      console.log('idpregunta vacia ');
      valor = this.dataPregunta.idExamen.toString();
    } if (this.dataPregunta.idExamen == null) {
      console.log(' idexamenvacia ');//valor2 = this.dataPregunta.idPregunta;
    }//const =
    console.log(valor)
    //console.log(this.listaUsuarios);

    this.api.getPreguntasIdExamen(valor).subscribe(
      (data) => {
        this.dataPreguntas = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching data list:', error);
      }
    );
  }

  clickAgregarPregunta() {
    console.log('-- agregarActualzar ');
    console.log(this.dataPregunta);
    console.log(this.formularioPreguntas.value);
    if (this.formularioPreguntas.value.idPregunta == '0') {
      this.agregarPregunta();
      this.ventana('Pregunta agregada correctamente', 'OK');

    } else {
      this.ventana('Para agregar una pregunta indique el valor 0', 'ERROR');
    }
    //this.agregarActualzar2();
  }

  agregarPregunta() {
    console.log('--- agregarActualzar2 ');
    console.log(this.dataPregunta);
    console.log(this.formularioPreguntas.value);
    this.api.agregarPregunta(this.formularioPreguntas.value).subscribe(
      (response) => {
        console.log('Datos aagregados exitosamente :', response);
        // Actualiza la tabla después de agregar nuevos datos
        this.llenadoListaPreguntas();
      },
      (error) => {
        console.error('Error adding data:', error);
      }
    );
  }

  clickModiicarPregunta() {
    console.log(this.formularioPreguntas.value);
    if (this.formularioPreguntas.value.idPregunta == '0') {
      console.log('ID ES 0');
      this.ventana('No se puede modificar una pregunta con id sea 0', 'ERROR');
    } else {
      this.api.getPreguntasId(Number(this.formularioPreguntas.value.idPregunta)).subscribe(
        (data) => {
          this.dataPreguntas = data;
          console.log(data);
          if (data == null) {
            console.log('-- NO EXISTE EL USUARIO');
            this.ventana('Usuario no valido', 'ERROR');
          } else {
            console.log(this.formularioPreguntas.value);
            if (this.formularioPreguntas.value.idExamen == '') {
              this.formularioPreguntas.value.idExamen = data.idExamen;
            }
            if (this.formularioPreguntas.value.pregunta == '') {
              this.formularioPreguntas.value.pregunta = data.pregunta;
            }
            if (this.formularioPreguntas.value.respuesta_1 == '') {
              this.formularioPreguntas.value.respuesta_1 = data.respuesta_1;
            }
            if (this.formularioPreguntas.value.respuesta_2 == '') {
              this.formularioPreguntas.value.respuesta_2 = data.respuesta_2;
            }
            if (this.formularioPreguntas.value.respuesta_3 == '') {
              this.formularioPreguntas.value.respuesta_3 = data.respuesta_3;
            }
            if (this.formularioPreguntas.value.correcta == '') {
              this.formularioPreguntas.value.correcta = data.correcta;
            }
            //this.formularioPreguntas.value. = data.fechaAlta;
            //this.formularioPreguntas.value.fechaAlta = data.fechaAlta;
            //this.formularioPreguntas.value.fechaAlta = data.fechaAlta;
            console.log(this.formularioPreguntas.value);
            this.agregarPregunta();
            this.ventana('Usuario actualizada exitosamente ', 'OK');
          }
        },
        (error) => {
          console.error('Error fetching data list:', error);
        }
      );
    }
  }

  clickEliminarPregunta() {
    console.log(this.formularioPreguntas.value);
    if (this.formularioPreguntas.value.idPregunta == '' || this.formularioPreguntas.value.idPregunta == '0') {
      console.log('CAMPO VACIO NOSE PUEDE ELIMINAR ');
      this.ventana('Agregar EL ID DE LA PREGUNTA A ELIMINAR', 'ERROR');
      /*this._snackBar.open('Agregar la Matricula del usuarior', 'ERROR', {
        duration: 3000,        horizontalPosition: 'center',        verticalPosition: 'bottom'      })*/
    } else {
      console.log('CAMPO CON INFO ');
      console.log(this.formularioPreguntas.value);
      //this.obtenerPreguntaId();
      this.eliminarPregunta();
    }
  }

  eliminarPregunta() {
    this.api.eliminarPregunta(Number(this.formularioPreguntas.value.idPregunta)).subscribe(
      () => {
        console.log('Datos eliminados exitosamente');
        // Puedes realizar otras acciones después de la eliminación
        this.ventana('Usuario eliminado correctamente', 'OK');
        this.llenadoListaPreguntas();
      },
      error => {
        console.error('Error al eliminar datos:', error);
        this.ventana('Usuario eliminado correctamente', 'OKS');
        this.llenadoListaPreguntas();
      }
    );
  }

  clickEliminarTodasPreguntas(){
    console.log(this.formularioPreguntas.value.idExamen);
    const dialogRef = this.dialog.open(DialogDeleteComponent,{
      data: {
        mess : '33' 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Opcion aceptar');
      } else {
        console.log('Opcion cancelar');
      }
    });

  }
  ///final
  soloNumeros(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault(); // Evitar la entrada de caracteres no numéricos
    }
  }

  ventana(msj: string, sts: string) {
    this._snackBar.open(msj, sts, { duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom' });
  }

  clickActualizar() {
    this.ngOnInit();
  }

  submitForm() {
  }

}
