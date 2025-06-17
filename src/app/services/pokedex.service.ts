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

  private esquemaCores: { [key: string]: string } = {
    grass: '#78C850',
    fire: '#F08030',
    water: '#6890F0',
    bug: '#A8B820',
    normal: '#A8A878',
    poison: '#A040A0',
    electric: '#F8D030',
    ground: '#E0C068',
    fairy: '#EE99AC',
    fighting: '#C03028',
    psychic: '#F85888',
    rock: '#B8A038',
    ghost: '#705898',
    ice: '#98D8D8',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    flying: '#A890F0',
  };

  // 2. Crie o método público que gera o estilo das cartas
  getStyleColors(pokemon: any): { [key: string]: any } {

    if (
      !pokemon || !pokemon.info || !pokemon.info.types || pokemon.info.types.length === 0 ) {
      return { background: '#A8A878' };
    }

    const types = pokemon.info.types.map((t: any) => t.type.name);
    const color1 = this.esquemaCores[types[0]] || '#A8A878';

    // Se o Pokémon tiver mais de um tipo, combina duas cores que correspondam
    // ao tipo para formar um backgroud estilo gradiente
    if (types.length > 1) {
      const color2 = this.esquemaCores[types[1]] || '#A8A878';
      return {
        background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`,
        'background-blend-mode': 'luminosity', // Efeito extra opcional
        'background-color': color1, // Fallback para navegadores antigos
      };
    }

    // Se tiver apenas um tipo, usa uma cor sólida
    return {
      background: color1,
    };
  }
}
