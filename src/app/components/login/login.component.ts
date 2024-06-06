import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers:[UserService]
})
export class LoginComponent {
  public status:number;
  public user:User;
  constructor(
    private _userService:UserService,
    private _router:Router,
    private _routes:ActivatedRoute
  ){
    this.status=-1;
    this.user=new User(1,"","","","","","")
  }

  onSubmit(form:any){
    // console.log("Iniciando sesión")
    // console.log(this.user.email)
    this._userService.login(this.user).subscribe({
      next:(response:any)=>{        
        if(response.status!=401){
          sessionStorage.setItem("token",response);
          this._userService.getIdentityFromAPI().subscribe({
            next:(resp:any)=>{
              console.log(resp);
              sessionStorage.setItem('identity',JSON.stringify(resp));
              this._router.navigate(['']);
            },
            error:(error:Error)=>{
            }
          })
        }else{
          this.status=0;
        }
        
      },
      error:(err:any)=>{
        this.status=1;
      }
    })
  }

}
