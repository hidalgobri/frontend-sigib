import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEditarClienteComponent } from './crear-editar-cliente.component';

describe('CrearEditarClienteComponent', () => {
  let component: CrearEditarClienteComponent;
  let fixture: ComponentFixture<CrearEditarClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearEditarClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearEditarClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
