// Interface que define a estrutura de um Pokémon
//Este modelo representa o que a API vai retornar
export interface Pokemon {
  name: string; // Nome do Pokémon
  image: any; // URL da imagem do Pokémon
  description: string; // Descrição do Pokémon
  id: number; // ID do Pokémon
}
