import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Examen } from 'src/app/interfaces/examen';
import { Examenmenu } from 'src/app/interfaces/examenmenu';
import { DataService } from 'src/app/services/data.service';
import { ExamenService } from 'src/app/services/examen.service';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  formLogin: FormGroup;
  loading = false;
  dataSource: any[] = [];
  valdue!: string | null;
  opciones: string[] = [];
  opcionesD: string[][] = [ ["matricula", "nombre", "pass"], ];
  banderaUsuario = false;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private api: ExamenService,
    private _snackBar: MatSnackBar,
    private router: Router) {
    this.formLogin = this.fb.group({
      usuario: ['', Validators.required],
      pass: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    console.log(this.dataService);    
    console.log('-- ngOnInit LOGIN');
    this.cambiarVariableGlobal();
    this.obtenerUsuarios();
    this.obtenerUsuariosMatriculas();
    console.log('-- ngOnInit LOGIN');
  }

  clickLogin() {
    this.obtenerUsuarios();

    console.log(this.dataSource);
    console.log(this.opcionesD);


    for (let i = 0; i <= this.dataSource.length; i++) {
      console.log(this.dataSource[i]);

      //console.log(element);

    }

    console.log(this.opciones);
    console.log(this.opcionesD);
    /*console.log(this.opcionesD[0][0]);    console.log(this.opcionesD[0][1]);console.log(this.opcionesD[1][0]);    console.log(this.opcionesD[1][1]);*/
    const user = this.formLogin.value.usuario;
    const pass = this.formLogin.value.pass;
    console.log(this.formLogin.value.usuario);
    console.log(user);
    console.log(pass);
    if (this.formLogin.value.usuario == 'admin') { 

      this.dataService.banderaUsuario = 1; // 1 - admin
      this.dataService.perfil = 'admin';
      this.dataService.nombre = 'Jonathan Sanchez';
      this.dataService.matricula = 'CEF00001';
      this.dataService.banderaUsuario = 1;
      console.log('-- ES ADMIN , bandera BANDERA ES '+this.dataService.banderaUsuario );
      this.loading = true;
      setTimeout(() => {
        this.router.navigate(['dashboard']);//this.loading = false;
      }, 1500);
    }
    else {
      console.log('-- ES USUARIO');
      console.log(this.opcionesD);
      for (let index = 0; index < this.opcionesD.length; index++) {
        //console.log(this.opcionesD[index][0]);
        //console.log(this.opcionesD[index][1]);
        if (this.formLogin.value.usuario == this.opcionesD[index][0]) {
          console.log(this.formLogin.value.usuario);
          console.log(this.opcionesD[index][0]);
          console.log(this.opcionesD[index][1]);
          this.banderaUsuario = true;
          this.dataService.banderaUsuario = 2; //2 - usuario
          this.dataService.perfil = 'user';
          this.dataService.matricula = this.opcionesD[index][0];
          this.dataService.nombre = this.opcionesD[index][1];
        }

      }

      /*for (let index = 0; index < this.opciones.length; index++) {
        if (this.formLogin.value.usuario == this.opciones[index].toString()) {        
          this.banderaUsuario= true;
          this.dataService.banderaUsuario =0; //banderaUsuario 0 - user
          this.dataService.perfil = 'user';
          this.dataService.matricula = 'user';
          this.dataService.nombre = 'user';
        }        
      }*/

      if (this.banderaUsuario) {
        console.log(this.dataService.banderaUsuario);
        console.log('ENTRO BANDERA');
        this.loading = true;
        setTimeout(() => {
          this.router.navigate(['dashboard']);//this.loading = false;
        }, 1500);
      } else {
        this.ventana('La matricula no existe', 'ERROR');
      }
    }
  }


  obtenerUsuariosMatriculas() {
    //console.log(this.listaUsuarios);
    this.api.getUsuarios().subscribe(
      (data) => {
        //this.dataSource = data;

        //this.opciones = data;
        console.log(data);
        console.log(data.length);
        for (let index = 0; index < data.length; index++) {
          console.log(data[index].matricula);
          this.opciones.push(data[index].matricula);
          this.opcionesD.push(
            [
              data[index].matricula, data[index].nombre + ' ' + data[index].apellidopaterno, data[index].pass
            ]
          );
        }
        console.log(this.opcionesD);

      },
      (error) => {
        console.error('Error fetching data list:', error);
      }
    );
  }

  obtenerUsuarios() {
    this.api.getUsuarios().subscribe(
      (data) => {
        this.dataSource = data;
        console.log(data);
        for (let i = 0; i <= data.length; i++) {
          const element = data[i].matricula;
          
        }
      },
      (error) => {
        console.error('Error fetching data list:', error);
      }
    );
  }

  cambiarVariableGlobal() {
    console.log(this.dataService);
    //this.dataService.nombre = 'Leo daniel';
    console.log(this.dataService.nombre);
    console.log(this.dataService.examenasignado);
  }

  clickValidar() {
    console.log(this.dataService);
    console.log(this.dataService.examenasignado);
    //console.log(this.opcionSeleccionada1, this.opcionSeleccionada2, this.opcionSeleccionada3);
    const user = this.formLogin.value.usuario;
    const pass = this.formLogin.value.pass;
    if (this.dataService.examenasignado == "26") {
      this.dataService.perfil = '1';
      console.log('ADMIN----');
      this.dataService.nombre = 'LEODAN';
      this.loading = true;
      setTimeout(() => {
        this.router.navigate(['dashboard']);//this.loading = false;
      }, 1500);
    } else {
      //this.fakeLoading();
      //console.log('-- validarExamen 4');
      //this.error();    //this.formLogin.reset();
      this.dataService.perfil = '0';
      console.log('USER----');
      this.dataService.nombre = 'LEODAN';
      this.loading = true;
      setTimeout(() => {
        this.router.navigate(['dashboard']);//this.loading = false;
        //this.router.navigate(['examentres']);
        //this.router.navigate(['examentres']);
      }, 1500);
    }

    if (this.dataService.examenasignado == 0) {
      console.log('No hay examenes asignados');
      this._snackBar.open('No hay examenes asignados', 'ERROR', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      })
    } else {
      if (user == "user1" && pass == "user1") {
      } else if (user == "user2") {
        this.dataService.perfil = '0';
        this.fakeLoading();
      } else if (user == "user3" && pass == "user3") {
      }
      else if (user == "admin") {
        this.dataService.nombre = 'LEODAN';
        this.loading = true;
        setTimeout(() => {
          this.router.navigate(['dashboard']);//this.loading = false;
        }, 1500);
      }
    }
  }

  login() {
    console.log(' ------  login ');
    //this.router.navigateByUrl('/dashboard/student/studentCreate');    
    this.router.navigateByUrl('/dashboard/student/usuarios');
  }

  fakeLoading() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['examentres']);
      //this.router.navigate(['examenvideo']);
      //this.loading = false;
    }, 1500);
  }

  limpiar() {
    this.formLogin.reset();
  }

  error() {
    this.limpiar();
    this._snackBar.open('Usuario incorrecto', 'ERROR', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

  ventana(msj: string, sts: string) {
    this._snackBar.open(msj, sts, {
      duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom'
    });
  }
}