import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLivreComponent } from './list-livre.component';

describe('ListLivreComponent', () => {
  let component: ListLivreComponent;
  let fixture: ComponentFixture<ListLivreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLivreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLivreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
