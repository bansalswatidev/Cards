import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Card } from 'src/app/models/card';
import { LocalStorageService } from 'src/app/services/common/local-storage.service';

@Component({
  selector: 'app-card-display',
  templateUrl: './card-display.component.html',
  styleUrls: ['./card-display.component.scss']
})
export class CardDisplayComponent implements OnInit {
  @Input() cards : Card[] | null;
  @Output() cardsChange = new EventEmitter<Card[]>();
  @Output() cardUpdate = new EventEmitter<number>();
  constructor(private localStorageService: LocalStorageService, private modalService: NgbModal) { 
    this.cards = [];
  }

  ngOnInit(): void {
  }

  deleteCard(index: number) {
    this.cards?.splice(index, 1);
    this.cardsChange.emit(this.cards || []);
    this.localStorageService.setData(this.cards);
    this.modalService.dismissAll('Yes click');
  }

  open(content: any) {
    this.modalService.open(content);
  }

  updateCard(index: number) {
    this.cardUpdate.emit(index);
    
  }

}
