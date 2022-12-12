import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { FirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AjustesComponent } from './compon/ajustes/ajustes.component';
import { FormsModule } from '@angular/forms';
import { ErrorHandler } from '@angular/core';
import { BarcodeScanner } from "@awesome-cordova-plugins/barcode-scanner/ngx";
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';


@NgModule({
  declarations: [AppComponent,AjustesComponent],
  imports: [
    BrowserModule,
    NgxQRCodeModule,
    FirestoreModule,
    FormsModule,
    IonicModule,
  AngularFireAuthModule,
  AngularFireDatabaseModule,
  AngularFireModule.initializeApp(environment.firebase),
  IonicModule.forRoot(), AppRoutingModule,
  provideFirebaseApp(() => initializeApp(environment.firebase)),
  provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), 
  provideStorage(() => getStorage())],
  providers: [ BarcodeScanner,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {AngularFirestore}
