import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/interfaces/usuario';
import { MenuService } from 'src/app/services/menu.service';
import { ExamenService } from 'src/app/services/examen.service';
import { DatePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {

  
  dataSource: Usuario[] = [];
  contrasenaGenerada: string = '';
  nombre1: string = '';
  datos: any;
  cantidadUsuario=0;
  fechaSeleccionada!: Date;
  displayedColumns: string[]= ['idUsuario', 'matricula', 'nombre', 'apellidopaterno', 'apellidomaterno', 'email', 'pass', 'celular',
     'nivel', 'fechaalta', 'fechabaja'];
  nivelSeleccionado: string = '';
  opciones: string[] = ['Preparatoria', 'Facultad', 'Individual'];

  constructor(
    private api: ExamenService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router, 
    private dataService: DataService) {
  }

  public idUsuario = new FormControl('0', Validators.required);
  public matricula = new FormControl('');
  public nombre = new FormControl('', Validators.required);
  public apellidopaterno = new FormControl('', Validators.required);
  public apellidomaterno = new FormControl('', Validators.required);
  public email = new FormControl('', Validators.required);
  public pass = new FormControl('');
  public celular = new FormControl('', Validators.required);
  public nivel = new FormControl('');
  public fechabaja = new FormControl('', Validators.required);
  public fechaalta = new FormControl('');

  public formularioUsuarios = new FormGroup({
    idUsuario: this.idUsuario,
    matricula: this.matricula,
    nombre: this.nombre,
    apellidopaterno: this.apellidopaterno,
    apellidomaterno: this.apellidomaterno,
    email: this.email,
    pass: this.pass,
    celular: this.celular,
    nivel: this.nivel,
    fechabaja: this.fechabaja,
    fechaalta: this.fechaalta,
  });


  ngOnInit(): void {
    console.log('--ngOnInit USUARIOS ');
    console.log(this.dataService.nombre);
    console.log(this.dataService.perfil);
    //console.log(this.dataService.apellidopaterno);
    this.llenadoListaUsuarios();
  }

  clickGenerarcontrasena() {
    //console.log(this.opcionSeleccionada);
    if (this.formularioUsuarios.value.idUsuario == '0') {
      this.ventana('Agrege la matricula de un usuario ', 'ERROR');
    } else {
      console.log(this.formularioUsuarios.value);
      const longitud = 10; // Longitud de la contraseña
      const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let contrasena = '';
      for (let i = 0; i < longitud; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        contrasena += caracteres.charAt(indice);
      }
      this.contrasenaGenerada = contrasena;//console.log(this.formularioUsuarios.value);
      this.generarPassUpd(this.contrasenaGenerada);
      this.ventana('NueVa contrasena :' + this.contrasenaGenerada, 'OK');
    }
  }


  generarPassUpd(pass: string) {
    this.api.getUsuarioMatricula(Number(this.formularioUsuarios.value.idUsuario)).subscribe(
      (data) => {
        console.log(data);
        console.log(this.formularioUsuarios.value);
        //this.dataSource2 = data;
        this.nombre1 = data.nombre;
        this.formularioUsuarios.value.apellidomaterno = data.nombre;
        this.datos = data;
        console.log(this.dataService.pass);
        this.dataService.pass = data.pass;

        this.formularioUsuarios.value.matricula = data.matricula;
        this.formularioUsuarios.value.nombre = data.nombre;
        this.formularioUsuarios.value.apellidopaterno = data.apellidopaterno;
        this.formularioUsuarios.value.apellidomaterno = data.apellidomaterno;
        this.formularioUsuarios.value.email = data.email;
        this.formularioUsuarios.value.pass = pass;
        this.formularioUsuarios.value.celular = data.celular;
        this.formularioUsuarios.value.fechaalta = data.fechaalta;
        this.formularioUsuarios.value.fechabaja = data.fechabaja;
        console.log(this.formularioUsuarios.value);
        this.agregarUsuario();
      },
      (error) => {
        console.error('Error fetching data list:', error);
      }
    );

  }

  clickAgregarUsuario() {
    console.log(this.formularioUsuarios.value);
    console.log(this.nivelSeleccionado);
    let nivel='';

    if(this.nivelSeleccionado=='Preparatoria'){
      nivel='P';
      this.formularioUsuarios.value.nivel = 'Preparatoria';
    }
    if(this.nivelSeleccionado=='Facultad'){
      nivel='F';
      this.formularioUsuarios.value.nivel = 'Facultad';
    }
    if(this.nivelSeleccionado=='Individual'){
      nivel='I';
      this.formularioUsuarios.value.nivel = 'Individual';
    }

    if (this.formularioUsuarios.value.idUsuario == '0') {

      console.log(this.formularioUsuarios.value);
      const fechaActual: Date = new Date();
      const fechabaja: string = this.fechaSeleccionada.toLocaleDateString();
      const fechaalta: string = fechaActual.toLocaleDateString();
      this.formularioUsuarios.value.fechabaja = fechabaja;
      this.formularioUsuarios.value.fechaalta = fechaalta;
      console.log(fechaActual);
      console.log(fechaActual.toLocaleDateString());
      const { minutos, segundos, dia, mes, anio } = this.obtenerMinutosSegundosDeFecha(fechaActual);
      
      this.formularioUsuarios.value.matricula = 'CE' +nivel+  '0000'+this.cantidadUsuario;
      console.log(`Minutos: ${minutos}, Segundos: ${segundos}, dia: ${dia}, mes: ${mes}, anio: ${anio}`);
      console.log(this.formularioUsuarios.value.fechabaja);
      console.log(this.formularioUsuarios.value.fechaalta);
      console.log(this.formularioUsuarios.value.matricula);
      const longitud = 10; // Longitud de la contraseña
      const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let contrasena = '';
      for (let i = 0; i < 10; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        contrasena += caracteres.charAt(indice);
      }
      this.contrasenaGenerada = contrasena;
      console.log(this.contrasenaGenerada);
      this.formularioUsuarios.value.pass = this.contrasenaGenerada;
      this.agregarUsuario();
    } else {
      this.ventana('Para agregar un usuario indique el valor 0', 'ERROR');
    }
  }

  agregarUsuario(): void {
    console.log(this.formularioUsuarios.value);
    this.api.agregarUsuario(this.formularioUsuarios.value).subscribe(
      (response) => {
        console.log('Data added successfully:', response);
        this.ventana('USUARIO AGREGADO EXITOSAMENTE', 'OK');
        this.llenadoListaUsuarios();
      }, (error) => {
        console.error('Error adding data:', error);
      }
    );
  }

  clickModificarUsuario() {
    console.log(this.formularioUsuarios.value);
    console.log(this.fechaSeleccionada);
    console.log(this.nivelSeleccionado);

    if (this.nivelSeleccionado =='') {
      console.log('NO SE SELECCIONO NIVEL');
    }else{
      console.log(' SELECCIONO NIVEL' , this.nivelSeleccionado);
      this.formularioUsuarios.value.nivel = this.nivelSeleccionado ;
    }
    
    if (this.formularioUsuarios.value.idUsuario == '0') {
      this.ventana('No se puede modificar usuario con  idexamen sea 0', 'ERROR');
    } else {
      var fechabaja: any;
      console.log(this.formularioUsuarios.value);
      this.api.getUsuarioID(Number(this.formularioUsuarios.value.idUsuario)).subscribe(
        (data) => {
          console.log(data);
          if (data == null) {
            this.ventana('Usuario no valido', 'ERROR');
          } else {
            console.log(this.formularioUsuarios.value);

            if (this.formularioUsuarios.value.nombre == '') {
              this.formularioUsuarios.value.nombre = data[0].nombre;
            }
            if (this.formularioUsuarios.value.apellidopaterno == '') {
              this.formularioUsuarios.value.apellidopaterno = data[0].apellidopaterno;
            }
            if (this.formularioUsuarios.value.apellidomaterno == '') {
              console.log(this.formularioUsuarios.value.apellidomaterno);
              console.log(data[0].apellidomaterno);
              this.formularioUsuarios.value.apellidomaterno = data[0].apellidomaterno;
              console.log(this.formularioUsuarios.value.apellidomaterno);
            }
            if (this.formularioUsuarios.value.email == '') {
              console.log(data[0].email);
              console.log(this.formularioUsuarios.value.email);
              this.formularioUsuarios.value.email = data[0].email;
              console.log(this.formularioUsuarios.value.email);
            }
            if (this.formularioUsuarios.value.celular == '') {
              this.formularioUsuarios.value.celular = data[0].celular;
            }
            if (this.formularioUsuarios.value.nivel == '') { 
              this.formularioUsuarios.value.nivel = data[0].nivel;
            }
            if (this.formularioUsuarios.value.fechabaja == '' || this.fechaSeleccionada == null) {
              this.formularioUsuarios.value.fechabaja = data[0].fechabaja;
            } else {
              fechabaja = this.fechaSeleccionada.toLocaleDateString();
              this.formularioUsuarios.value.fechabaja = fechabaja;
            }
            this.formularioUsuarios.value.matricula = data[0].matricula;
            //this.formularioUsuarios.value.nivel = data.nivel;
            this.formularioUsuarios.value.fechaalta = data[0].fechaalta;
            this.formularioUsuarios.value.pass = data[0].pass;//this.formularioUsuarios.value.fechabaja = data.fechabaja;
            console.log(this.formularioUsuarios.value);
            this.agregarUsuario();
            this.ventana('Usuario modificaco exitosamente ', 'OK');
          }
        },
        (error) => {
          console.error('Error fetching data list:', error);
        }
      );
    }
  }

  clickEliminarUsuario() {
    if (this.formularioUsuarios.value.idUsuario == '' || this.formularioUsuarios.value.idUsuario == '0') {
      this.ventana('Agregar la Matricula del usuarior', 'ERROR');
    } else {
      console.log('CAMPO CON INFO ');
      //this.valoreliminar = Number(this.formularioExamen.value.idExamen);
      //this.bandera = !this.bandera; // Cambiar la condición al hacer clic, por ejemplo
      this.eliminarUsuario();
      this.llenadoListaUsuarios();
    }
    console.log(this.formularioUsuarios.value);
  }

  eliminarUsuario() {
    console.log(this.formularioUsuarios.value.idUsuario);
    this.api.eliminarUsuario(Number(this.formularioUsuarios.value.idUsuario)).subscribe(
      () => {
        console.log('Datos eliminados exitosamente');
      },
      error => {
        console.error('Error al eliminar datos:', error);
        this.ventana('Usuario eliminado correctamente', 'OK');
        this.llenadoListaUsuarios();
      }
    );
    this.llenadoListaUsuarios();
  }

  llenadoListaUsuarios() {
    //console.log(this.listaUsuarios);
    this.api.getUsuarios().subscribe(
      (data) => {
        this.dataSource = data;
        console.log(data);
        console.log(this.dataSource.length);
        this.cantidadUsuario = this.dataSource.length;
        console.log(this.cantidadUsuario);
      },
      (error) => {
        console.error('Error fetching data list:', error);
      }
    );
  }

  obtenerMinutosSegundosDeFecha(fecha: Date): { minutos: number, segundos: number, dia: number, mes: number, anio: number } {
    const minutos: number = fecha.getMinutes();
    const segundos: number = fecha.getSeconds();
    const dia: number = fecha.getDate();
    const mes: number = fecha.getMonth() + 1;
    const anio: number = fecha.getFullYear();
    return { minutos, segundos, dia, mes, anio };
  }


  soloNumeros(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault(); // Evitar la entrada de caracteres no numéricos
    }
  }

  submitForm() { }

  ventana(msj: string, sts: string) {
    this._snackBar.open(msj, sts, {
      duration: 10000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  logout() {
    console.log(' ------  login ');
    //this.router.navigateByUrl('/dashboard/student/studentCreate');    
    this.router.navigateByUrl('/login');
  }
  /*applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }*/
}
