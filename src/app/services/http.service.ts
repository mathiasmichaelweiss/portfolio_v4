import { Resume } from './../models/resume';
import { Education } from './../models/education';
import { Skills } from './../models/skills';
import { Works } from './../models/works';
import { Experience } from './../models/experience';
import { Language } from './../models/languages';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Menu } from '../models/menu';
import { Button } from '../models/button';

interface AllData {
  name: Language;
  position: Language;
  resume: Language;
  about: Language;
  adress: Language;
  experience_eng: Experience[];
  experience_ger: Experience[];
  works: Works;
  skills_eng: Skills;
  skills_ger: Skills;
  education_eng: Education[];
  education_ger: Education[];
  resume_eng: Resume;
  resume_ger: Resume;
  menu: Menu;
  button: Button;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  mainDataUrl: string = '../../assets/data/main.json';

  constructor(private http: HttpClient) {}

  public getAllData(): Observable<AllData> {
    return this.http.get<AllData>(this.mainDataUrl);
  }

  public async getExperience(): Promise<Experience[][]> {
    let res: any;
    await this.http.get(this.mainDataUrl)
      .toPromise()
      .then((result: any) => {
        res = [result.experience_eng, result.experience_ger];
      });
    return res;
  }

  public async getSkills(): Promise<Skills[][]> {
    let res: any;
    await this.http.get(this.mainDataUrl)
      .toPromise()
      .then((result: any) => {
        res = [result.skills_eng, result.skills_ger];
      });
    return res;
  }

  public async getEducations(): Promise<Education[][]> {
    let res: any;
    await this.http.get(this.mainDataUrl)
      .toPromise()
      .then((result: any) => {
        res = [result.education_eng, result.education_ger];
      });
    return res;
  }

  public async getWorks(): Promise<Works[]> {
    let res: any;
    await this.http.get(this.mainDataUrl)
      .toPromise()
      .then((result: any) => {
        res = result.works;
      });
    return res;
  }
}
