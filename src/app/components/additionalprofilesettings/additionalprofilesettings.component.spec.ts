import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalprofilesettingsComponent } from './additionalprofilesettings.component';

describe('AdditionalprofilesettingsComponent', () => {
  let component: AdditionalprofilesettingsComponent;
  let fixture: ComponentFixture<AdditionalprofilesettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalprofilesettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalprofilesettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
