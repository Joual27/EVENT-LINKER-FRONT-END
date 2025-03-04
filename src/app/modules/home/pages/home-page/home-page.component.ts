import { Component } from '@angular/core';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { NavbarComponent } from '../../../../shared/ui/navbar/navbar.component';

@Component({
  selector: 'app-home-page',
  imports: [HeroSectionComponent , NavbarComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
