import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { Languages } from 'src/app/models/languages';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit, OnDestroy {
  public educations: any;
  public button: string = "";
  public title: string = "";
  public certificate: string = "";

  private languages: Languages = {english: true, deutsch: false};
  private _languagesSubscr = new Subscription;

  constructor(
    private readonly _httpService: HttpService,
    private readonly _languageService: LanguageService,
    ) {
    this._languagesSubscr = this._languageService.languages.subscribe(languages => 
      {
        this.languages = languages; this._initEducationsData();
      }
    );
  }

  ngOnInit(): void {
    this._initEducationsData();
  }

  private _initEducationsData(): void {
    this._httpService.getEducations().then(res => {
      this.title = this.languages.english ? "Education" : "Ausbildung";
      this.button = this.languages.english ? "Contact with me" : "Bleiben Sie bei mir";
      this.certificate = this.languages.english ? "certificate" : "Zertifikat";
      this.educations = this.languages.english ? Object.values(res[0]) : Object.values(res[1]);      
    });
  }

  ngOnDestroy(): void {
    this._languagesSubscr.unsubscribe();
  }
}
