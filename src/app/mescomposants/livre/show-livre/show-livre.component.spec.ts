import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowLivreComponent } from './show-livre.component';

describe('ShowLivreComponent', () => {
  let component: ShowLivreComponent;
  let fixture: ComponentFixture<ShowLivreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowLivreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowLivreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
