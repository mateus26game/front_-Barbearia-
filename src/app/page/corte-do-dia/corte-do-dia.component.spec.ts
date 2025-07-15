import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorteDoDiaComponent } from './corte-do-dia.component';

describe('CorteDoDiaComponent', () => {
  let component: CorteDoDiaComponent;
  let fixture: ComponentFixture<CorteDoDiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CorteDoDiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorteDoDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
