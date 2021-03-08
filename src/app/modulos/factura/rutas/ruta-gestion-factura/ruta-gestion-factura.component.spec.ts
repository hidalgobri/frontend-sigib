import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaGestionFacturaComponent } from './ruta-gestion-factura.component';

describe('RutaGestionFacturaComponent', () => {
  let component: RutaGestionFacturaComponent;
  let fixture: ComponentFixture<RutaGestionFacturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutaGestionFacturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaGestionFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
