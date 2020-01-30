import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartingpageComponent } from './Startingpage.component';

describe('StartingpageComponent', () => {
  let component: StartingpageComponent;
  let fixture: ComponentFixture<StartingpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartingpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartingpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
