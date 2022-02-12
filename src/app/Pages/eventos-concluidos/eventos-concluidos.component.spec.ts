import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosConcluidosComponent } from './eventos-concluidos.component';

describe('EventosConcluidosComponent', () => {
  let component: EventosConcluidosComponent;
  let fixture: ComponentFixture<EventosConcluidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventosConcluidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosConcluidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
