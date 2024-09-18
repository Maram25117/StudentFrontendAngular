import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppbarComponent } from './appbar/appbar.component';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { BarComponent } from './bar/bar.component';
import { HomeComponent } from './home/home.component';
import { StudentComponent } from './student/student.component';
import { FormsModule } from '@angular/forms';
import { ClasseComponent } from './classe/classe.component';
import { RechercheComponent } from './recherche/recherche.component';
import { DocumentComponent } from './document/document.component';
import { LoginComponent } from './login/login.component';
import { QRCodeModule } from 'angularx-qrcode';
import { SafeUrlPipe } from './safe-url.pipe';
import { SignupComponent } from './signup/signup.component'; // Ajout de cette ligne*/
/*import { DialogConfirmDelete, DialogEditStudent } from './student/student.component';*/
@NgModule({
  declarations: [
    AppComponent,
    AppbarComponent,
    BarComponent,
    HomeComponent,
    StudentComponent,
    ClasseComponent,
    RechercheComponent,
    DocumentComponent,
    LoginComponent,
    SafeUrlPipe,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, //il faut l'importer pour l'utilisation des http des api
    FormsModule,
    BrowserAnimationsModule, // Ajoute BrowserAnimationsModule
    MatToolbarModule, // Importer MatToolbarModule
    MatButtonModule,  // Importer MatButtonModule
    QRCodeModule, // Ajout de cette ligne*/
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  /*entryComponents: [DialogConfirmDelete, DialogEditStudent]*/
})
export class AppModule { }


