import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/models/menu';
import { HttpService } from '../../../services/http.service';
import { Subscription } from 'rxjs';
import { Languages } from 'src/app/models/languages';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public navigation!: MenuItem;

  private _languagesSubscr = new Subscription;
  private languages: Languages = {english: true, deutsch: false}

  constructor(
    private readonly _httpService: HttpService,
    private readonly _languageService: LanguageService,
  ) {
    this._languagesSubscr = this._languageService.languages.subscribe(languages => 
      {
        this.languages = languages; this._initFooter();
      }
    );
  }

  ngOnInit(): void {
    this._initFooter();
  }

  private _initFooter(): void {
    this._httpService
      .getAllData()
      .toPromise()
      .then(res => {
        this.navigation = this.languages.english ? res.menu.english : res.menu.german;
      });
  }

  ngOnDestroy(): void {
    this._languagesSubscr.unsubscribe();
  }
}
