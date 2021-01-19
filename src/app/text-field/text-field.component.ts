import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.css']
})
export class TextFieldComponent implements OnInit {

  _value: string = '';
  @Input()
  set value(val: string) {
    this.valueChange.emit(val);
    this._value = val;
  }
  get correct() {
    return this._value;
  }
  @Input()
  disabled: boolean;
  @Input()
  type: string = 'text';
  @Input()
  label;

  @Output()
  valueChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

}
