import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  API_KEY  : string= 'cf9b45e6830c4304ac39413b2880f81e';
  url : string = 'https://newsapi.org/v2/everything?q=';

  headlines: any = [];
  selectedTab : string = 'India';


  constructor(private httpClient : HttpClient) { }

  fetchNews(search:string):Observable<any> {
    // return this.httpClient.get("assets/JSON/searchNews.json");
    return this.httpClient.get(this.url+search+'&apiKey='+this.API_KEY);
  }

}
