import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-questionmark',
  templateUrl: './questionmark.component.html',
  styleUrls: ['./questionmark.component.scss']
})
export class QuestionmarkComponent implements OnInit {

  @Input() public title: string;
  @Input() public text: string;

  constructor() { }

  ngOnInit() {

    
  }

}
