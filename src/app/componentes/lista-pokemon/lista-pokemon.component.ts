import { Component, OnInit } from '@angular/core';
import { PokedexService } from 'src/app/services/pokedex.service';

@Component({
  selector: 'app-lista-pokemon',
  templateUrl: './lista-pokemon.component.html',
  styleUrls: ['./lista-pokemon.component.scss'],
})
export class ListaPokemonComponent implements OnInit {
  listaPokemon: any[] = [];

  constructor(private pokedexService: PokedexService) {}

  ngOnInit(): void {
    this.pokedexService.getListaPokemon().subscribe((response) => {
      this.listaPokemon = response.results;
    });
  }
}
