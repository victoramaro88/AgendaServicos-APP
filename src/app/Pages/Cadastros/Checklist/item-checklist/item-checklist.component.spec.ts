import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemChecklistComponent } from './item-checklist.component';

describe('ItemChecklistComponent', () => {
  let component: ItemChecklistComponent;
  let fixture: ComponentFixture<ItemChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemChecklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
