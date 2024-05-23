export interface Resultados {
  idPregunta: number;
  pregunta: string;
  tipoRespuesta: string; //0-1
  correcta: boolean; //0-1
  respuestaCorrecta: string;
  respuestaIncorrecta: string;
}