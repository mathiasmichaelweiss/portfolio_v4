import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EducationComponent } from './components/overviews/education/education.component';
import { ExperienceComponent } from './components/overviews/experience/experience.component';
import { MainOverviewComponent } from './components/overviews/main-overview/main-overview.component';
import { SkillsComponent } from './components/overviews/skills/skills.component';
import { WorksComponent } from './components/overviews/works/works.component';
import { SkillComponent } from './components/ui/skill/skill.component';

const routes: Routes = [
  {path: 'main', component: MainOverviewComponent},
  {path: 'experience', component: ExperienceComponent},
  {path: 'skills', component: SkillsComponent},
  {path: 'education', component: EducationComponent},
  {path: 'works', component: WorksComponent},
];
// const routes: Routes = [
//   { path: 'first-component', component: FirstComponent },
//   { path: 'second-component', component: SecondComponent },
// ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
