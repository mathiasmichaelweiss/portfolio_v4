import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
import { MenuItem } from '../../../models/menu';
import { HttpService } from '../../../services/http.service';
import { Subscription } from 'rxjs';
import { Languages } from 'src/app/models/languages';
import { NavigationService } from '../../../services/navigation.service';
import { WindowService } from 'src/app/services/window.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() english: boolean = true;
  @Input() deutsch: boolean = false;
  @Input() darkTheme: boolean = false;
  @Input() lightTheme: boolean = true;
  @Input() menu: boolean = false;

  public navigation: MenuItem = {
    education: "Education",
    experience: "Experience",
    skills: "Skills",
    works: "Works",
  };
  public experienceEl!: HTMLElement;
  public skillsEl!: HTMLElement | null;
  public educationEl!: HTMLElement;
  public worksEl!: HTMLElement;
  
  private _menuSubscr = new Subscription;
  private languages: Languages = {english: true, deutsch: false}

  constructor(
    private readonly _languageServie: LanguageService,
    private readonly _httpService: HttpService,
    private readonly _navigationService: NavigationService,
    private readonly _winRef: WindowService,
    ) {      
      this._initHeader();
      this._menuSubscr = this._languageServie.languages.subscribe(languages => 
        {
          this.languages = languages; this._initHeader()
        }
      );
    }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this._navigationService.experience$.subscribe(el => this.experienceEl = el);
    this._navigationService.skills$.subscribe(el => this.skillsEl = el);
    this._navigationService.education$.subscribe(el => this.educationEl = el);
    this._navigationService.works$.subscribe(el => this.worksEl = el);
  }

  public setLanguage(eng: boolean): void {
    this.english = eng;
    this.deutsch = !eng;

    this._languageServie.setLanguages({
      english: eng,
      deutsch: !eng
    })
  }

  public setTheme(light: boolean): void {
    this.darkTheme = !light;
    this.lightTheme = light;
  }

  public toggleMenu(): void {
    this.menu = !this.menu
  }

  private _initHeader(): void {
    this._httpService
      .getAllData()
      .toPromise()
      .then(res => {
        this.navigation = this.english ? res.menu.english : res.menu.german;
      });
  }

  ngOnDestroy(): void {
    this._menuSubscr.unsubscribe();
  }

  public scrollTo(element: HTMLElement | null): void {
    const y = element?.getBoundingClientRect().top + this._winRef.nativeWindow.pageYOffset - 100;
    this._winRef.nativeWindow.scrollTo({top: y, behavior: 'smooth'});
  }
}
