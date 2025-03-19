import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bio',
  imports: [],
  templateUrl: './bio.component.html',
  styleUrl: './bio.component.css'
})
export class BioComponent {
  @Input() bio !: string | undefined;


}
