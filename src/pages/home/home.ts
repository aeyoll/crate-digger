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
  userToken: string;
  results: Array<Object>;

  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    private http: Http
  ) {
    this.query = 'Kamasi Washington The Epic';
    this.userToken = 'BDmpECbCiWhJZVbzwfbIbSYySlKWUOEPDEoGPwsW';
    this.results = [];
  }

  public search(): void {
    const url = `https://api.discogs.com/database/search?q=${this.query}&type=release&format=LP&token=${this.userToken}`;

    this.http
      .get(url)
      .toPromise()
      .then(response => {
        this.results = response.json().results;
      })
      .catch(this.handleError);
  }

  public suggestion(release): void {
    const releaseId = release.id;
    const url = `https://api.discogs.com/marketplace/price_suggestions/${releaseId}?token=${this.userToken}`;

    this.http
      .get(url)
      .toPromise()
      .then(response => {
        const suggestions = response.json();
        const suggestionModal = this.modalCtrl.create(SuggestionPage, {
          release: release,
          suggestions: Object.keys(suggestions).map(k => {
            return {
              key: k,
              value: suggestions[k]
            };
          })
        });
        suggestionModal.present();
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
