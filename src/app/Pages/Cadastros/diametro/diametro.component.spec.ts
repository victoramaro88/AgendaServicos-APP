import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiametroComponent } from './diametro.component';

describe('DiametroComponent', () => {
  let component: DiametroComponent;
  let fixture: ComponentFixture<DiametroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiametroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiametroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
