import { Injectable } from '@angular/core';
import { Camera, CameraResultType , CameraSource } from '@capacitor/camera';
import { Usuario } from '../models/usuario';
import {  ref , uploadBytes , getDownloadURL, StorageReference, getStorage} from 'firebase/storage';
import { Firestore, addDoc, collection, getDocs, doc,updateDoc,collectionData, query, onSnapshot} from '@angular/fire/firestore';
import { storage } from 'src/main';
import { Imagen } from '../models/imagen';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  imagenes?: any[];
  misImagenes:any[]=[];
  linda?:string;
  user?:Usuario;

  constructor(private firestore:Firestore) {
  }
 
  async sacarFoto() {
    let usuario = localStorage.getItem('user');
    if(usuario)
      this.user = <Usuario>JSON.parse(usuario)
    
    let capturedPhoto = await Camera.getPhoto({
      quality: 100,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      webUseInput: true,
    });

    let dataUrl = capturedPhoto.dataUrl;//obtengo el dataUrl
    let hora = new Date().getTime();//obtengo hora actual
    let ubicacion = "/" + this.user?.perfil + hora;//le digo la ubicacion de la foto en el firebaseStorage
    const imgRef = ref(storage,ubicacion)
    const blob = this.dataURLtoBlob(dataUrl);
    
    uploadBytes(imgRef,blob).then(()=>{
      this.guardarReferencia(imgRef);///despues de que se suba la imagen la va a guardar con datos en el firebase realtime database
    })
  }

  dataURLtoBlob(dataurl: any) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
  }

  guardarReferencia(pReferencia: StorageReference){
    const url = getDownloadURL(pReferencia)
      .then((resultado) => {
        let array:string[]=[]
        let linda = localStorage.getItem('lindo');
        if(linda)
          this.linda = linda;
        let data = { 
          esLinda:this.linda, 
          usuario: this.user?.correo, 
          votos:0, 
          referencia: resultado,
          like:array,
          fecha: new Date().getTime()
        }
        const usuarioRef = collection(this.firestore,'fotos');
        addDoc(usuarioRef,data); 
    });

  }

  private async ObtenerLikes()
  {
    let votadas :any[]=[];
    const querySnapshot = await getDocs(collection(this.firestore, "fotos"));
    querySnapshot.forEach((doc) => {
      let imagen = doc.data() as Imagen;
      imagen.id = doc.id
      if(imagen.like?.length !== 0){
        votadas.push(imagen);
      }
    });
    return votadas;
    
  }

  ObtenerVotos(imagenesLindas:boolean){
  let votos: { [clave: string]: any } = {};
  let labels : string[] = [];
  let data : number[] = [];
  let filtrado;
  this.ObtenerLikes()
    .then((respuesta)=> {
        if(imagenesLindas){
          filtrado = respuesta.filter((element:Imagen)=> element.esLinda==='true')
        }else{
          filtrado = respuesta.filter((element:Imagen)=> element.esLinda!=='true')
        }
        filtrado.forEach((element:Imagen) => {
          if(element.usuario && typeof votos[element.usuario] !== 'undefined'){
            votos[element.usuario]+= element.votos;
          } else{
            if(element.usuario)
              votos[element.usuario] = element.votos;
          }
        });

        for (let clave in votos) {
          if (votos.hasOwnProperty(clave)) {
            let valor = votos[clave];
            labels.push(clave)
            data.push(valor);
          }
        }
        //console.log(this.labels,this.data)
    })
    return { labels: labels, data: data};
  }

  listenToChatChanges() {
    this.misImagenes = [];
    const q = query(collection(this.firestore, "fotos"));//,orderBy("fecha", "desc")
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      this.misImagenes = [];
      querySnapshot.forEach((doc) => {
        let imagen = doc.data() as Imagen;
        imagen.id = doc.id
        this.misImagenes.push(imagen);
      });
    });
    
  }

  getFotos(){
    this.ordenarFotos();
    return this.misImagenes;
  }

  ordenarFotos() {
    this.misImagenes.sort((a:Imagen, b:Imagen) => {
      // Compara las fechas en milisegundos de forma descendente (orden más nuevo primero)
      if (!a.fecha && !b.fecha) {
        return 0; // Ambas fechas son nulas, no hay diferencia
      } else if (!a.fecha) {
        return 1; // 'a' tiene fecha nula, colócala después de 'b'
      } else if (!b.fecha) {
        return -1; // 'b' tiene fecha nula, colócala después de 'a'
      }
      return Number(b.fecha)-Number(a.fecha);
    });
  }

  modificarFoto(foto:any,id:any){
    //this.referenciaAlaColeccion.update(id,foto);
    const col = collection(this.firestore,'fotos')
    console.log(foto,id)
    const documento = doc(col,id);
    updateDoc(documento,{
      votos:foto.votos,
      like:foto.like
    });
  }
    
}
