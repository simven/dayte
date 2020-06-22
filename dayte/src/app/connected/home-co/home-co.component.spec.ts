import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCoComponent } from '@src/app/home-co/home-co.component';

describe('HomeCoComponent', () => {
  let component: HomeCoComponent;
  let fixture: ComponentFixture<HomeCoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeCoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
