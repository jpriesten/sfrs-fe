import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  loadingData = false;

  constructor(public core: CoreService) {}

  ngOnInit(): void {}

  async logout() {
    try {
      this.loadingData = true;
      await this.core.logout();
      location.href = 'login';
      this.loadingData = false;
    } catch (error) {
      this.loadingData = false;
    }
  }
}
