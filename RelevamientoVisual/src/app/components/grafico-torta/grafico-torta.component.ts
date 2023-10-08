import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { NgxSpinnerService } from 'ngx-spinner';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-grafico-torta',
  templateUrl: './grafico-torta.component.html',
  styleUrls: ['./grafico-torta.component.scss'],
})
export class GraficoTortaComponent {

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
    // Gráfico de torta (cosas lindas)
    const ctxTorta = this.canvas?.nativeElement.getContext('2d');
    this.chart = new Chart(ctxTorta, {
      type: 'pie',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Votos',
            data: this.data,
            backgroundColor: this.colores,
          },
        ],
      }
    });
  }

  ngAfterViewInit() {
    let respuesta = this.photoService.ObtenerVotos(true);
    this.labels = respuesta.labels;
    this.data = respuesta.data;
    this.mostrarGif = true;
    setTimeout(()=>{
      this.mostrarGif = false;
      this.logica();
    },1000);

    
  }

}
