import { Component } from '@angular/core';
import { UserNavbarComponent } from "../../../../shared/ui/user-navbar/user-navbar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-organizer-layout',
  imports: [UserNavbarComponent , RouterOutlet],
  templateUrl: './organizer-layout.component.html',
  styleUrl: './organizer-layout.component.css'
})
export class OrganizerLayoutComponent {

}
