import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaGestionComprobanteComponent } from './ruta-gestion-comprobante.component';

describe('RutaGestionComprobanteComponent', () => {
  let component: RutaGestionComprobanteComponent;
  let fixture: ComponentFixture<RutaGestionComprobanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutaGestionComprobanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaGestionComprobanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
