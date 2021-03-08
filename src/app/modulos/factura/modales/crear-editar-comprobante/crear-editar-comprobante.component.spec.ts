import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEditarComprobanteComponent } from './crear-editar-comprobante.component';

describe('CrearEditarComprobanteComponent', () => {
  let component: CrearEditarComprobanteComponent;
  let fixture: ComponentFixture<CrearEditarComprobanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearEditarComprobanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearEditarComprobanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
