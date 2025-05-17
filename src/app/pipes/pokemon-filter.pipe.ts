import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonFilter',
  standalone: true,
})
export class PokemonFilterPipe implements PipeTransform {
  transform(pokemons: any[], searchTerm: string): any[] {
    if (!pokemons || !searchTerm) {
      return pokemons;
    }

    const term = searchTerm.toLowerCase();
    return pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(term)
    );
  }
}
