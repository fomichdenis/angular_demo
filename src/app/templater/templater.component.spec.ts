import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplaterComponent } from './templater.component';

describe('TemplaterComponent', () => {
  let component: TemplaterComponent;
  let fixture: ComponentFixture<TemplaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
