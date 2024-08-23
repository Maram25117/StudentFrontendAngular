import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'; // ajouter
import { ClasseComponent } from './classe/classe.component'; // ajouter
import { RechercheComponent } from './recherche/recherche.component';
import { DocumentComponent } from './document/document.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Ensure default route is login
  { path: 'home', component: HomeComponent }, // ajouter
  { path: 'classe', component: ClasseComponent }, // ajouter
  { path: 'recherche', component: RechercheComponent }, // ajouter
  { path: 'document', component: DocumentComponent },
  { path: 'login', component: LoginComponent }, // ensure login is explicitly declared
  { path: 'signup', component: SignupComponent } // ajouter
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


