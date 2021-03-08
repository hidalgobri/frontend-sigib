import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaGestionClienteComponent } from './ruta-gestion-cliente.component';

describe('RutaGestionClienteComponent', () => {
  let component: RutaGestionClienteComponent;
  let fixture: ComponentFixture<RutaGestionClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutaGestionClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaGestionClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
