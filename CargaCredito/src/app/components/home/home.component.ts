
import { Carga } from '../../models/carga'
import { CreditoService } from '../../services/credito.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { BarcodeScanner, BarcodeScannerOptions } from "@ionic-native/barcode-scanner/ngx";
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/models/usuario';
import { CodigoQR } from 'src/app/models/codigoQR';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  esconder: boolean = true;
  scannedBarCode?: any;
  barcodeScannerOptions: BarcodeScannerOptions;
  carga: Carga = new Carga();
  codigosQRValidos : Array<CodigoQR> = [];
  usuario : Usuario = new Usuario();
  mostrarGif:boolean = false;
  cargasDelUsuario : Array<Carga> = [];
  verHist:boolean = false;

  constructor(private router: Router, 
      private scanner: BarcodeScanner,
      public creditoService: CreditoService, 
      public toastController: ToastController,
      private route: ActivatedRoute
     ) {

    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };


  }

  verHistorial(){
    this.verHist = !this.verHist;
  }

   preguntar(monto:any){
    Swal.fire({
      title: 'Esta por hacer una carga',
      text: "Monto a cargar:"+monto,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SI',
      cancelButtonText: 'NO',
      heightAuto: false
    }).then(async (result) => {
      if (result.isConfirmed) {
        let yaCargo = (await this.creditoService.yaCargo(monto,this.usuario));
        if(!yaCargo){
          this.mensaje("Carga acreditada","","success")
          await this.mostrarCredito();
        }else if(this.usuario.perfil === "admin"){
          this.mensaje("Error","Ya realizo la carga por el monto: "+monto+" (Limite 2)","error")
        }else
          this.mensaje("Error","Ya realizo la carga por el monto: "+monto+" (Limite 1)","error")
      }
    })
  }
  
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Ese codigo ya fue redimido.',
      duration: 2000,
      position: 'bottom',
      cssClass: 'toast-custom-class'
    });
    toast.present();
  }

  mensaje(titulo:any,mensaje:any,icon:any){
    Swal.fire({
      title:titulo,
      text:mensaje,
      icon:icon,
      heightAuto: false
    })
  }

  scanBRcode() {
    this.scanner.scan().then(res => {
      this.scannedBarCode = res;
      let codigo = this.scannedBarCode["text"];
      let montoCarga = this.validarCodigo(codigo);
      if(montoCarga !== -1)
        this.preguntar(montoCarga);
      else
        this.mensaje("Error","QR no valido","error");

    }).catch(err => {
      alert(err);
    });
  }

  validarCodigo(codigo: string) {
    let retorno = -1;
    this.codigosQRValidos.forEach((element:CodigoQR) => {
      if (element.codigo === codigo){
        retorno = element.valor;
      }
    });
    return retorno;
  }


    async ngOnInit() {
      //CADA VEZ QUE SE NAVEGA AL COMPONENTE SE EJECUTA ESTE CODIGO
      this.route.url.subscribe(async() => {

        let usuario = localStorage.getItem('user');
        if(usuario){
          this.usuario = JSON.parse(usuario);
    
        }
    
        await this.mostrarCredito();
  
      //CODIGOS QR DE LA BASE
      this.creditoService.traerCodigosQR()
        .then((respuesta)=> {
          this.codigosQRValidos = respuesta;
        });
      });

   }




  Logout() {
    localStorage.removeItem('user');
    this.router.navigateByUrl('/');
    this.carga=new Carga();
    //this.router.navigateByUrl('/recarga', {skipLocationChange: true}).then(()=> this.router.navigate(['']));
  }




  async mostrarCredito() {
    this.cargasDelUsuario = await this.creditoService.cargasUsuario(this.usuario)
    this.cargasDelUsuario.sort((a, b) => Number(b.fecha) - Number(a.fecha));

    this.carga.monto = (await this.creditoService.cargasUsuario(this.usuario)).reduce(function (resultado, elemento) {
      return resultado + elemento.monto;
    }, 0);
  }


  esconderCreditos() {
    return this.esconder = !this.esconder;
  }



  async eliminarCreditos() {
    await this.creditoService.eliminarCargas(this.usuario);
    this.mostrarGif = true;
    setTimeout(async ()=>{
      await this.mostrarCredito();
      this.mostrarGif = false;
      this.mensaje("Saldo reseteado","","success");
    },1000)
  }

 

}

