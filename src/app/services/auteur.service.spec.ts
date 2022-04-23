import { TestBed } from '@angular/core/testing';

import { AuteurService } from './auteur.service';

describe('AuteurService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuteurService = TestBed.get(AuteurService);
    expect(service).toBeTruthy();
  });
});
