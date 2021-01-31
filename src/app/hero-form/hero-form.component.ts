import { Component } from '@angular/core';


@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent {

  title = ['Title Page', 'Header 1', 'Header 2', 'Header 3', 'Header 4', 'Header 5'];

  interval = ['Interval', '1.0', '2.0', '3.0'];

  font = ['Font', 'Arial', 'Times new Roman'];

  fonsize = ['Font Size', '11', '12', '14'];

  fields = ['Fields', 'narrow', 'average', 'wide'];

  alignment = ['Alignment', 'right', 'left', 'middle', 'width'];

  temp1 = ['Title page', 'Numeration', 'Footer', 'Header'];

  temp2 = ['Bold', 'Italic', 'Underline'];



  submitted = false;

  onSubmit() { this.submitted = true; }

}
