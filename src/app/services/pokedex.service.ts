import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../pokemon.model';
@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  constructor(private HttpClient: HttpClient) {}

  // Metodo para retornar todos os pokemons da API
  listarPokemons() {
    return this.HttpClient.get<any>('https://pokeapi.co/api/v2/pokemon');
  }

  // Metodo para retornar um pokemon específico da API
  listarPokemon(pokemon: any) {
    return this.HttpClient.get<any>(pokemon.url);
  }

  getPokemon(offset: number = 0, limit: number = 10): Observable<Pokemon[]> {
    return this.HttpClient.get<any>(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    ) as Observable<Pokemon[]>;
  }
}
