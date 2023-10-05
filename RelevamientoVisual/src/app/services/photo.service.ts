import { Injectable } from '@angular/core';
import { Camera, CameraResultType , CameraSource } from '@capacitor/camera';
import { Usuario } from '../models/usuario';
import {  ref , uploadBytes , getDownloadURL, StorageReference, getStorage} from 'firebase/storage';
import { Firestore, addDoc, collection, getDocs, doc,updateDoc,collectionData} from '@angular/fire/firestore';
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
    let usuario = localStorage.getItem('user');
    if(usuario)
      this.user = <Usuario>JSON.parse(usuario)
  }
 
  async sacarFoto() {
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
          like:array
        }
        const usuarioRef = collection(this.firestore,'fotos');
        addDoc(usuarioRef,data); 
    });

  }

  async ObtenerTodos()
  {
    const querySnapshot = await getDocs(collection(this.firestore, "fotos"));
    querySnapshot.forEach((doc) => {
      let imagen = doc.data() as Imagen;
      imagen.id = doc.id
      this.misImagenes.push(imagen)
    });
    return this.misImagenes;
    
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
