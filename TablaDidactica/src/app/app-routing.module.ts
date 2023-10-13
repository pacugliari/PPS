import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPage } from './components/login/login.page';
import { SplashAnimadoPage } from './components/splash-animado/splash-animado.page';
import { HomeComponent } from './components/home/home.component';

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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
