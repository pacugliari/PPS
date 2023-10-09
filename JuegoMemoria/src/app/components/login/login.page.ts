import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { UsuariosService } from '../../services/usuarios.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';  

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public unUsuario: Usuario =new Usuario();;
  public userValid: boolean = true;
  notfound: number = 0;
  private isEmail = /\S+@\S+\.\S+/;
  mostrar:boolean = false;

  userForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioSrv: UsuariosService
  ) {
    
  }

  async ngOnInit() {
    await this.usuarioSrv.traerUsuariosBase();
  }

  
 mostrarBotones()
 {
   this.mostrar = !this.mostrar;
 }

  onLogin() {
    this.unUsuario.correo=this.userForm.value.email ? this.userForm.value.email : "";
    this.unUsuario.clave = this.userForm.value.password  ? parseInt(this.userForm.value.password) : null;

    if(!this.usuarioSrv.obtenerUsuario(this.unUsuario)){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Usuario no autorizado',
        heightAuto: false
      })
     }else{
      this.router.navigate(['home'], { replaceUrl: true });
     }
    }

  selecCuenta(cuenta:any) {
    switch (cuenta) {
      case "admin@admin.com": {
        this.userForm?.setValue({email:'admin@admin.com',password: String(111111)});
        break;
      }
      case "invitado@invitado.com": {
        this.userForm?.setValue({email:'invitado@invitado.com',password: String(222222)});
        break;
      }
      case "usuario@usuario.com": {
        this.userForm?.setValue({email:'usuario@usuario.com',password: String(333333)});
        break;
      }
      case "anonimo@anonimo.com": {
        this.userForm?.setValue({email:'anonimo@anonimo.com',password: String(444444)});
        break;
      }
      case "tester@tester.com": {
        this.userForm?.setValue({email:'tester@tester.com',password: String(555555)});
        break;
      }
      default: {
        break;
      }
    }
    this.mostrarBotones();
  }

  isValidField(field: string): string {
    const validateField = this.userForm?.get(field);
    return !validateField?.valid && validateField?.touched
      ? 'is-invalid'
      : validateField?.touched
      ? 'is-valid'
      : '';
  }

}
