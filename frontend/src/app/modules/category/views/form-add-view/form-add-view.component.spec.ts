import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddViewComponent } from './form-add-view.component';

describe('FormAddViewComponent', () => {
  let component: FormAddViewComponent;
  let fixture: ComponentFixture<FormAddViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAddViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAddViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
