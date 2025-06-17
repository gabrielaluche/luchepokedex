import { Component, Input, OnInit } from '@angular/core';
import { PokedexService } from 'src/app/services/pokedex.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detalhe-pokemon',
  templateUrl: './detalhe-pokemon.component.html',
  styleUrls: ['./detalhe-pokemon.component.scss'],
})
export class DetalhePokemonComponent implements OnInit {
  @Input() pokemon: any;

  pokemonSpecies: any;
  evolutionChain: any;

  constructor(
    public pokedexService: PokedexService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    if (this.pokemon?.info) {
      this.carregarDadosAdicionais();
    }
  }

  carregarDadosAdicionais(): void {
    this.pokedexService
      .getPokemonSpecies(this.pokemon.info.id)
      .subscribe((speciesData) => {
        this.pokemonSpecies = speciesData;

        if (speciesData.evolution_chain?.url) {
          this.pokedexService
            .getEvolutionChain(speciesData.evolution_chain.url)
            .subscribe((evolutionData) => {
              this.evolutionChain = evolutionData;
            });
        }
      });
  }

  get pokemonImageUrl(): string {
    if (!this.pokemon?.info?.sprites) {
      return '';
    }
    const sprites = this.pokemon.info.sprites;
    return (
      sprites.other?.['official-artwork']?.front_default ||
      sprites.front_default ||
      ''
    );
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src =
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png';
  }

  getStyleColors(pokemon: any) {
    return this.pokedexService.getStyleColors(pokemon);
  }

  getPokemonGenus(lang: string): string | null {
    const genusEntry = this.pokemonSpecies?.genera?.find(
      (g: any) => g.language.name === lang
    );
    return genusEntry ? genusEntry.genus : null;
  }

  getAbilities(): string {
    if (!this.pokemon?.info?.abilities) {
      return '';
    }
    return this.pokemon.info.abilities
      .map((a: any) => a.ability.name.replace('-', ' '))
      .join(', ');
  }

  fechar(): void {
    this.activeModal.dismiss();
  }
}
