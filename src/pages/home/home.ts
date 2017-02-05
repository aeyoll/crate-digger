import { Component } from '@angular/core';
import { Http } from '@angular/http';
import accounting from 'accounting-js';
import 'rxjs/add/operator/toPromise';

import { Loading, LoadingController, ModalController, NavController } from 'ionic-angular';
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
  loading: Loading;

  constructor(
    public loadingCtrl: LoadingController,
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
    const loading = this.createLoader();
    loading.present();

    this.http
      .get(url)
      .toPromise()
      .then(response => {
        this.results = response.json().results;
        loading.dismiss();
      })
      .catch(this.handleError);
  }

  public suggestion(release): void {
    const releaseId = release.id;
    const url = `https://api.discogs.com/marketplace/price_suggestions/${releaseId}?token=${this.userToken}`;
    const loading = this.createLoader();
    loading.present();

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
              value: accounting.formatMoney(parseFloat(suggestions[k].value), { symbol: suggestions[k].currency, format: "%v %s" }, 2, '.', ',')
            };
          })
        });
        suggestionModal.present();
        loading.dismiss();
      })
      .catch(this.handleError);
  }

  private createLoader(): Loading {
    return this.loadingCtrl.create({
      content: 'Please wait...'
    });
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
