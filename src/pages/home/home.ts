import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  key: string;
  secret: string;
  query: string;
  results: Array<Object>;

  constructor(
    public navCtrl: NavController,
    private http: Http
  ) {
    this.key = 'SRtFMOmBIISBTocJEpqh';
    this.secret = 'pleALhMufWjNEgfQFgtHeJOrHgfmzmIt';
    this.query = 'Kamasi Washington The Epic';
    this.results = [];
  }

  public search(): void {
    const url = `https://api.discogs.com/database/search?q=${this.query}&type=release&format=LP&key=${this.key}&secret=${this.secret}`;

    this.http
      .get(url)
      .toPromise()
      .then(response => {
        this.results = response.json().results;
      })
      .catch(this.handleError);
  }

  public suggestion(release_id: number): void {
    const url = `https://api.discogs.com/database/marketplace/price_suggestions/${release_id}&key=${this.key}&secret=${this.secret}`;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
