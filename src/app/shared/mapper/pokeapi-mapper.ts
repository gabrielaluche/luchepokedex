import { Pokemon } from "../model/pokemon"; // Importa o modelo Pokemon que representa a estrutura dos dados do Pokémon (nome, id, imagem)
import { PokeapiResponse } from "src/app/pokeapi-response.model"; // Importa a interface PokeapiResponse que define a estrutura de resposta da API
import { Injectable } from "@angular/core"; // Importa o decorador Injectable do Angular para permitir a injeção de dependências

@Injectable({
  providedIn: 'root',
})

// Classe responsável por mapear os dados retornados pela API para o modelo utilizado na aplicação
// Esta classe transforma os dados brutos da API em objetos do tipo Pokemon
export class PokeapiMapper {
    urlImagem:
    string = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/'; // URL base para as imagens dos Pokémons

    // Método que recebe os dados da API e retorna uma lista de objetos do tipo Pokemon
    // O método mapFromDTO transforma os dados da API (PokeapiResponse) em objetos do modelo Pokemon
    public mapFromDTO(data: PokeapiResponse[]): Pokemon[] {

      // Cria uma lista vazia de Pokémons
      // Esta lista será preenchida com os objetos do modelo Pokemon
      var listaPokemon : Pokemon[] = []
      // Percorre os dados retornados pela API
      for(let i=0; i < data.length; i++){
        listaPokemon.push(
          new Pokemon(
              data[i].name,                 // Nome do Pokémon
              `${i+1}`,                     // ID do Pokémon (usado como string)
              this.urlImagem + i + '.png'   // URL da imagem do Pokémon (concatenando a URL base com o ID do Pokémon)
          )
        )
      }
      // Retorna a lista preenchida com os objetos do modelo Pokemon
      return listaPokemon
    }
}


