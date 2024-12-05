import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenclinicoComponent } from './examenclinico.component';

describe('ExamenclinicoComponent', () => {
  let component: ExamenclinicoComponent;
  let fixture: ComponentFixture<ExamenclinicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExamenclinicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamenclinicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
