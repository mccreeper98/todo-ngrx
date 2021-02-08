import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuOpened: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  openMenu(){
    this.menuOpened = true;
  }

  closeMenu(){
    this.menuOpened = false;
  }

}
