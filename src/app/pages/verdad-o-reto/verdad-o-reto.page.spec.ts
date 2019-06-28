import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerdadORetoPage } from './verdad-o-reto.page';

describe('VerdadORetoPage', () => {
  let component: VerdadORetoPage;
  let fixture: ComponentFixture<VerdadORetoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerdadORetoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerdadORetoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
