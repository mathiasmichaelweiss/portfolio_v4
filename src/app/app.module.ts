import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainOverviewComponent } from './components/overviews/main-overview/main-overview.component';
import { HeaderComponent } from './components/ui/header/header.component';
import { FooterComponent } from './components/ui/footer/footer.component';
import { ExperienceComponent } from './components/overviews/experience/experience.component';
import { SkillsComponent } from './components/overviews/skills/skills.component';
import { EducationComponent } from './components/overviews/education/education.component';
import { WorksComponent } from './components/overviews/works/works.component';
import { SkillComponent } from './components/ui/skill/skill.component';
import { CardItemComponent } from './components/ui/card-item/card-item.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MainOverviewComponent,
    HeaderComponent,
    FooterComponent,
    ExperienceComponent,
    SkillsComponent,
    EducationComponent,
    WorksComponent,
    SkillComponent,
    CardItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
