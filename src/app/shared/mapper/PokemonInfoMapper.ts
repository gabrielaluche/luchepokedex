import { map } from 'rxjs/operators';
import { Pokemon } from '../model/pokemon'; // Importa o modelo Pokemon que representa a estrutura dos dados do Pokémon (nome, id, imagem)
import { PokemonInfoResponse } from 'src/app/shared/model/PokemonInfoResponse.model'; // Importa a interface PokemonInfoResponse que define a estrutura de resposta da API
import { Injectable } from '@angular/core'; // Importa o decorador Injectable do Angular para permitir a injeção de dependências
import { PokemonInfo } from '../model/PokemonInfo.model';

@Injectable({
  providedIn: 'root',
})

// Classe responsável por mapear as informações detalhadas do Pokémon
export class PokemonInfoMapper {

  public mapFromDTO(data: PokemonInfoResponse): PokemonInfo {
    // Mapeia os dados recebidos da API para o modelo PokemonInfo
    return {
      id: data.id, // ID do Pokémon
      name: data.name, // Nome do Pokémon
      height: data.height, // Altura do Pokémon em decímetros
      weight: data.weight, // Peso do Pokémon em hectogramas
      abilities: data.abilities.map(ability => ({
        ability: ability.ability,
        is_hidden: ability.is_hidden,
        slot: ability.slot
      })), // Mapeia as habilidades do Pokémon
      stats: data.stats.map(stat => ({
        base_stat: stat.base_stat,
        effort: stat.effort,
        stat: stat.stat
      })), // Mapeia os stats do Pokémon
      types: data.types.map(type => ({
        slot: type.slot,
        type: type.type
      })) // Mapeia os tipos do Pokémon
    };
  }



}
