import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pokemon } from 'src/app/shared/model/pokemon';

@Component({
  selector: 'app-detalhe-pokemon',
  templateUrl: './detalhe-pokemon.component.html',
  styleUrls: ['./detalhe-pokemon.component.scss'],
})
export class DetalhePokemonComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public pokemon: Pokemon) {}

  get tiposTexto(): string {
    return (
      this.pokemon?.info?.types?.map((t) => t.type.name).join(' / ') ??
      'Sem tipos'
    );
  }
}
