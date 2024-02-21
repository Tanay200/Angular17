import { Component, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { NewsService } from '../news.service';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';

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

  constructor(private titleService:Title,private router: Router,private activatedRoute: ActivatedRoute,private newsService : NewsService){
    this.titleService.setTitle("The Daily Chronicle");

        // Subscribe to NavigationEnd event to update selected tab
        this.router.events.subscribe((event) => {
          if (event instanceof NavigationEnd) {
            this.updateSelectedTab();
          }
        });
  }

  ngOnInit(): void {
      // Initial update
      this.updateSelectedTab();
  }

  selectedTab: string = 'home';

  navigateTo(tab: string) {
    this.selectedTab = tab;
    this.newsService.selectedTab = this.selectedTab;
    this.router.navigate(['/headlines', tab]); // Navigate with route parameter
  }

  private updateSelectedTab(): void {
    const fullUrl = this.router.url;
    const parts = fullUrl.split('/'); // Split the URL by '/'
    this.selectedTab = parts[parts.length - 1]; // Get the last part of the URL
    this.newsService.selectedTab = this.selectedTab;
  }
  searchBar(){
    this.router.navigate(['/headlines', this.searchText]); // Navigate with route parameter
  }
}
