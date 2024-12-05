import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogconfComponent } from './dialogconf.component';

describe('DialogconfComponent', () => {
  let component: DialogconfComponent;
  let fixture: ComponentFixture<DialogconfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogconfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogconfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
