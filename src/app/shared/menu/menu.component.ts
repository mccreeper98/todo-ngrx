import { Component, ElementRef, HostListener, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Output() close = new EventEmitter();
  @HostListener("click", ["$event"]) onClick(event: MouseEvent){
    const menuElem = this.elem.nativeElement;
    if(event.target === menuElem){
      this.closeMenu();
    }
  }

  menuItems = [
    {
      path: "todo",
      icon: "list",
      label: "My List"
    },
    {
      path: "create",
      icon: "add",
      label: "Add To Do"
    }

  ];

  constructor(
    private elem: ElementRef,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  closeMenu(){
    this.close.emit();
  }

  navigateToPage(path: string){
    this.router.navigate([path]);
    this.closeMenu();
  }

}
