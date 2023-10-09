import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginPage } from './components/login/login.page';
import { SplashAnimadoPage } from './components/splash-animado/splash-animado.page';
import { ChatComponent } from './components/chat/chat.component';

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
    path: 'chat',component:ChatComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
