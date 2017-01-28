import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'page-suggestion',
  templateUrl: 'suggestion.html'
})
export class SuggestionPage {
  release: Object;
  suggestions: Object;

  constructor(params: NavParams) {
    this.release = params.get('release');
    this.suggestions = params.get('suggestions');
  }
}
