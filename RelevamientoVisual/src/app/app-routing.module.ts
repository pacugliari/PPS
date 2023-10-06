import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginPage } from './components/login/login.page';
import { SplashAnimadoPage } from './components/splash-animado/splash-animado.page';
import { GaleriaPage } from './components/galeria/galeria.page';
import { GraficoBarrasComponent } from './components/grafico-barras/grafico-barras.component';
import { GraficoTortaComponent } from './components/grafico-torta/grafico-torta.component';

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
  {
    path: 'graficoBarras',component:GraficoBarrasComponent
  },
  {
    path: 'graficoTorta',component:GraficoTortaComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
