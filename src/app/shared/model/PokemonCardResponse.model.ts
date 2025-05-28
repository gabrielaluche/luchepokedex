import { PokemonInfoResponse } from "./PokemonInfoResponse.model";

/*
Interface que representa o contrato com a API
Representa a estrutura dos dados retornados pela API de Pokémon
*/
export interface PokemonCardResponse {
  name: string;
  url: string;
  pokemoninfo: PokemonInfoResponse
}
