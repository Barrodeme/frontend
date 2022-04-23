import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAuteurComponent } from './list-auteur.component';

describe('ListAuteurComponent', () => {
  let component: ListAuteurComponent;
  let fixture: ComponentFixture<ListAuteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAuteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAuteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
