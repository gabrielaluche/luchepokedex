import { Pokemon } from "../model/pokemon"; // Importa o modelo Pokemon que representa a estrutura dos dados do Pokémon (nome, id, imagem)
import { PokemonCardResponse } from 'src/app/shared/model/PokemonCardResponse.model'; // Importa a interface PokemonCardResponse que define a estrutura de resposta da API
import { Injectable } from "@angular/core"; // Importa o decorador Injectable do Angular para permitir a injeção de dependências
import { PokemonInfoMapper } from "./PokemonInfoMapper"; // Importa a classe PokemonInfoMapper que mapeia as informações detalhadas do Pokémon

@Injectable({
  providedIn: 'root',
})

// Classe responsável por mapear o nome e URL da imagem do pokemon
// Esta classe transforma os dados brutos da API em objetos do tipo Pokemon
export class PokemonCardMapper {
  urlImagem: string =
    'https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/other/dream-world/'; // URL base para as imagens dos Pokémons

  constructor(private mapper: PokemonInfoMapper) {}

  // Método que recebe os dados da API e mapeia para uma lista de objetos
  public mapFromDTO(data: PokemonCardResponse[]): Pokemon[] {
    // Cria uma lista vazia de Pokémons
    // Esta lista será preenchida com os objetos do modelo Pokemon
    var listaPokemon: Pokemon[] = [];
    // Percorre os dados retornados pela API
    for (let i = 0; i < data.length; i++) {
      listaPokemon.push(
        new Pokemon(
          data[i].name, // Nome do Pokémon
          `${i + 1}`, // ID do Pokémon (usado como string)
          this.urlImagem + i + '.svg', // URL da imagem do Pokémon (concatenando a URL base com o ID do Pokémon)
          //this.mapper.mapFromDTO(data[i].pokemoninfo) // Mapeia as informações detalhadas do Pokémon usando a classe PokemonInfoMapper
        )
      );
    }
    // Retorna a lista preenchida com os objetos do modelo Pokemon
    return listaPokemon;
  }
}


