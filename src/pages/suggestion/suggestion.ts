import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'page-suggestion',
  templateUrl: 'suggestion.html'
})
export class SuggestionPage {
  constructor(params: NavParams) {
    console.log('suggestion', params.get('suggestion'));
  }
}
