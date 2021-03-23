import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCombineComponent } from './header-combine.component';

describe('HeaderCombineComponent', () => {
  let component: HeaderCombineComponent;
  let fixture: ComponentFixture<HeaderCombineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderCombineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderCombineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
