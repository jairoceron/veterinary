import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabdueComponent } from './tabdue.component';

describe('TabdueComponent', () => {
  let component: TabdueComponent;
  let fixture: ComponentFixture<TabdueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabdueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabdueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
