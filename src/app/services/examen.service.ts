import { ObserversModule } from '@angular/cdk/observers';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { Menu } from '../interfaces/menu';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  private apiUrl = `${environment.serverApiUrl}`;
  //private apiUrl = 'http://localhost:8080'; // Reemplaza esto con tu URL de la API

  constructor( private http: HttpClient ) { }

  // --------------------------------------------API ftp
  //cargarArchivos(formData : FormData): Observable<any>{
    //return this.http.post<FormData>(`${this.apiUrl}/upload`, formData);
    //return this.http.post<FormData>(`${this.apiUrl}/upload`, formData);
  //}

  // --------------------------------------------API ASIGNACIONES
  getAsignaciones(): Observable<any> {
    //return this.http.get<Menu[]>('./assets/data/menu.json');
    return this.http.get(`${this.apiUrl}/asignaciones`);
  }

  getAsignacionesMatricula(matricula: string): Observable<any> {
    //return this.http.get<Menu[]>('./assets/data/menu.json');
    return this.http.get(`${this.apiUrl}/asignaciones/matricula?matricula=${matricula}`);
  }

  agregarAsignacion(newData: any): Observable<any> {
    console.log(newData)
    //return this.http.post<any>(`${this.apiUrl}/usuario`, newData);
    return this.http.post<any>(`${this.apiUrl}/asignaciones`, newData);
  }

  // --------------------------------------------API USUARIOS
  getUsuarios(): Observable<any> {
    //return this.http.get<Menu[]>('./assets/data/menu.json');
    //return this.http.get(`${this.apiUrl}/usuario`);
    return this.http.get(`${this.apiUrl}/usuarios`);
  }
  getUsuarioMatricula(matricula: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/usuarios/matricula?matricula=${matricula}`);
  }

  getUsuarioID(id: Number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/usuarios/idUsuario?idUsuario=${id}`);
  }
  agregarUsuario(newData: any): Observable<any> {
    console.log(newData)
    //return this.http.post<any>(`${this.apiUrl}/usuario`, newData);
    return this.http.post<any>(`${this.apiUrl}/usuarios`, newData);
  }

  eliminarUsuario(id: number): Observable<any> {
    //const url = `${this.apiUrl}/usuario/${id}`;
    const url = `${this.apiUrl}/usuarios/${id}`;
    return this.http.delete(url);
  }

  // --------------------------------------------API EXAMENES
  getExamens(): Observable<any> {
    //return this.http.get<Menu[]>('./assets/data/menu.json'); console.log(this.apiUrl);
    return this.http.get<any>(`${this.apiUrl}/examen`);
  }

  getExamensNivel(nivel: string): Observable<any> {
    //return this.http.get<Menu[]>('./assets/data/menu.json'); console.log(this.apiUrl);
    console.log(nivel);
    return this.http.get<any>(`${this.apiUrl}/examen/nivel?nivel=${nivel}`);
  }

  getExamenIdExamen(idExamen: Number): Observable<any> {
    //return this.http.get<Menu[]>('./assets/data/menu.json');
    return this.http.get<any>(`${this.apiUrl}/examen/${idExamen}`);
  }

  agregarExamen(newData: any): Observable<any> {
    console.log (newData)
    return this.http.post<any>(`${this.apiUrl}/examen`, newData);
  }

  
  eliminarExamen(id: number): Observable<any> {
    const url = `${this.apiUrl}/examen/${id}`;
    return this.http.delete(url);
  }

  //API RESULTADOS
  getResultados(): Observable<any> {
    //return this.http.get<Menu[]>('./assets/data/menu.json');
    return this.http.get<any>(`${this.apiUrl}/resultado`);
  }

  guardarResultado(newData: any): Observable<any> {
    console.log (newData)
    return this.http.post<any>(`${this.apiUrl}/resultado`, newData);
  }

  downloadCSV(): Observable<any> {
    //return this.http.get<Menu[]>('./assets/data/menu.json');
    //return this.http.get<any>(`${this.apiUrl}/resultado`);
    return this.http.get<any>(`${this.apiUrl}/resultado` ,{ observe: 'body' })

  }



  //API PREGUNTAS
  getPreguntas(): Observable<any> {
    //return this.http.get<Menu[]>('./assets/data/menu.json');
    return this.http.get<any>(`${this.apiUrl}/pregunta`);
  }

  getPreguntasId(idPregunta: number): Observable<any> {
    //return this.http.get<Menu[]>('./assets/data/menu.json');
    return this.http.get<any>(`${this.apiUrl}/pregunta/${idPregunta}`);
  }
  getPreguntasIdExamen(idExamen: string): Observable<any> {
    //return this.http.get<Menu[]>('./assets/data/menu.json');
    return this.http.get<any>(`${this.apiUrl}/pregunta/idExamen?idExamen=${idExamen}`);
  }
 
  agregarPregunta(newData: any): Observable<any> {
    console.log (newData)
    return this.http.post<any>(`${this.apiUrl}/pregunta`, newData);
  }

  eliminarPregunta(id: number): Observable<any> {
    const url = `${this.apiUrl}/pregunta/${id}`;
    return this.http.delete(url);    
  }

}
