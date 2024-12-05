import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabanamnesicoComponent } from './tabanamnesico.component';

describe('TabanamnesicoComponent', () => {
  let component: TabanamnesicoComponent;
  let fixture: ComponentFixture<TabanamnesicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabanamnesicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabanamnesicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
