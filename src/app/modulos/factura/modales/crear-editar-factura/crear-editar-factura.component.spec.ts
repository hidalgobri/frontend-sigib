import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEditarFacturaComponent } from './crear-editar-factura.component';

describe('CrearEditarFacturaComponent', () => {
  let component: CrearEditarFacturaComponent;
  let fixture: ComponentFixture<CrearEditarFacturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearEditarFacturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearEditarFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
