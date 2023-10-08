import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { NgxSpinnerService } from 'ngx-spinner';
import { PhotoService } from 'src/app/services/photo.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';  

@Component({
  selector: 'app-grafico-barras',
  templateUrl: './grafico-barras.component.html',
  styleUrls: ['./grafico-barras.component.scss'],
})
export class GraficoBarrasComponent {

  @ViewChild('canvas') canvas?: ElementRef;

  chart :any;
  labels : string[] = [];
  data : number[] = [];
  mostrarGif: boolean = false;

  colores: string[] = [
    '#ffc409',   // Color base
    '#ffea6c',
    '#ffcd00',
    '#ffed4b',
    '#ffcc00',
    '#ffe833',
    '#ffdb1e',
    '#fff161',
    '#ffde33',
    '#fff580',
  ];

  constructor(private photoService:PhotoService,private spinner: NgxSpinnerService) {

  }

  logica(){
    // Gráfico de barras (votos de cosas feas)
    const ctxBarras = this.canvas?.nativeElement.getContext('2d');
    this.chart = new Chart(ctxBarras, {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Votos',
            data: this.data,
            backgroundColor: this.colores, // Color de las barras
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  

  ngAfterViewInit() {
    let respuesta = this.photoService.ObtenerVotos(false);
    this.labels = respuesta.labels;
    this.data = respuesta.data;
    this.mostrarGif = true;
    setTimeout(()=>{
      this.mostrarGif = false;
      this.logica();
    },1000);

    
  }

}


