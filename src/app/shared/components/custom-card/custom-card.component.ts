import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-custom-card',
  templateUrl: './custom-card.component.html',
  styleUrls: ['./custom-card.component.scss']
})
export class CustomCardComponent {
  @Input() public titleTranslationKey: string;
  @Input() public questionMarkTitle: string;
  @Input() public questionMarkText: string;
  @Input() public showCloseButton = false;
  @Input() public icon: string;
  @Input() public iconBackgroundClass: string;

  public getHeaderButtonsWidth(): number {
    let pixelSize = 0;

    if (this.showCloseButton) {
      pixelSize += 50;
    }

    if (this.questionMarkTitle && this.questionMarkTitle.length > 0) {
      pixelSize += 50;
    }
    return pixelSize;
  }
}
