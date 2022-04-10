import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface Languages {
  english: boolean;
  deutsch: boolean
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  public languages = new Subject<Languages>();

  public setLanguages(value: Languages): void {
    this.languages.next(value);
  }

  constructor() { }
}
