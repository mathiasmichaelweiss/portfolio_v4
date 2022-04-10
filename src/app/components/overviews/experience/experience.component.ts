import { HttpService } from './../../../services/http.service';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Languages } from 'src/app/models/languages';
import { LanguageService } from '../../../services/language.service';
import { Subscription } from 'rxjs';
import { NavigationService } from '../../../services/navigation.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit, OnDestroy {
  @ViewChild('experienceElement') experienceElement: ElementRef | any;

  public experience: any;
  public quote: string = ""
  public button: string = "";
  public workExperience: string = "";


  private languages: Languages = {english: true, deutsch: false};
  private _languagesSubscr = new Subscription;

  constructor(
    private readonly _httpService: HttpService,
    private readonly _languageService: LanguageService,
    private readonly _navigationService: NavigationService,
    ) {
      console.log(this.experienceElement);
      
      this._navigationService.setExperience(this.experienceElement);
      this._languagesSubscr = this._languageService.languages.subscribe(languages => 
        {
          this.languages = languages; this._initExperience()
        }
      );
    }

  ngOnInit(): void {
    this._initExperience();
  }

  private _initExperience(): void {
    this._httpService
      .getAllData()
      .toPromise()
      .then(res => {
        this.button = this.languages.english ? res.button.english : res.button.german;
        this.languages.english ?
          (this._httpService.getExperience().then(res => this.experience = Object.values(res[0])),
          this.quote = "It is known that the success of any mechanism depends on the harmonious interaction of its elements. This also applies to the work of the team, which should become one team with a common goal, priorities and aspirations.", 
          this.workExperience = "Work Experience")
          
          :
          (this._httpService.getExperience().then(res => this.experience = Object.values(res[1])),
          this.quote = "Es ist bekannt, dass der Erfolg eines jeden Mechanismus vom harmonischen Zusammenspiel seiner Elemente abhängt. Dies gilt auch für die Arbeit des Teams, das zu einem Team mit gemeinsamen Zielen, Prioritäten und Bestrebungen werden soll.",
          this.workExperience = "Berufserfahrung")
      });
  }

  ngOnDestroy(): void {
    this._languagesSubscr.unsubscribe();
  }

}
