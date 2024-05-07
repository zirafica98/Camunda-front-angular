import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomListBoxComponent } from './custom-list-box.component';

describe('CustomListBoxComponent', () => {
  let component: CustomListBoxComponent;
  let fixture: ComponentFixture<CustomListBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomListBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomListBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
