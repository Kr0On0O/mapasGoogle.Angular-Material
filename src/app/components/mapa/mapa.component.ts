import { Component, OnInit } from '@angular/core';
import { Marcador } from '../../class/marcador.class';
import {MatSnackBar} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MapaEditarComponent } from './mapa-editar.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  marcadores: Marcador[] = [];
  lat = 51.678418;
  lng = 7.809007;
  constructor(public snackBar: MatSnackBar,
              public dialog: MatDialog ) {
    if ( localStorage.getItem('marcadores') ) {

      this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
    }
  }

  ngOnInit() {
  }

  agregarMarcador(evento) {
    const nuevoMarcador = new Marcador( evento.coords.lat , evento.coords.lng );
    this.marcadores.push(nuevoMarcador);
    this.guardarStorage();
  }


  guardarStorage() {

  localStorage.setItem('marcadores', JSON.stringify(this.marcadores) );
  this.snackBar.open('Marcador añadido', 'Cerrar');
}
  borrarMarcador(i: number) {
    this.marcadores.splice(i, 1);
    this.guardarStorage();
    this.snackBar.open('Marcador Borrado', 'Cerrar');
  }

  editarMarcador( marcador: Marcador ) {
    const dialogRef = this.dialog.open(MapaEditarComponent, {
      width: '250px',
      data: { titulo: marcador.titulo, desc: marcador.desc }
  });
  dialogRef.afterClosed().subscribe(result => {
    if ( !result ) {
      return;
    }
    marcador.titulo = result.titulo;
    marcador.desc = result.desc;
    this.guardarStorage();
    this.snackBar.open('Marcador Actualizado', 'Cerrar');
  });
}

}
