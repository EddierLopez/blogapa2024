import { Component } from '@angular/core';
import { RouterLink,ActivatedRoute,Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { server } from '../../services/global';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { CategoryService } from '../../services/category.service';

declare var bootstrap: any;


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public posts:Array<Post>;
  public url:string;
  private checkPost;
  private checkAutorization;
  public identity:any;
  private postId:number;
  constructor(
    private postService:PostService,
    private userService:UserService,
    private categoryService:CategoryService,
    private route:ActivatedRoute,
    private router:Router
  ){
      this.postId=-1
      this.posts=[]
      this.url=server.url
      this.loadPosts()
      this.identity=this.userService.getIdentityFromStorage();
    this.checkPost=setInterval(()=>{
      this.loadPosts();
    },1000);
    this.checkAutorization=setInterval(()=>{
      this.identity=this.userService.getIdentityFromStorage();
    },1000);
  }

  loadPosts(){
    let idCat;
    this.route.params.subscribe(
      params=>{
        idCat=params['id']
      }
    )
    if(idCat){
      console.log(idCat)
      this.getPostsByCategory(idCat)
    }else{
      this.getPosts()
    }
  }
  private getPostsByCategory(id:number){
    this.categoryService.getCategory(id).subscribe(
      {
        next: (response:any)=>{
          if(response.status==200){
            //console.log(response);
            console.log(response.category.posts)
            this.posts=response.category.posts;
          }else{
            this.router.navigate(['']);
          }
        },
        error:(error:Error)=>{

        }
      }
    );
  }
  private getPosts(){
    this.postService.getPosts().subscribe({
      next:(response:any)=>{
        
        if(response.status==200){
          this.posts=response.data;
          console.log(this.posts);
        }
      },
      error:(err:Error)=>{

      }
    });
  }
  delete(){
    console.log("Eliminando el post "+this.postId);
    const modalElement = document.getElementById('deleteModal');
    modalElement?.setAttribute("data-bs-dismiss","modal")
  }
  openModal(id:number): void {    
    this.postId=id
    const modalElement = document.getElementById('deleteModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
}
