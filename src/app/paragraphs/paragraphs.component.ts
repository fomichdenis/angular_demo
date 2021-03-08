import { Component, OnInit } from '@angular/core';
import {CdkDragMove, DragDropModule} from '@angular/cdk/drag-drop';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Paragraph} from '../paragraph';

@Component({
  selector: 'app-paragraphs',
  templateUrl: './paragraphs.component.html',
  styleUrls: ['./paragraphs.component.css']
})
export class ParagraphsComponent implements OnInit {
  imports: [
    DragDropModule,
    CdkDragDrop<string>,
    CdkDragMove
  ];
  proposedParagraphs: Paragraph[][];
  unmatchedParagraphs: Paragraph[];

  ngOnInit(): void{
    this.proposedParagraphs = [[{ headingName: 'History', finalName: 'History', subheadingNames: ['Whales'], fileName: 'test1.doc'},
      { headingName: 'General', finalName: 'General', subheadingNames: ['1688'], fileName: 'test2.doc'}], [{ headingName: 'Test', finalName: 'Test', subheadingNames: ['Test'], fileName: 'test3.doc'}]];
    this.unmatchedParagraphs = [{ headingName: 'Tester', finalName: 'History', subheadingNames: ['Whales'], fileName: 'test1.doc'}];
  }

  addParagraphs1() {
  }

  // drop(event: CdkDragDrop<string[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     transferArrayItem(event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex);
  //   }
  // }
  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
