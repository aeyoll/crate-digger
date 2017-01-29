import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-suggestion',
  templateUrl: 'suggestion.html'
})
export class SuggestionPage {
  release: Object;
  suggestions: Object;

  constructor(
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
    this.release = params.get('release');
    this.suggestions = params.get('suggestions');
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
