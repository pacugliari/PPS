import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip'; 
import { MatIconModule } from '@angular/material/icon';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore} from '@angular/fire/firestore';
import { HomeComponent } from './components/home/home.component';
import { SplashAnimadoPage } from './components/splash-animado/splash-animado.page';
import { LoginPage } from './components/login/login.page';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

//Agregarr En App.module.ts (PROVIDER)
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { DeviceMotion } from '@ionic-native/device-motion/ngx';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SplashAnimadoPage,
    LoginPage
  ],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    CommonModule, 
    AppRoutingModule,
    IonicModule,
    FormsModule,
    MatInputModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    ReactiveFormsModule,
    SweetAlert2Module,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [
    ScreenOrientation,
    DeviceMotion,
    Flashlight,
    Vibration,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
