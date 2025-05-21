import { Component, OnInit, Input } from '@angular/core';
import { PokedexService } from 'src/app/services/pokedex.service';
import { SearchHeaderComponent } from '../search-header/search-header.component';
import { PokeapiMapper } from 'src/app/shared/mapper/pokeapi-mapper';
import { Pokemon } from 'src/app/shared/model/pokemon';

@Component({
  selector: 'app-lista-pokemon',
  templateUrl: './lista-pokemon.component.html',
  styleUrls: ['./lista-pokemon.component.scss'],
})
export class ListaPokemonComponent implements OnInit {
  listaPokemon: any[] = [];
  filtro = '';
  listaGeral: any[] = [];
  idPokemon: any[] = [];
  listaMap : Pokemon[] = [];
  constructor(
      private pokedexService: PokedexService,
      private mapper:PokeapiMapper) {}

  filtraPokemon(event: any): void {
    this.listaPokemon = this.listaGeral.filter((item) =>
      item.name.includes(event as string)
    );
  }

  ngOnInit(): void {
    this.pokedexService.getListaPokemon().subscribe((response) => {
      this.listaPokemon = response.results;
      this.listaGeral = this.listaPokemon;
      this.listaMap = this.mapper.mapFromDTO(this.listaPokemon);
      console.log(this.listaMap[25]);
    });
  }
}
