import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicDataForms2Component } from './basic-data-forms2.component';

describe('BasicDataForms2Component', () => {
  let component: BasicDataForms2Component;
  let fixture: ComponentFixture<BasicDataForms2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasicDataForms2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BasicDataForms2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
