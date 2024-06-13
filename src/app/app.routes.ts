import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { UserConfigComponent } from './components/user-config/user-config.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'home',component:HomeComponent},
    {path:'login',component:LoginComponent},
    {path:'signup',component:SignupComponent},
    {path:'categoria/:id',component:HomeComponent},
    {path:'nueva-publicacion',component:NewPostComponent},
    {path:'configuracion-usuarios',component:UserConfigComponent},
    {path:'**',component:ErrorComponent}
];
