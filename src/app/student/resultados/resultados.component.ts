import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Resultadoexcel } from 'src/app/interfaces/resultadoexcel';
import { Resultados } from 'src/app/interfaces/resultados';
import { DataService } from 'src/app/services/data.service';
import { ExamenService } from 'src/app/services/examen.service';
import * as XLSX from 'xlsx';
//import { Json2CsvParser } from 'json2csv';



@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss']
})
export class ResultadosComponent {

  dataResultados: any[] = [];
  dataResultadosA: Resultadoexcel[] = [];
  displayedColumns: string[] = ['idExamen', 'matricula', 'calificacion', 'correctas', 'incorrectas', 'totalPreguntas'
    , 'preguntasIncorrectas'
  ];

  separatedWords!: string[];

  constructor(
    private api: ExamenService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private dataService: DataService) {
  }

  ngOnInit(): void {
    console.log('-- ngOnInit ResultadosComponent');

    console.log('-- ngOnInit ASIGNACIONES');
    if (this.dataService.matricula == 0) {
      this.ventana('Favor de ingresar al portal nuevamente', 'OK');
      this.logout();
    } else {
      this.obtenerResultados();
    }

  }

  obtenerResultados() {
    this.api.getResultados().subscribe(
      (data) => {
        this.dataResultados = data;
        this.dataResultadosA = data;
        //this.dataSource = data;
        //this.arrayExamenes = data;
        console.log(data);
        console.log(data.length);

      },
      (error) => {
        console.error('Error fetching data list:', error);
      }
    );

  }

  clickDescarga() {

    console.log(this.dataResultados);
    console.log(this.dataResultadosA);
    console.log(this.dataResultadosA[0].id);
    console.log(this.dataResultadosA[0].idExamen);
    console.log(this.dataResultadosA[0].matricula);
    console.log(this.dataResultadosA[0].correctas);
    console.log(this.dataResultadosA[0].preguntasIncorrectas);
    this.separatedWords = this.dataResultadosA[0].preguntasIncorrectas.split(',');
    const arra = this.dataResultadosA[0].preguntasIncorrectas.split(',');
    console.log(arra);
    console.log(this.separatedWords);
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataResultados);
    //const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.separatedWords);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Datos');
    XLSX.writeFile(wb, 'DescargaResultados.xlsx');
  }

  clickCsv() {
    /*const a = document.createElement("a");
        a.href = "data:text/csv," + this.dataResultados;
        let filename = "archivoCsv";
        a.setAttribute("download", filename + ".csv");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);*/
    this.api.downloadCSV().subscribe(
      (response) => {
        const a = document.createElement("a");
        a.href = "data:text/csv," + response;
        let filename = "archivoCsv";
        a.setAttribute("download", filename + ".csv");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }

    )
  }
  ventana(msj: string, sts: string) {
    this._snackBar.open(msj, sts, {
      duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom'
    });
  }

  logout() {
    this.router.navigateByUrl('/login');
  }

}