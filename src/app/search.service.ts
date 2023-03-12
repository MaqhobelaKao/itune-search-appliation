import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { SearchItem } from './model/SearchItem'
import 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  apiRoot: string = 'https:itunes.apple.com/search';
  results: SearchItem[];
  loading: boolean;

  constructor(private http: Http) { 
    this.results = [];
    this.loading = false;
  }

  /**
   * The function do get api call using promiseses
   * @param term term to search from itune api
   */
  search(term: string){
     let prmise = new Promise<void>((resolve, reject)=>{
       let apiURL = `${this.apiRoot}?term=${term}&media=music&limit=20`;
       return this.http.get(apiURL)
       .toPromise()
       .then(
          res=> {
            this.results = res?.json().results.map((item:any)=>{
              return new SearchItem(
                item.trackName,
                item.artistName,
                item.trackViewUrl,
                item.artworkUrl30,
                item.artistId
              );
            }),
            resolve()
          },
          msg =>{
            reject()
          }
        );
     });

     return prmise;
  }
}
