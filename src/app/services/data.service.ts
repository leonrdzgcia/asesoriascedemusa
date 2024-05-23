import { ObserversModule } from '@angular/cdk/observers';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';




@Injectable({
  providedIn: 'root'
})
export class DataService {

  public matricula: any;
  public nombre: any;
  public apellidopaterno: any;
  public apellidomaterno: any;
  public email: any;
  public pass: any;
  public celular: any;
  public fechaAlta: any;
  public fechaBaja: any;
  public examenasignado: any;
  public examenavideo: number ;
  public idExamenSeleccionado: number;  
  public perfil: any;
  public examen1: any;
  public examen2: any;
  public examen3: any;
  public banderaUsuario: any;
  public tiempoExamen:number = 0; ///1 con tiempo, 2 sin teimpo
  public video: any;

  constructor() {
    this.matricula = 0; 
    this.nombre = 'jonathan Sanchez';
    this.apellidopaterno = 'P';
    this.apellidomaterno = 'M';
    this.pass= '';
    this.email = ''; 
    this.celular = ''; 
    this.fechaAlta = ''; 
    this.fechaBaja = '';
    this.examenasignado = 26;  
    this.examenavideo= 0;  
    this.idExamenSeleccionado= 0;  
    this.perfil = 'NA';  
    this.examen1 = 0;  
    this.examen1 = 0;  
    this.examen3 = 3;  
    this.banderaUsuario = 1;  
    this.video= 0;  
  }

}
