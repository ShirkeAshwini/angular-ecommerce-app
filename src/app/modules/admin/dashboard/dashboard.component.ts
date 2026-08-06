import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/core/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

searchText: string = '';

stats: any[] = [];

pieChartData: any;
barChartData: any;

selectedCard: any = null;

chartOptions = {
  responsive: true,
  maintainAspectRatio: false
};

constructor(private dashboardService: DashboardService) {}

ngOnInit(): void {
  this.loadDashboard();
}

loadDashboard() {
  this.dashboardService.getDashboardStats()
    .subscribe(res => {

      console.log("Dashboard Data:", res);

      // cards
      this.stats = res.stats;

      // charts
      this.pieChartData = res.pieChartData;
      this.barChartData = res.barChartData;
    });
}

refreshData() {
  this.loadDashboard();
}

selectCard(card: any) {
  this.selectedCard = card;
}

onSearch() {
  if (!this.searchText) {
    this.loadDashboard();
    return;
  }

  this.stats = this.stats.filter(x =>
    x.title.toLowerCase().includes(this.searchText.toLowerCase())
  );
}

chartClicked(event: any) {
  console.log(event);
}
}