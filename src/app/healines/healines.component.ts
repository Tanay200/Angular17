import { Component } from '@angular/core';
import { NewsService } from '../news.service';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-healines',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    CommonModule
  ],
  templateUrl: './healines.component.html',
  styleUrl: './healines.component.css'
})
export class HealinesComponent {

  pageSize = 9; // Number of items per page
  currentPageIndex = 0; // Current page index (zero-based)
  totalItems: number = 0; // Total number of items
  pageSizeOptions: number[] = [8, 10, 25, 50]; // Available page sizes
  pagedHeadlines: any[] = []; // Array to hold current page of headlines
  isLoading:boolean = true;

  constructor(public newsService: NewsService,private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.newsService.selectedTab = params['selectedTab'];
      if(this.newsService.selectedTab == 'home'){
        this.newsService.selectedTab = 'India'
      }
      this.fetchNews();
    });



  }

  pageChanged(event: any): void {
    this.currentPageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedHeadlines(); // Update the pagedHeadlines array
  }

  updatePagedHeadlines(): void {
    this.isLoading = true;
    const startIndex = this.currentPageIndex * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.totalItems);
    this.pagedHeadlines = this.newsService.headlines.slice(startIndex, endIndex);
    this.isLoading = false;
  }

  fetchNews(): void {
    this.isLoading = true;
    this.newsService.fetchNews(this.newsService.selectedTab).subscribe((response) => {
      if (response != null) {
        this.newsService.headlines = response.articles.filter((obj: { urlToImage: string, description: string }) => obj.urlToImage && obj.description);
        this.totalItems = this.newsService.headlines.length; // Update totalItems after filtering
        this.updatePagedHeadlines(); // Update the pagedHeadlines array
        this.isLoading = false;
      }
    });
  }

  openUrl(url: string) {
    window.open(url, '_blank'); // Open the URL in a new tab
  }




}
