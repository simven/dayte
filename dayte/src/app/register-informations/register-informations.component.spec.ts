import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterInformationsComponent } from '@src/app/register-informations/register-informations.component';

describe('RegisterInformationsComponent', () => {
  let component: RegisterInformationsComponent;
  let fixture: ComponentFixture<RegisterInformationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterInformationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
