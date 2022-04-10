import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  public experience$ = new Subject<HTMLElement>();
  public skills$ = new Subject<HTMLElement>();
  public education$ = new Subject<HTMLElement>();
  public works$ = new Subject<HTMLElement>();

  public setExperience(element: HTMLElement): void {
    this.experience$.next(element);
    console.log(element);
  }

  public setSkills(element: HTMLElement): void {
    this.skills$.next(element);
  }

  public setEducation(element: HTMLElement): void {
    this.education$.next(element);
  }

  public setWorks(element: HTMLElement): void {
    this.works$.next(element);
  }
}
