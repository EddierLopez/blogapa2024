import { Component } from '@angular/core';
import { RouterLink,ActivatedRoute,Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { server } from '../../services/global';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public posts:Array<Post>;
  public url:string
  constructor(
    private postService:PostService,
    private userService:UserService,
    private route:ActivatedRoute,
    private router:Router
  ){
      this.posts=[]
      this.url=server.url
      this.loadPosts()
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
    }
  }
}
