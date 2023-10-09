import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {

  @Input() error: string = "";

  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
  }

  Logout(){
    this.router.navigate(["/"]);
  }

  elegirAula(aula:any) {
    localStorage.setItem("aula",aula)
    this.router.navigate(["chat"]);
  }
}
