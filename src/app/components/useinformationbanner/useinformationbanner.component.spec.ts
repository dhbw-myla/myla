import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseinformationbannerComponent } from './useinformationbanner.component';

describe('UseinformationbannerComponent', () => {
  let component: UseinformationbannerComponent;
  let fixture: ComponentFixture<UseinformationbannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseinformationbannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseinformationbannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
