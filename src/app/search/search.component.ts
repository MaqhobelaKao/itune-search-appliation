import { Component } from '@angular/core';
import { SearchService } from '../search.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  loading: boolean = false;
  constructor(
    public itunes: SearchService, 
    private route: ActivatedRoute,
    private router: Router
    ){
      this.route.params.subscribe(params => {
        this.doSearch(params['term']);
        console.log(params['term']);
      });
  }

  doSearch(value: string){
    this.loading = true;
    this.itunes.search(value).then(_=> this.loading=false);
  }

  onSearch(term: string ){
    this.router.navigate(['search', term]);
  }
}
