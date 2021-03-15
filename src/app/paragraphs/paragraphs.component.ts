import {Component, Input, OnInit} from '@angular/core';
import {CdkDragMove, DragDropModule} from '@angular/cdk/drag-drop';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Paragraph} from '../paragraph';

@Component({
  selector: 'app-paragraphs',
  templateUrl: './paragraphs.component.html',
  styleUrls: ['./paragraphs.component.css']
})
export class ParagraphsComponent implements OnInit {

  @Input() proposedHeadings: Paragraph[][];
  @Input() unmatchedHeadings: Paragraph[];
  imports: [
    DragDropModule,
    CdkDragDrop<string>,
    CdkDragMove
  ];
  //proposedHeadings: Paragraph[][];
  //unmatchedHeadings: Paragraph[];
  selectedHeadings: Paragraph;
  ngOnInit(): void{
    // this.proposedHeadings = [[{ headingName: 'History', finalName: 'History', subheadingNames: [{headingName: '1688', fileName: '1'}], fileName: 'test1.doc'},
    //   { headingName: 'General', finalName: 'General', subheadingNames: [{headingName: '1688', fileName: '1'}], fileName: 'test2.doc'}], [{ headingName: 'Test', finalName: 'Test', subheadingNames: [{headingName: '1688', fileName: '1'}], fileName: 'test3.doc'}]];
    // this.unmatchedHeadings = [{ headingName: 'Tester', finalName: 'History', subheadingNames: [{headingName: '1688', fileName: '1'}], fileName: 'test1.doc'}];
  }

  addParagraph() {
    this.proposedHeadings.push([]);
  }

  onSelect(paragraph: Paragraph): void{
    this.selectedHeadings = paragraph;
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


  dropParagraph(event: CdkDragDrop<Paragraph[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else if (event.container.data.find(x =>
      x.headingName != event.previousContainer.data[event.previousIndex].headingName
      && x.fileName == event.previousContainer.data[event.previousIndex].fileName) == undefined) {
        if (event.currentIndex > 0) {
          event.previousContainer.data[event.previousIndex].finalName = event.container.data[event.currentIndex - 1].finalName;
        } else if (event.container.data.length > 1) {
          event.previousContainer.data[event.previousIndex].finalName = event.container.data[event.currentIndex + 1].finalName;
        }
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
      }
  }


}
