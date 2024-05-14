import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefilledInputComponent } from './prefilled-input.component';

describe('PrefilledInputComponent', () => {
  let component: PrefilledInputComponent;
  let fixture: ComponentFixture<PrefilledInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrefilledInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrefilledInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
