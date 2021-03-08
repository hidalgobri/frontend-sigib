import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-select-general',
  templateUrl: './select-general.component.html',
  styleUrls: ['./select-general.component.scss']
})
export class SelectGeneralComponent implements OnInit {

  @Input() registros: any[] = [];
  @Input() opcionEtiqueta: string;
  @Input() placeholder: string;
  @Output() opcionSeleccionada: EventEmitter<number> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  enviarOpcionSeleccionada(evento: any) {
    this.opcionSeleccionada.emit(evento.value);
  }
}
