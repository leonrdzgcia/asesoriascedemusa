import { ObserversModule } from '@angular/cdk/observers';
import { HttpClient } from '@angular/common/http';
import { EventEmitter,Injectable, Output } from '@angular/core';
import { Menu } from '../interfaces/menu';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EnviarinformacionService {
  @Output() envioUsuario : EventEmitter<any> = new EventEmitter();
  @Output() envioExamen : EventEmitter<any> = new EventEmitter();

  private valorCompartido = new BehaviorSubject<string>(''); // Puedes ajustar el tipo según tus necesidades
  valorCompartidoActual = this.valorCompartido.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  cambiarValor(nuevoValor: string) {
    this.valorCompartido.next(nuevoValor);
  }

  
}
