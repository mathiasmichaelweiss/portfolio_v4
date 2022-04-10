import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { Languages } from 'src/app/models/languages';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../../services/language.service';
import { NavigationService } from '../../../services/navigation.service';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss']
})
export class WorksComponent implements OnInit, OnDestroy {
  public worksEnglish: any;
  public width: any;
  public activeCounter: number = 0;
  public devIcons: any;

  private left: number = 0;
  private leftDescr: number = 0;
  private counter: number = 0;
  private imageWidth: number = 450;
  
  private languages: Languages = {english: true, deutsch: false};
  private _languagesSubscr = new Subscription;

  @ViewChild('works') works!: ElementRef<HTMLElement>;

  constructor(
    private readonly _httpService: HttpService,
    private readonly _languageService: LanguageService,
    private readonly _navigationService: NavigationService,
    ) { 
    this._languagesSubscr = this._languageService.languages.subscribe(languages => 
      {
        this.languages = languages; this._initWorksData();
      }
    );
  }

  ngOnInit(): void {
    this._initWorksData();
  }

  ngAfterViewInit(): void {     
    this._navigationService.setWorks(this.works.nativeElement); 
  }


  public prev(
    imageWrapper: HTMLElement, 
    workImage: HTMLElement
    ): void {
    this.left += workImage.clientWidth;
    this.activeCounter = this.activeCounter - 1;

    if (this.activeCounter <= -1) {
      this.activeCounter = this.counter;
    }

    if (this.activeCounter < this.counter) {
      imageWrapper.style.left = this.left + 'px';
    } else if (this.activeCounter >= this.counter){
      this.left = - (imageWrapper.clientWidth)
      imageWrapper.style.left = - (imageWrapper.clientWidth) + "px";
    }

  }

  public next(
    imageWrapper: HTMLElement, 
    workImage: HTMLElement
    ): void {
    this.left -= workImage.clientWidth;

    this.activeCounter = this.activeCounter + 1;
  
    if (this.activeCounter === this.counter + 1) {
      this.activeCounter = 0;
    }
    
    if (this.activeCounter == 0) {
      this.left = 0;
      this.leftDescr = 0;
      imageWrapper.style.left = 0 + "px"; 
    } else {
      imageWrapper.style.left = this.left + 'px';
    }
  }

  private _initWorksData(): void {
    this._httpService.getWorks().then(res => {
      this.worksEnglish = Object.values(res).map(work => {
        return {
          devIcons: work.dev, 
          image: work.image, 
          textContent: this.languages.english ? work.languages.english : work.languages.german, 
          link: work.link
        }
    });
      this.counter = this.worksEnglish.length - 1;
      this.devIcons = this.worksEnglish.map((w: any) => Object.values(w.devIcons));
      this.width = this.counter * this.imageWidth;
    });
  }

  ngOnDestroy(): void {
    this._languagesSubscr.unsubscribe();
  }

}
