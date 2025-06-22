/* detalhe-pokemon.component.ts */
import { Component,  Input,  OnInit,  ChangeDetectorRef,  ViewChild } from '@angular/core';
import { PokedexService } from 'src/app/services/pokedex.service';
import { NgbActiveModal,  NgbNav,  NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin, of, Observable } from 'rxjs';
import { catchError, switchMap, tap, map as rxJsMap } from 'rxjs/operators';

@Component({
  selector: 'app-detalhe-pokemon',
  templateUrl: './detalhe-pokemon.component.html',
  styleUrls: ['./detalhe-pokemon.component.scss'],
})
export class DetalhePokemonComponent implements OnInit {
  @Input() pokemon: any;
  @ViewChild('nav') nav?: NgbNav;

  public activeTabId = 1;
  public tabContent: any = null;
  public isLoadingTab = false;

  private pokemonSpecies: any;
  private evolutionLine: any[] = [];
  private pokemonTypeDetails: any = {};

  constructor(
    public pokedexService: PokedexService,
    public activeModal: NgbActiveModal,
    private cdr: ChangeDetectorRef
  ) {}

  //  ngOnInit agora gerencia a ordem das chamadas ###
  ngOnInit(): void {
    if (this.pokemon?.info) {
      // Primeiro, chamamos a função que busca os dados e nos "inscrevemos" nela.
      this.carregarDadosAdicionais().subscribe({
        next: () => {
          console.log(
            'Dados carregados. Agora exibindo o conteúdo da aba :',
            this.activeTabId
          );
          this.loadTabContent(this.activeTabId);
        },
        error: (err) => {
          console.error('Falha ao carregar os dados iniciais do Pokémon.', err);
        },
      });
    }
  }
  // Método para selecionar uma aba diretamente, sem usar o ngbNav
  public selecionarAba(id: number): void {
    // Esta verificação evita recarregar a aba se o usuário clicar na que já está ativa
    if (this.activeTabId === id) {
      return;
    }

    this.activeTabId = id;
    this.loadTabContent(id);
  }

  // Método que trata quando selecionadas as opções das abas do modal
  private loadTabContent(tabId: number): void {
    this.isLoadingTab = true;
    this.tabContent = null;
    setTimeout(() => {
      switch (tabId) {
        case 1: // Opção 1: Dados sobre o Pokémon
          this.tabContent = this.getAboutData();
          break;
        case 2: // Opção 2: Estatísticas base do Pokémon
          this.tabContent = this.getBaseStatsData();
          break;
        case 3: // Opção 3: Dados de batalha do Pokémon
          this.tabContent = this.getBattleData();
          break;
        case 4: // Opção 4: Dados de evolução do Pokémon
          this.tabContent = this.getEvolutionData();
          break;
      }
      this.isLoadingTab = false;
      this.cdr.detectChanges();
    }, 300);
  }

  // Método que retorna os dados sobre o Pokémon - opção 1
  private getAboutData(): object {
    return {
      title: 'About',
      species:
        this.pokemonSpecies?.genera?.find((g: any) => g.language.name === 'en')
          ?.genus || 'Unknown',
      height: this.pokemon.info.height / 10,
      weight: this.pokemon.info.weight / 10,
      abilities: this.pokemon.info.abilities
        .map((a: any) => a.ability.name.replace('-', ' '))
        .join(', '),
    };
  }

  // Método que retorna os dados de estatísticas base do Pokémon - opção 2
  private getBaseStatsData(): object {
    const stats = this.pokemon.info.stats;
    const total = stats
      .map((s: any) => s.base_stat)
      .reduce((acc: number, value: number) => acc + value, 0);
    return {
      title: 'Base Stats',
      stats: stats.map((s: any) => ({
        name: s.stat.name.replace('-', ' '),
        value: s.base_stat,
      })),
      total: total,
    };
  }

  // Método que retorna os dados de batalha do Pokémon - opção 3
  private getBattleData(): object {
    return {
      title: 'Battle',
      typeDefenses: this.calculateTypeDefenses(),
    };
  }

  // Método que retorna os dados de evolução do Pokémon - opção 4
  private getEvolutionData(): object {
    return {
      title: 'Evolution Line',
      line: this.evolutionLine.length > 1 ? this.evolutionLine : null,
    };
  }

  // Método que carrega os dados adicionais do Pokémon, como espécie, evolução e tipos
  private carregarDadosAdicionais(): Observable<any> {
    // 1. Prepara o observable para buscar dados da espécie e, em seguida, da evolução
    const speciesAndEvolution$ = this.pokedexService
      .getPokemonSpecies(this.pokemon.info.id)
      .pipe(
        tap((speciesData) => {
          this.pokemonSpecies = speciesData; // Armazena os dados
        }),
        switchMap((speciesData) => {
          if (speciesData.evolution_chain?.url) {
            return this.pokedexService
              .getEvolutionChain(speciesData.evolution_chain.url)
              .pipe(
                tap((evolutionData) => {
                  this.parseEvolutionChain(evolutionData.chain); // Processa os dados
                })
              );
          }
          return of(null); // Retorna um observable vazio se não tiver evolução
        })
      );

    // 2. Prepara um array de observables para buscar os detalhes de todos os tipos do Pokémon
    const typeDetails$ = forkJoin(
      this.pokemon.info.types.map((typeInfo: any) =>
        this.pokedexService
          .getTypeDetails(typeInfo.type.name)
          .pipe(catchError(() => of(null)))
      )
    ).pipe(
      rxJsMap((result) => result as any[]),

      tap((typeDetailsArray: any[]) => {
        typeDetailsArray.forEach((typeDetail) => {
          if (typeDetail) {
            this.pokemonTypeDetails[typeDetail.name] =
              typeDetail.damage_relations;
          }
        });
      })
    );

    // 3. Retorna um forkJoin que só vai completar quando AMBAS as operações (1 e 2) terminarem.
    return forkJoin([speciesAndEvolution$, typeDetails$]);
  }

  private parseEvolutionChain(chain: any): void {
    const evolutionLine: any[] = [];
    let current = chain;
    while (current) {
      const id = this.extractIdFromUrl(current.species.url);
      evolutionLine.push({
        id: id,
        name: current.species.name,
        imageUrl: this.pokedexService.getPokemonImageUrl(id),
      });
      current = current.evolves_to?.[0];
    }
    this.evolutionLine = evolutionLine;
  }

  /**
   * Calcula as defesas (fraquezas, resistências, imunidades) do Pokémon
   * com base nos detalhes de tipo pré-carregados.
   * @returns {object} Um objeto com as defesas agregadas.
   */
  private calculateTypeDefenses(): object {
    const weaknesses: string[] = [];
    const resistances: string[] = [];
    for (const typeName in this.pokemonTypeDetails) {
      const relations = this.pokemonTypeDetails[typeName];
      if (relations) {
        relations.double_damage_from.forEach((t: any) =>
          weaknesses.push(t.name)
        );
        relations.half_damage_from.forEach((t: any) =>
          resistances.push(t.name)
        );
      }
    }
    return {
      weaknesses: [...new Set(weaknesses)],
      resistances: [...new Set(resistances)],
    };
  }

  private extractIdFromUrl(url: string): string {
    return url.split('/').filter(Boolean).pop() || '';
  }

  getStyleColors(pokemon: any) {
    return this.pokedexService.getStyleColors(pokemon);
  }

  public fechar(): void {
    this.activeModal.dismiss();
  }
}
