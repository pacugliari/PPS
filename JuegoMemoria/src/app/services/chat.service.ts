import { Injectable } from '@angular/core';
import { Mensaje } from '../models/mensaje';
import { Observable } from 'rxjs';
import { Firestore,getDocs, collection, onSnapshot, query, addDoc,doc,deleteDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public mensajes : Array<Mensaje> = [];

  constructor(private firestore : Firestore) { }


  listenToChatChanges(aulaSeleccionada: string) {
    this.mensajes = [];
    const q = query(collection(this.firestore, aulaSeleccionada));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      this.mensajes = [];
      querySnapshot.forEach((doc) => {
        let chat = doc.data() as Mensaje;
        this.mensajes.push(chat);
      });
      this.mensajes = this.mensajes.sort((a,b)=> Number(b.fecha)-Number(a.fecha));
    });
    
  }

  async enviarMensaje(aulaSeleccionada: string, mensaje: Mensaje) {
    let data = { 
      fecha:mensaje.fecha, 
      mensaje: mensaje.mensaje, 
      usuario: mensaje.usuario,
      perfil: mensaje.perfil
    }
    const cargasRef = collection(this.firestore,aulaSeleccionada);
    await addDoc(cargasRef,data); 
  }

}
