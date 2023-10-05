import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {

  /*constructor(private router:Router) { }

  ngOnInit() {
    if(localStorage.getItem("user") === null){
      this.logout();
    }
  }

  async logout(){
    localStorage.removeItem("user");
    this.router.navigate(['login'], { replaceUrl: true });
  }*/
  constructor(private router:Router) {}
  
  ngOnInit(): void {
  }

  cosasLindas(){
    localStorage.setItem('lindo','true');
    this.router.navigateByUrl('/cosasLindas')
  }

  cosasFeas(){
    localStorage.setItem('lindo','false');
    this.router.navigateByUrl('/cosasFeas')
  }

}
