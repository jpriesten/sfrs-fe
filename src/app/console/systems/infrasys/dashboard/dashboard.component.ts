import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  loadingData = false;
  unauthorisedDashboard = { authorised: true, description: '' };

  constructor(public core: CoreService) {}

  ngOnInit(): void {}
}
