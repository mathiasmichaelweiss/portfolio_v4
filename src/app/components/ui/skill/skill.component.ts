import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {
  @Input() name!: string;
  @Input() logo!: string;
  constructor() { }

  ngOnInit(): void {
  }

}
