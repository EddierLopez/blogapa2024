import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { timer } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
    public status:number;
    public user:User;
    constructor(
      private _userService:UserService
    ){
      this.status=-1;
      this.user=new User(1,"","","","","","");
    }

    onSubmit(form:any){
      this.user.role='user_role';
      this._userService.create(this.user).subscribe({
        next:(response)=>{
          console.log(response);
          if(response.status==201){
            form.reset();            
            this.changeStatus(0);
          }else{
            this.changeStatus(1);
          }
        },
        error:(error:Error)=>{
          this.changeStatus(2);
        }
      })
    }
    changeStatus(st:number){
      this.status=st;
      let countdown=timer(5000);
      countdown.subscribe(n=>{
        this.status=-1;
      })
    }
}
