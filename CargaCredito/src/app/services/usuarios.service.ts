import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import {collection, Firestore, getDocs} from '@angular/fire/firestore';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  listaUsuarios:Usuario[] = [];

  constructor(private firestore : Firestore,private router:Router) {

  }

   async traerUsuariosBase() {
    const querySnapshot = await getDocs(collection(this.firestore, "usuarios"));
    querySnapshot.forEach((doc) => {
      let usuario = doc.data() as Usuario;
      usuario.id = doc.id;
      this.listaUsuarios.push(usuario)
    });
  }

  obtenerUsuario(unUsuario:Usuario):boolean{
    let flag:boolean=false;
    this.listaUsuarios.forEach((usuario)=>{
      if(usuario.correo===unUsuario.correo && usuario.clave ===unUsuario.clave){
        localStorage.setItem('user',JSON.stringify(usuario))
        flag = true;
      }
    })
    return flag;
  }



}
