import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-questionmark-picture',
  templateUrl: './questionmark-picture.component.html',
  styleUrls: ['./questionmark-picture.component.scss']
})
export class QuestionmarkPictureComponent implements OnInit {

  @Input() public title: string;
  @Input() public text: string;
  @Input() public picturePath: string;
  @Input() public pictureAlt: string;

  constructor() { }

  ngOnInit() {
  }

}
