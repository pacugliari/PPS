import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Mensaje } from 'src/app/models/mensaje';
import { ChatService } from 'src/app/services/chat.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent  implements OnInit {

  aulaSeleccionada = "";
  usuarioActual: string = "";
  listaMensajes :Array<Mensaje> = [];
  mensaje: Mensaje = new Mensaje();
  mostrarGif:boolean = false;

  constructor(private router:Router,public chatService: ChatService,private route: ActivatedRoute) { 

  }


  cambiarChat(){
    localStorage.removeItem("aula")
    this.router.navigate(["home"])
  }

  async ngOnInit() {
    //CADA VEZ QUE SE NAVEGA AL COMPONENTE SE EJECUTA ESTE CODIGO
    this.route.url.subscribe(async() => {

      let aula = localStorage.getItem("aula");
      if(aula)
        this.aulaSeleccionada=aula;

      this.chatService.listenToChatChanges(this.aulaSeleccionada);
      this.mostrarGif=true;
      setTimeout(()=>{
        this.mostrarGif=false;
      },1000)
  
      let usuario = localStorage.getItem("user");
      if(usuario){
        let usuarioParseado = JSON.parse(usuario)
        this.mensaje.usuario = usuarioParseado.correo;
        this.mensaje.perfil = usuarioParseado.perfil
        this.usuarioActual = usuarioParseado.perfil;
      }

    });
   
  }


  async EnviarMensaje(){
    this.mensaje.fecha = new Date().getTime().toString();
    await this.chatService.enviarMensaje(this.aulaSeleccionada,this.mensaje);
    this.mensaje.mensaje = "";
  }


  async onKey(event:any){
    let contador = event.target.value.length;
    if(contador >= 21){
      this.alertMensaje("ERROR","El mensaje no puede tener mas de 21 caracteres","error");
      this.mensaje.mensaje = "";
    }
  }

  alertMensaje(titulo:any,mensaje:any,icon:any){
    Swal.fire({
      title:titulo,
      text:mensaje,
      icon:icon,
      heightAuto: false
    })
  }

  
}
