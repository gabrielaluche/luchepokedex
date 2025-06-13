import { PokemonCardResponse } from 'src/app/shared/model/PokemonCardResponse.model';
import { PokemonInfoResponse } from 'src/app/shared/model/PokemonInfoResponse.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Pokemon } from '../shared/model/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokedexService {
  private apiUrlTodos = 'https://pokeapi.co/api/v2/pokemon?limit=1025';
  private apiUrlPokemon = 'https://pokeapi.co/api/v2/pokemon/';
  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  // Método que busca a lista de todos os Pokémons (exceto os especiais) contendo as informações nome e URL da imagem
  getListaPokemon(): Observable<PokemonCardResponse[]> {
    return this.http
      .get<any>(this.apiUrlTodos)
      .pipe(map((response) => response.results as PokemonCardResponse[]));
  }
  // Método que busca as informações detalhadas de um Pokémon específico a partir do seu nome
  getPokemonById(nome: string): Observable<PokemonInfoResponse> {
    return this.http.get<PokemonInfoResponse>(this.apiUrlPokemon + nome);
  }

  getSpecies(pokemon: Pokemon) {
    return this.http.get<any>(
      `${this.baseUrl}/pokemon-species/${pokemon.name}`
    );
  }

  getEvolution(pokemon: Pokemon) {
    return this.http.get<any>(
      `${this.baseUrl}/evolution-chain/${pokemon.name}`
    );
  }

  saveText(text: String) {
    console.log('Service save text : ' + text);
  }

  saveTitle(title: String) {
    console.log('Service save title : ' + title);
  }
  
}


