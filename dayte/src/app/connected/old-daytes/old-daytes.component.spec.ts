import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OldDaytesComponent } from '@src/app/old-daytes/old-daytes.component';

describe('OldDaytesComponent', () => {
  let component: OldDaytesComponent;
  let fixture: ComponentFixture<OldDaytesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OldDaytesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OldDaytesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
