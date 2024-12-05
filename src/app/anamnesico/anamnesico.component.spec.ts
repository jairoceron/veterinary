import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnamnesicoComponent } from './anamnesico.component';

describe('AnamnesicoComponent', () => {
  let component: AnamnesicoComponent;
  let fixture: ComponentFixture<AnamnesicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnamnesicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnamnesicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
