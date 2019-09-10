import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent  {

  @Input()
  public showCloseButton = false;

  @Output()
  public closeButtonClicked = new EventEmitter();

  constructor() { }

  public closeMenu():void{
    this.closeButtonClicked.emit();
  }


 

}
