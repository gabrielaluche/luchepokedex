import { PokemonInfo } from './../../shared/model/PokemonInfo.model';
import { Component, OnInit, Input } from '@angular/core'; // Importa os módulos necessários do Angular
import { PokedexService } from 'src/app/services/pokedex.service'; // Importa o serviço responsável por fazer requisições à API
import { SearchHeaderComponent } from '../search-header/search-header.component'; // Importa o componente de cabeçalho de busca
import { PokemonCardMapper } from 'src/app/shared/mapper/PokemonCardMapper'; // Importa a classe responsável por mapear os dados da API para o modelo utilizado na aplicação
import { PokemonInfoMapper } from 'src/app/shared/mapper/PokemonInfoMapper'; // Importa a classe responsável por mapear as informações detalhadas do Pokémon
import { Pokemon } from 'src/app/shared/model/pokemon'; // Importa o modelo Pokemon que representa a estrutura dos dados do Pokémon

@Component({
  //Decorador que define o metadados do componente
  selector: 'app-lista-pokemon', // Nome da tag HTML que representa esse componente
  templateUrl: './lista-pokemon.component.html', // Caminho do template HTML
  styleUrls: ['./lista-pokemon.component.scss'], // Caminho do CSS
})
export class ListaPokemonComponent implements OnInit {
  // Classe do componente que implementa o ciclo de vida OnInit
  // Lista que será exibida na tela, contendo os Pokémons filtrados
  listaPokemon: Pokemon[] = [];
  // String que armazena o texto digitado no campo de filtro
  filtro = '';
  // Lista geral com todos os Pokémons retornados pela API
  listaGeral: Pokemon[] = [];
  // Lista com os Pokémons mapeados para um modelo mais adequado (classe Pokemon)
  listaMap: Pokemon[] = [];
  // Injeção de dependências via construtor
  constructor(
    private pokedexService: PokedexService, // Serviço responsável por fazer requisições à API
    private mapper: PokemonCardMapper, // Classe responsável por transformar (mapear) os dados da API para modelos utilizados na aplicação
    private infoMapper: PokemonInfoMapper // Classe responsável por mapear as informações detalhadas do Pokémon
  ) {}

  // Método que filtra a lista de Pokémons com base no evento (texto digitado)
  filtraPokemon(event: any): void {
    this.listaPokemon = this.listaGeral.filter((item) =>
      // Filtra pelo nome que inclui o texto digitado
      item.nome.includes(event as string)
    );
  }

  // Método do ciclo de vida que é executado automaticamente quando o componente é inicializado
  ngOnInit(): void {
    // Chamada ao serviço para buscar a lista de Pokémons
    this.pokedexService.getListaPokemon().subscribe((response) => {
      // Faz a requisição à API e obtém a resposta
      this.listaPokemon = this.mapper.mapFromDTO(response); // Mapeia os dados da API para o modelo Pokemon
      this.listaGeral = this.listaPokemon; // Armazena a lista geral de Pokémons
      // Mapeia a lista de Pokémons para o modelo PokemonInfo
      // Isso é feito para que cada Pokémon tenha informações adicionais, como altura, peso, habilidades, etc.
      this.listaGeral.forEach((pokemon) => {
        this.pokedexService.getPokemonById(pokemon.nome).subscribe((info) => {
          // Para cada Pokémon, busca as informações detalhadas e mapeia para o modelo PokemonInfo
          pokemon.info = this.infoMapper.mapFromDTO(info);
        });
      });
    });
  }
  // Método que define uma imagem alternativa para exibição caso a imagem não não seja encontrada
  setFallbackImage(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    const currentSrc = imgElement.src;
    const idMatch = currentSrc.match(/\/(\d+)\.svg$/);
    // Verifica se o ID do Pokémon pode ser extraído do URL da imagem
    if (idMatch) {
      const id = idMatch[1];
      // Se o ID for encontrado, define a imagem alternativa (PNG) para o Pokémon
      imgElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;
    }
  }
}
