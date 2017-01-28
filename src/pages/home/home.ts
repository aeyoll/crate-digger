import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

import { SuggestionPage } from '../suggestion/suggestion';

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
    public modalCtrl: ModalController,
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

  public suggestion(releaseId: number): void {
    const url = `https://api.discogs.com/marketplace/price_suggestions/${releaseId}`;

    this.http
      .get(url)
      .toPromise()
      .then(response => {
        this.suggestion = response.json().results;
        let suggestionModal = this.modalCtrl.create(SuggestionPage, { suggestion: this.suggestion });
        suggestionModal.present();
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
