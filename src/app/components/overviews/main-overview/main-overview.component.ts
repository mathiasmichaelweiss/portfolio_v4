import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { Observable, Subscription } from 'rxjs';
import { LanguageService } from '../../../services/language.service';
import { Languages } from 'src/app/models/languages';

@Component({
  selector: 'app-main-overview',
  templateUrl: './main-overview.component.html',
  styleUrls: ['./main-overview.component.scss']
})
export class MainOverviewComponent implements OnInit, OnDestroy {
  public about: string = "";
  public position: string = "";
  public button: string = "";

  private languages: Languages = {english: true, deutsch: false}
  private _languagesSubscr = new Subscription;

  constructor(
    private readonly _httpService: HttpService,
    private readonly _languageServie: LanguageService,
    ) { 
    this._languagesSubscr = this._languageServie.languages.subscribe(languages => 
      {
        this.languages = languages; this.initMainOverview()
      }
    );
  }

  ngOnInit(): void {
    this.initMainOverview();
  }

  private initMainOverview(): void {
    this._httpService
      .getAllData()
      .toPromise()
      .then(res => {
        this.about = this.languages.english ? res.about.english : res.about.german;
        this.position = this.languages.english ? res.position.english : res.position.german;
        this.button = this.languages.english ? res.button.english : res.button.german;
      });
  }  

  ngOnDestroy(): void {
    this._languagesSubscr.unsubscribe();
  }
}
