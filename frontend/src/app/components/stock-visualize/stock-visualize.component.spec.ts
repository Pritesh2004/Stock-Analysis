import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockVisualizeComponent } from './stock-visualize.component';

describe('StockVisualizeComponent', () => {
  let component: StockVisualizeComponent;
  let fixture: ComponentFixture<StockVisualizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockVisualizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockVisualizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
