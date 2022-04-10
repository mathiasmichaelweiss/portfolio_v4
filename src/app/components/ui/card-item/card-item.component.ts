import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent implements OnInit {
  @Input() title!: string;
  @Input() subtitle!: string;
  @Input() date!: string;
  @Input() text!: string;
  @Input() logo!: string;

  @Input() width?: number;

  @Input() place?: string
  @Input() cetrtificate?: string
  @Input() placeLogo?: string
  @Input() time?: string;
  @Input() subject?: string;
  @Input() certificateText? : string;

  constructor() { }

  ngOnInit(): void {
  }

  public move(event: any, cardItem: HTMLElement) {
    cardItem.style.transformStyle =  'preserve-3d';
    cardItem.style.transform =  `translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(${(event.layerY - cardItem.clientWidth / 2) / 30}deg) rotateY(${(event.layerX - cardItem.clientWidth / 2) / 30}deg) rotateZ(0deg) skew(0deg, 0deg)`;
  }

  public out(cardItem: HTMLElement) {
    cardItem.style.transform = ''
  }

}