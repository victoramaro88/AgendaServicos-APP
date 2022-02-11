import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosCanceladosComponent } from './eventos-cancelados.component';

describe('EventosCanceladosComponent', () => {
  let component: EventosCanceladosComponent;
  let fixture: ComponentFixture<EventosCanceladosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventosCanceladosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosCanceladosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
