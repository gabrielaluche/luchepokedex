import { PokemonCardResponse } from 'src/app/shared/model/PokemonCardResponse.model';
import { PokemonInfoResponse } from 'src/app/shared/model/PokemonInfoResponse.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PokedexService {
  private apiUrlTodos = 'https://pokeapi.co/api/v2/pokemon?limit=1025';
  private apiUrlPokemon = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient) {}

  // Método que busca a lista de todos os Pokémons (exceto os especiais) contendo as informações nome e URL da imagem
  getListaPokemon(): Observable<PokemonCardResponse[]> {
    return this.http.get<any>(this.apiUrlTodos).pipe(
      map(response => response.results as PokemonCardResponse[]),
    );
  }
  // Método que busca as informações detalhadas de um Pokémon específico a partir do seu nome
  getPokemonById(nome: string): Observable<PokemonInfoResponse> {
    return this.http.get<PokemonInfoResponse>(
      this.apiUrlPokemon + nome
    );
  }

}
