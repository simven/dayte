import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentDayteComponent } from '@src/app/current-dayte/current-dayte.component';

describe('CurrentDayteComponent', () => {
  let component: CurrentDayteComponent;
  let fixture: ComponentFixture<CurrentDayteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentDayteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentDayteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
