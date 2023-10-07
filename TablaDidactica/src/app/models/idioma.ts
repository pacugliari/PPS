import { IColor } from './colores';
import { IAnimal, ANIMALES } from './animales';
import { INumero,NUMEROS } from './numeros';
import { COLORES } from "./colores";
import { Cuadro } from "./cuadro";

export enum EtipoJuego{ colores,numeros,animales}
export enum EtipoIdioma{ español,ingles,portugues}


export class Idioma 
{
   public listaCuadros:Cuadro[];
   public listaColores:IColor[];
   public listaNumeros:INumero[];
   public listaAnimales:IAnimal[];

   public pathFotoIdioma:string;
   public pathFotoJuego:string;
   public tipoJuego:any;
   public idiomaActual:EtipoIdioma;   
   
   public constructor()
   {
        this.tipoJuego=EtipoJuego.colores;
        this.idiomaActual=EtipoIdioma.español;
        this.pathFotoIdioma="assets/banderas/español.png";
        this.pathFotoJuego="assets/colores/circulo-de-color.png";

        //cargo las listas
        this.listaColores=COLORES; 
        this.listaNumeros=NUMEROS;
        this.listaAnimales=ANIMALES;

        this.listaCuadros=[];
        this.listaCuadros.push(new Cuadro());
        this.listaCuadros.push(new Cuadro());
        this.listaCuadros.push(new Cuadro());
        this.listaCuadros.push(new Cuadro());
        this.listaCuadros.push(new Cuadro());
        this.listaCuadros.push(new Cuadro());
        this.Español();

   }

   private CambiarIconoJuego()
   {
        switch (this.tipoJuego) {
             case EtipoJuego.colores:                                          
                    this.pathFotoJuego="assets/colores/circulo-de-color.png";
                  break;
             case EtipoJuego.numeros:                  
                    
                    this.pathFotoJuego="assets/numeros/bloques-numericos.png";
                  break;
            case EtipoJuego.animales: 

                    this.pathFotoJuego="assets/animales/mascotas.png";
                  break;

        }
   }

   public Español()
   {
          this.pathFotoIdioma="assets/banderas/español.png";
          this.idiomaActual=EtipoIdioma.español;
          let i=0;

          switch (this.tipoJuego) {
               case EtipoJuego.colores:

                    for(i=0;i<this.listaCuadros.length;i++)
                    {
                         this.listaCuadros[i].colorBoton=this.listaColores[i].colorBoton;
                         this.listaCuadros[i].pathFoto=this.listaColores[i].pathFoto;
                         this.listaCuadros[i].pathSonido=this.listaColores[i].pathSonidoEspañol;
                    }
          
                    break;
               case EtipoJuego.numeros:
                    
                    for(i=0;i<this.listaCuadros.length;i++)
                    {

                         this.listaCuadros[i].colorBoton=this.listaNumeros[i].colorBoton;
                         this.listaCuadros[i].pathFoto=this.listaNumeros[i].pathFoto;
                         this.listaCuadros[i].pathSonido=this.listaNumeros[i].pathSonidoEspañol;
                    }
                    
          
                    break;
               case EtipoJuego.animales:
                    
                    for(i=0;i<this.listaCuadros.length;i++)
                    {
                         this.listaCuadros[i].colorBoton=this.listaAnimales[i].colorBoton;
                         this.listaCuadros[i].pathFoto=this.listaAnimales[i].pathFoto;
                         this.listaCuadros[i].pathSonido=this.listaAnimales[i].pathSonidoEspañol;
                    }
                    
                    break;
                    
               }
          this.CambiarIconoJuego();
   }

   public Ingles()
   {
          this.pathFotoIdioma="assets/banderas/ingles.png";
          this.idiomaActual=EtipoIdioma.ingles;
          let i;
          switch (this.tipoJuego) {
               case EtipoJuego.colores:

                    for(i=0;i<this.listaCuadros.length;i++)
                    {
                         this.listaCuadros[i].colorBoton=this.listaColores[i].colorBoton;
                         this.listaCuadros[i].pathFoto=this.listaColores[i].pathFoto;
                         this.listaCuadros[i].pathSonido=this.listaColores[i].pathSonidoIngles;
                    }
          

                    
                    break;
               case EtipoJuego.numeros:

                    for(i=0;i<this.listaCuadros.length;i++)
                    {
                         this.listaCuadros[i].colorBoton=this.listaNumeros[i].colorBoton;
                         this.listaCuadros[i].pathFoto=this.listaNumeros[i].pathFoto;
                         this.listaCuadros[i].pathSonido=this.listaNumeros[i].pathSonidoIngles;
                    }
                    
                    break;
               case EtipoJuego.animales:

                    for(i=0;i<this.listaCuadros.length;i++)
                    {
                         this.listaCuadros[i].colorBoton=this.listaAnimales[i].colorBoton;
                         this.listaCuadros[i].pathFoto=this.listaAnimales[i].pathFoto;
                         this.listaCuadros[i].pathSonido=this.listaAnimales[i].pathSonidoIngles;
                    }
                    
                    break;

          }    

          this.CambiarIconoJuego();
   }

   public Portugues()
   {
          this.pathFotoIdioma="assets/banderas/portugues.png";
          this.idiomaActual=EtipoIdioma.portugues;
          let i;

          switch (this.tipoJuego) {
               case EtipoJuego.colores:

                    for(i=0;i<this.listaCuadros.length;i++)
                    {
                         this.listaCuadros[i].colorBoton=this.listaColores[i].colorBoton;
                         this.listaCuadros[i].pathFoto=this.listaColores[i].pathFoto;
                         this.listaCuadros[i].pathSonido=this.listaColores[i].pathSonidoPortugues;
                    }
          
                    
                    break;
               case EtipoJuego.numeros:

               
                    for(i=0;i<this.listaCuadros.length;i++)
                    {
                         this.listaCuadros[i].colorBoton=this.listaNumeros[i].colorBoton;
                         this.listaCuadros[i].pathFoto=this.listaNumeros[i].pathFoto;
                         this.listaCuadros[i].pathSonido=this.listaNumeros[i].pathSonidoPortugues;
                    }
                    
                    break;
               case EtipoJuego.animales:

                    for(i=0;i<this.listaCuadros.length;i++)
                    {
                         this.listaCuadros[i].colorBoton=this.listaAnimales[i].colorBoton;
                         this.listaCuadros[i].pathFoto=this.listaAnimales[i].pathFoto;
                         this.listaCuadros[i].pathSonido=this.listaAnimales[i].pathSonidoPortugues;
                    }
                    
                    break;

          }    
          this.CambiarIconoJuego();
   }
   
}


