import { Component, SimpleChanges } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Card } from './models/card';
import { LocalStorageService } from './services/common/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  cards : Card[] | null;
  cardText: string;
  selectedIndex: number;
  constructor(private modalService: NgbModal, private localStorageService: LocalStorageService) {
    this.cards = [];
    this.cardText = "";
    this.selectedIndex = -1;
    if(this.cards !== undefined && this.cards?.length) {
      localStorageService._localStorage.setItem("cards", JSON.stringify(this.cards || []));
    }
    this.getCards();
    this.localStorageService._data.subscribe((res) => {
      this.cards = res;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("here are" + changes);
  }

  getCards() {
    this.localStorageService.getData();
  }

  saveData() {
    this.modalService.dismissAll('Save click');
    if(this.selectedIndex > -1) {
      this.cards[this.selectedIndex].description = this.cardText;
    } else {
      let card: Card = {
        description : this.cardText
      };
      this.cards?.push(card);
    }
    this.localStorageService.setData(this.cards);
    this.resetCard();
  }

  resetCard() {
    this.selectedIndex = -1;
    this.cardText = "";
  }

  open(content: any) {
    this.modalService.open(content);
    this.cardText = this.cardText.length > 0 ? this.cardText : "";
  }

  updateCard(index: any) {
    this.cardText = this.cards[index].description;
    this.selectedIndex = index;
  }
}
