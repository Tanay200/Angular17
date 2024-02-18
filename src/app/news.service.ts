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
    if(search == 'India'){
      return this.httpClient.get("assets/JSON/homeNews.json");
      return this.httpClient.get(this.url+search+'&apiKey='+this.API_KEY);
    }
    else if(search == 'politics'){
      return this.httpClient.get("assets/JSON/politicsNews.json");
      return this.httpClient.get(this.url+search+'&apiKey='+this.API_KEY);
    }

    else if(search == 'world'){
      return this.httpClient.get("assets/JSON/worldNews.json");
      return this.httpClient.get(this.url+search+'&apiKey='+this.API_KEY);
    }

    else if(search == 'sports'){
      return this.httpClient.get("assets/JSON/sportsNews.json");
      return this.httpClient.get(this.url+search+'&apiKey='+this.API_KEY);
    }

    else if(search == 'business'){
      return this.httpClient.get("assets/JSON/businessNews.json");
      return this.httpClient.get(this.url+search+'&apiKey='+this.API_KEY);
    }
    else{
      return this.httpClient.get(this.url+search+'&apiKey='+this.API_KEY);
    }

  }

}
