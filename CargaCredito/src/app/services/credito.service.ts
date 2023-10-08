
import { Injectable } from '@angular/core';
import { CodigoQR } from '../models/codigoQR';
import { Firestore,getDocs, collection, onSnapshot, query, addDoc,doc,deleteDoc } from '@angular/fire/firestore';
import { Usuario } from '../models/usuario';
import { Carga } from '../models/carga';

@Injectable({
  providedIn: 'root'
})
export class CreditoService {

  private codigosQRValidos : Array<CodigoQR> = [];
  private cargas : Array<Carga> = [];

  constructor(private firestore : Firestore) {
  }

  async traerCodigosQR() {
    const querySnapshot = await getDocs(collection(this.firestore, "codigosQR"));
    querySnapshot.forEach((doc) => {
      let codigo = doc.data() as CodigoQR;
      this.codigosQRValidos.push(codigo)
    });
    return this.codigosQRValidos;
  }

  async traerCargas () {
    this.cargas=[];
    const querySnapshot = await getDocs(collection(this.firestore, "cargasQR"));
    querySnapshot.forEach((doc) => {
      let usuario = doc.data() as Carga;
      usuario.id = doc.id;
      this.cargas.push(usuario)
    });

  }

  async cargasUsuario(usuario:Usuario){
    await this.traerCargas();
    return this.cargas.filter((element) => element.usuario === usuario.id);
  }

  async eliminarCargas(usuario:Usuario){
    let cargasUsuario = await this.cargasUsuario(usuario);
    const cargasRef = collection(this.firestore,'cargasQR');
    cargasUsuario.forEach((element:Carga) => {
      console.log(element.id)
      const documento = doc(cargasRef,element.id);
      deleteDoc(documento);
    });

  }

  async yaCargo(monto: any,usuario:Usuario) {
    let cargasUsuario = await this.cargasUsuario(usuario);
    let cargasPorElMonto = cargasUsuario.filter((element)=> element.monto === monto).length
    let yaCargoEsteMonto = false;

    if((cargasPorElMonto === 0 && usuario.perfil !== "admin") ||
        (usuario.perfil === "admin") && (cargasPorElMonto === 0 || cargasPorElMonto === 1)){
      let data = { 
        monto:monto, 
        usuario: usuario.id, 
        fecha: new Date().getTime()
      }
      const cargasRef = collection(this.firestore,'cargasQR');
      addDoc(cargasRef,data); 
    }else{
      yaCargoEsteMonto = true;
    }

    return yaCargoEsteMonto;
  }


 
  







}