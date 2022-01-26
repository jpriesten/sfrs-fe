import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  loadingData = false;

  constructor(public core: CoreService, private router: Router) {}

  ngOnInit(): void {}

  async logout() {
    try {
      this.loadingData = true;
      await this.core.logout();
      this.router.navigate(['/login']);
      this.loadingData = false;
    } catch (error) {
      this.loadingData = false;
    }
  }
}
