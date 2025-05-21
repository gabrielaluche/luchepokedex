import { Pokemon } from "../model/pokemon";
import { PokeapiResponse } from "src/app/pokeapi-response.model";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})

export class PokeapiMapper {
  urlImagem: string =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/';

  public mapFromDTO(data: PokeapiResponse[]): Pokemon[] {

    var listaPokemon : Pokemon[] = []

    for(let i=0; i < data.length; i++){
      listaPokemon.push(
        new Pokemon(
          data[i].name,
          `${i}`,
          this.urlImagem + i + '.png'
        )
      )
    }
    return listaPokemon
  }
}


