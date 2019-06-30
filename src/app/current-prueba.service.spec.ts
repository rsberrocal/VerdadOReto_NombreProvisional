import { TestBed } from '@angular/core/testing';

import { CurrentPruebaService } from './core/services/current-prueba.service';

describe('CurrentPruebaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrentPruebaService = TestBed.get(CurrentPruebaService);
    expect(service).toBeTruthy();
  });
});
