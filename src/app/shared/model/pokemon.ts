//Classe que representa os atributos do card de pokémons que será exibido na tela
export class Pokemon {
  constructor(
    public nome: string, // Nome do Pokémon
    public id: string, // ID do Pokémon
    public imagem: string // URL da imagem do Pokémon
  ) {}
}
