import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginPage } from './components/login/login.page';
import { SplashAnimadoPage } from './components/splash-animado/splash-animado.page';
import { GaleriaPage } from './components/galeria/galeria.page';

const routes: Routes = [
  {
    path: 'login',component:LoginPage
  },
  {
    path: 'splash-animado',component:SplashAnimadoPage
  },
  {
    path: '',
    redirectTo: 'splash-animado',
    pathMatch: 'full'
  },
  {
    path: 'home',component:HomeComponent
  },
  {
    path: 'cosasLindas',component:GaleriaPage
  },
  {
    path: 'cosasFeas',component:GaleriaPage
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
