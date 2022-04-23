import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAuteurComponent } from './show-auteur.component';

describe('ShowAuteurComponent', () => {
  let component: ShowAuteurComponent;
  let fixture: ComponentFixture<ShowAuteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAuteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAuteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
