import { Component, OnInit, Input } from '@angular/core';
import { PokedexService } from 'src/app/services/pokedex.service';
import { SearchHeaderComponent } from '../search-header/search-header.component';

@Component({
  selector: 'app-lista-pokemon',
  templateUrl: './lista-pokemon.component.html',
  styleUrls: ['./lista-pokemon.component.scss'],
})
export class ListaPokemonComponent implements OnInit {
  listaPokemon: any[] = [];
  filtro = '';
  listaGeral: any[] = [];
  constructor(private pokedexService: PokedexService) {}

  filtraPokemon(event: any): void {
    this.listaPokemon = this.listaGeral.filter(item => item.name.includes(event as string))
  }

  ngOnInit(): void {
    this.pokedexService
      .getListaPokemon()
      .subscribe((response) => {
        this.listaPokemon = response.results;
        this.listaGeral = this.listaPokemon;
        console.log();
      });
  }
}
