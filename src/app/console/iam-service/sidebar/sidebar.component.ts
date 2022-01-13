import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  isActive = false;
  collapsed = false;
  showMenu = 'settings';
  showMenu2 = '';
  classActive: any = null;
  pushRightClass = '';
  public loginUser = null;

  @Output() collapsedEvent = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  onActive(element: any) {
    //ElementRef

    if (this.classActive) {
      // last activated menu
      if (this.classActive === element) {
        this.classActive.classList.toggle('active'); //toggle off
        this.classActive = null;
        return; //exit
      }
      this.classActive.classList.toggle('active'); //toggle off last activated menu
    }
    element.classList.toggle('active'); // activated new menu
    this.classActive = element;
  }

  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  addExpandClass2(element: any) {
    if (element === this.showMenu2) {
      this.showMenu2 = '0';
    } else {
      this.showMenu2 = element;
    }
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
    this.collapsedEvent.emit(this.collapsed);
  }

  isToggled(): boolean {
    const dom: any = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
  }

  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
  }

  rltAndLtr() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle('rtl');
  }
}
