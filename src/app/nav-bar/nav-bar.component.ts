import { Component, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { filter } from 'rxjs';
import { NewsService } from '../news.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatSidenavModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    RouterOutlet,
    HttpClientModule
  ],
  providers:[NewsService],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {

  searchText: string = "";

  constructor(private router: Router,private activatedRoute: ActivatedRoute,private newsService : NewsService){}
  ngOnInit(): void {


      // Initial update
      this.updateSelectedTab();
  }

  selectedTab: string = 'home';

  navigateTo(tab: string) {
    this.selectedTab = tab;
    this.router.navigate(['/headlines', tab]); // Navigate with route parameter
  }

  private updateSelectedTab(): void {
    // Extract tab information from route parameters
    const currentTab = this.activatedRoute.snapshot.firstChild?.routeConfig?.path || 'home';
    this.selectedTab = currentTab;
    this.newsService.selectedTab = this.selectedTab;
  }

  searchBar(){
    this.router.navigate(['/headlines', this.searchText]); // Navigate with route parameter
  }
}
