import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {


@Output() scrolltoDiv = new EventEmitter<any>();


scrollTo(text:string){
  this.scrolltoDiv.emit(text);
}
}
