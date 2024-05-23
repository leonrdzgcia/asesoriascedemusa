export interface Pregunta {
  
  idPregunta?: number;
  idExamen   : number;
  id   : number;
  encabezado : string;
  pregunta   : string;
  preguntaImagen: string;
  respuesta_1: string;
  respuesta_2: string;
  respuesta_3: string;
  //respuestas: string[];
  correcta   : string;
  tipoRespuestas : string;
}