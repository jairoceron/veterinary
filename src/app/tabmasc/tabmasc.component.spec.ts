import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabmascComponent } from './tabmasc.component';

describe('TabmascComponent', () => {
  let component: TabmascComponent;
  let fixture: ComponentFixture<TabmascComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabmascComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabmascComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
