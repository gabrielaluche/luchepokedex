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

  // Método que retorna APENAS a string do gradiente
  getPokemonBackgroundGradient(pokemon: any): string {
    if (
      !pokemon ||
      !pokemon.info ||
      !pokemon.info.types ||
      pokemon.info.types.length === 0
    ) {
      return '#A8A878'; // Retorna uma cor sólida de fallback
    }

    const types = pokemon.info.types.map((t: any) => t.type.name);
    const color1 = this.esquemaCores[types[0]] || '#A8A878';

    if (types.length > 1) {
      const color2 = this.esquemaCores[types[1]] || '#A8A878';
      return `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
    }

    return color1; // Retorna uma cor sólida se tiver apenas um tipo
  }

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
  // Metodo para buscar os dados da ESPÉCIE (gênero, textos, link da evolução)
  getPokemonSpecies(id: string | number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/pokemon-species/${id}`);
  }
  // Metodo para buscar os dados da cadeia de evolução
  getEvolutionChain(url: string): Observable<any> {
    return this.http.get(url);
  }
  // Método que busca os detalhes de um tipo específico
  // Exemplo: getTypeDetails('fire') retorna os detalhes do tipo Fogo
  public getTypeDetails(typeName: string): Observable<any> {
    const url = `${this.baseUrl}/type/${typeName}`;
    return this.http.get<any>(url);
  }

  // Método que retorna o esquema de cores dos cards, baseado nos tipos dos Pokémons
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

  //Metodo que define o estilo de cores dos cards
  getStyleColors(pokemon: any): { [key: string]: any } {
    if (
      !pokemon ||
      !pokemon.info ||
      !pokemon.info.types ||
      pokemon.info.types.length === 0
    ) {
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

  // Este método centraliza a lógica de construção da URL da imagem do pokemon
  public getPokemonImageUrl(id: number | string): string {
    // A URL base da imagem que queremos
    const baseUrl =
      'https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/other/dream-world/';

    // Retorna a URL completa
    return `${baseUrl}${id}.svg`;
  }

  // Este método centraliza a lógica de construção da URL da imagem dos tipos do pokemon
  public getTypeIcon(typeName: string): string {
    if (!typeName) {
      // Retorna um ícone padrão ou string vazia se o tipo for inválido
      return 'assets/imagens/icones/normal.svg';
    }
    const baseUrl = 'assets/imagens/icones/';
    return `${baseUrl}${typeName.toLowerCase()}.svg`;
  }
}

