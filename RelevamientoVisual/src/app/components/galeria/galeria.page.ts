import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhotoService } from '../../services/photo.service';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../models/usuario';
import { Imagen } from 'src/app/models/imagen';


@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.page.html',
  styleUrls: ['./galeria.page.scss'],
})
export class GaleriaPage implements OnInit {
  verFotosLindas?: boolean;
  imagenesRT?: any[];
  title?:string;
  flag = false;

  constructor(private router: Router, public photoService: PhotoService, public usuarioSrv: UsuariosService) {
    if (this.router.url === '/cosasLindas') {
      this.title = 'Cosas LINDAS del edificio';
      this.verFotosLindas = true
    } else {
      this.title = 'Cosas FEAS del edificio';
      this.verFotosLindas = false
    }
    /*this.photoService.ObtenerTodos().then((resultado) => {
      this.imagenesRT = resultado.reverse();
      console.log(this.imagenesRT)
    });*/
  }

  ngOnInit() {
    /*setTimeout(() => {
      this.imagenesRT?.reverse()
    }, 1550);*/
    this.photoService.listenToChatChanges();

  }



  /*doRefresh(event:any) {
    setTimeout(() => {
        this.imagenesRT?.splice(0, this.imagenesRT?.length)
        this.photoService.ObtenerTodos().then((resultado) => {
          this.imagenesRT = resultado.reverse();
        });
        event.target.complete();
      }, 1000);
  }*/

   addPhotoToGallery() {
    this.photoService.sacarFoto().then((val) => {
      this.flag = true
      //this.doRefresh(true);
    });
  }

  trackById(index: number, photo: any): string {
    return photo.id; // Supongamos que tienes un campo "id" en cada elemento
  }

  public setLike(unaFoto:any) {

    let userLocal = localStorage.getItem('user');
    let entroFor = false;
    let user;
    if(userLocal){
      user = <Usuario>JSON.parse(userLocal);
      for (let index = 0; index < unaFoto.like.length; index++) {
        let i = unaFoto.like.indexOf(user?.correo);
        entroFor = true;
        if (i==-1) {
            unaFoto.votos++;
            unaFoto.like.push(user?.correo);
            console.log("like")
            break;
        }
        if (i>-1) {
          unaFoto.votos--;
          unaFoto.like.splice(i, 1)
          console.log(unaFoto)
          break;
        }
      }

      if(unaFoto.like.length === 0 && !entroFor){
        unaFoto.votos++;
        unaFoto.like.push(user?.correo);
      }

      this.photoService.modificarFoto(unaFoto, unaFoto.id)
    }
  }

  graficos(){
    if(this.verFotosLindas){
      this.router.navigate(["graficoTorta"])
    }else{
      this.router.navigate(["graficoBarras"])
    }

  }
}
