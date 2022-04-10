import { HttpService } from './../../../services/http.service';
import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Languages } from 'src/app/models/languages';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../../services/language.service';
import { NavigationService } from '../../../services/navigation.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit, OnDestroy {
  @Input() isSoftSkills: boolean = false;
  @Input() scroll: boolean = false;

  public hardSkills: any;
  public softSkills: any;
  public hsTitle: string = "";
  public ssTitle: string = "";
  public quote: string = "";

  private languages: Languages = {english: true, deutsch: false};
  private _languagesSubscr = new Subscription;

  @ViewChild('skillsEl') skillsEl!: ElementRef<HTMLElement>;

  constructor(
    private readonly _httpService: HttpService,
    private readonly _languageServie: LanguageService,
    private readonly _navigationService: NavigationService,
    ) {
      this._languagesSubscr = this._languageServie.languages.subscribe(languages => 
        {
          this.languages = languages; this._initSkillsData();
        }
      );
    }

  ngOnInit(): void {
    this._initSkillsData();
  }

  ngAfterViewInit(): void {
    if (this.scroll) {      
      this._navigationService.setSkills(this.skillsEl.nativeElement); 
    } 
  }

  private _initSkillsData(): void {
    // this.skills = Object.values(res[0])
    this._httpService.getSkills().then(res => {
      this.hsTitle = this.languages.english ? "Hard Skills" : "Hard Skills";
      this.ssTitle = this.languages.english ? "Soft Skills" : "Soft Skills";
      this.quote = this.languages.english ? "Constantly remind yourself of how little you truly know, and of how mysterious the world remains. Robert Greene" : "Erinnere dich ständig daran, wie wenig du wirklich weißt und wie mysteriös die Welt bleibt. Robert Grün";
      this.hardSkills = Object.values(res[0]).filter(skill => !skill.hasOwnProperty("soft_skill"));
      this.softSkills = Object.values(res[0]).filter(skill =>  skill.hasOwnProperty("soft_skill"));
    });
  }

  ngOnDestroy(): void {
    this._languagesSubscr.unsubscribe();
  }
}
