import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from './services/user.service';
import { CategoryService } from './services/category.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public identity:any;
  public categories:any
  private checkIdentity;
  constructor(
    
    private userService:UserService,
    private categoryService:CategoryService
  ){
     
    this.checkIdentity=setInterval(()=>{
      this.identity=userService.getIdentityFromStorage()
    },500)
    this.loadCategories()

  }
  public loadCategories(){
    this.categoryService.getCategories().subscribe({
      next:(response:any)=>{
        if(response.status===200){
          console.log(response)
          this.categories=response.data
        }else{
          this.categories=null
        }
      },
      error:(err:Error)=>{
        this.categories=null
        console.log(err)
      }
    })
  }
}
