import { Component, input } from '@angular/core';

@Component({
  selector: 'app-course-section',
  imports: [],
  templateUrl: './course-section.html',
  styleUrl: './course-section.css',
})
export class CourseSection {
  title = input<string>('');
  items = input<string[]>([]);
}
