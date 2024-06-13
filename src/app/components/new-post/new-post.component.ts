import { Component } from '@angular/core';
import { PostService } from '../../services/post.service';
import { CategoryService } from '../../services/category.service';
import { UserService } from '../../services/user.service';
import { Post } from '../../models/post';
import { AngularEditorConfig, AngularEditorModule } from '@wfpena/angular-wysiwyg';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [AngularEditorModule,FormsModule],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent {
  public status:number;
  public identity;
  public post:Post;
  private token;
  public categories:any;
  public fileName:string;
  editorConfig:AngularEditorConfig={
    minHeight:"100px",
    height:"10em",
    placeholder:"Escriba el contenido de la publicación acá",
    editable:true
  }

  constructor(
    private postService:PostService,
    private categoryService:CategoryService,
    private userService:UserService
  ){
    this.status=-1;
    this.identity=userService.getIdentityFromStorage();
    this.post=new Post(1,this.identity.iss,0,"","","",null);
    this.token=this.userService.getToken();
    this.fileName="";
    this.getCategories()
  }
  getCategories(){
    this.categoryService.getCategories().subscribe({
      next:(response:any)=>{
        if(response.status==200){
          this.categories=response.data;
        }
      },
      error:(err:Error)=>{
        this.categories=null;
        console.log(err);
      }
    });
  }

  onSubmit(form:any){
    console.log(this.post);
    this.token=this.userService.getToken();
    this.postService.createPost(this.post,this.token).subscribe({
      next:(response:any)=>{
        console.log(response)
        if(response.status==201){
          this.status=0;
          form.reset();
        }
      },
      error:(err:Error)=>{
        this.status=1;
      }
    });
  }
  uploadImage(event:any){
    const file:File=event.target.files[0];
    if(file){
      this.fileName=file.name;
      const formData=new FormData();
      formData.append('file0',file);
      this.postService.uploadImage(formData,this.token).subscribe({
        next:(response:any)=>{
          //console.log(response);
          if(response.status==200){
            this.post.image=response.image;
          }
        },
        error:(err:Error)=>{
          console.log(err);
        }
      });
    }
  }

}
