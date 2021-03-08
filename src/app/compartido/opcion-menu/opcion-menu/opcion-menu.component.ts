import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-opcion-menu',
  templateUrl: './opcion-menu.component.html',
  styleUrls: ['./opcion-menu.component.scss']
})
export class OpcionMenuComponent implements OnInit {

  @Input() textoBoton: string;
  @Input() descripcionOpcion: string;
  @Input() pathImagen: string;

  constructor() {
  }

  ngOnInit() {
  }

}
