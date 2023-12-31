import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Idioma,EtipoJuego, EtipoIdioma } from '../../models/idioma';


@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
})
export class HomeComponent {

  public manejadora:Idioma;
  public tipoJuego?:string;
  

  constructor(private router:Router) 
  {
     this.manejadora = new Idioma();
     console.log(this.manejadora.pathFotoIdioma);
  }

  public Reproducir (pathSonido:string) {
    
    
    let audio = new Audio();
    console.log(pathSonido);
    audio.src = pathSonido;
    
    audio.load();
    audio.play();
  }

  public CambiarIdioma(idioma:string)
  {
      switch (idioma) 
      {
        case "español":
          this.manejadora.Español();
          break;
        case "ingles":
          this.manejadora.Ingles();
          break;
        case "portugues":
          this.manejadora.Portugues();
          break;
      
      }
  }

  salir(){
    localStorage.removeItem('user');

    this.router.navigateByUrl('/login')

  }

  public CambiarJuego(tipoJuego:string)
  { 
    switch (tipoJuego) {
      case "colores":
        this.manejadora.tipoJuego=EtipoJuego.colores;
        break;
      case "numeros":
        this.manejadora.tipoJuego=EtipoJuego.numeros;
        break;
      case "animales":
        this.manejadora.tipoJuego=EtipoJuego.animales;
        break;      
    }
    this.CambiarIdioma(EtipoIdioma[this.manejadora.idiomaActual]);

  }


}

