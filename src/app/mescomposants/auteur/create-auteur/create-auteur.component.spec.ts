import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAuteurComponent } from './create-auteur.component';

describe('CreateAuteurComponent', () => {
  let component: CreateAuteurComponent;
  let fixture: ComponentFixture<CreateAuteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAuteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAuteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
