type PokemonType =
  | 'normal'
  | 'fire'
  | 'water'
  | 'electric'
  | 'grass'
  | 'ice'
  | 'fighting'
  | 'poison'
  | 'ground'
  | 'flying'
  | 'psychic'
  | 'bug'
  | 'rock'
  | 'ghost'
  | 'dragon'
  | 'dark'
  | 'steel'
  | 'fairy';

interface PokemonApiType {
  slot: number;
  type: { name: string }; // nome será tipo 'fire', 'grass', etc
}

// classe que contém métodos utilitários para manipulação de cores de Pokémon
// e tipos de Pokémon, como obter cores, gradientes e contrastes baseados nos tipos
export class PokemonColorUtils {
  private static typeColors: Record<PokemonType, string> = {
    normal: 'rgb(168, 167, 122)',
    fire: 'rgb(238, 129, 48)',
    water: 'rgb(99, 144, 240)',
    electric: 'rgb(247, 208, 44)',
    grass: 'rgb(122, 199, 76)',
    ice: 'rgb(150, 217, 214)',
    fighting: 'rgb(194, 46, 40)',
    poison: 'rgb(163, 62, 161)',
    ground: 'rgb(226, 191, 101)',
    flying: 'rgb(169, 143, 243)',
    psychic: 'rgb(249, 85, 135)',
    bug: 'rgb(166, 185, 26)',
    rock: 'rgb(182, 161, 54)',
    ghost: 'rgb(115, 87, 151)',
    dragon: 'rgb(111, 53, 252)',
    dark: 'rgb(112, 87, 70)',
    steel: 'rgb(183, 183, 206)',
    fairy: 'rgb(214, 133, 173)',
  };

  /** Garante que o tipo recebido é válido */
  private static validateType(type: string): PokemonType | null {
    return type in this.typeColors ? (type as PokemonType) : null;
  }

  /** Retorna a cor do tipo, ou uma cor default */
  public static getTypeColorFromApi(type: string): string {
    const validType = this.validateType(type);
    return validType ? this.typeColors[validType] : 'rgb(200, 200, 200)'; // cor padrão caso o tipo não exista
  }

  /** Retorna gradiente diretamente de array vindo da API */
  public static getGradientFromApiTypes(
    types: PokemonApiType[],
    direction: 'vertical' | 'horizontal' | 'diagonal' = 'vertical'
  ) {
    const primaryType = types[0]?.type?.name;
    const secondaryType = types[1]?.type?.name;

    const primaryColor = this.getTypeColorFromApi(primaryType);
    const secondaryColor = secondaryType
      ? this.getTypeColorFromApi(secondaryType)
      : 'rgb(246, 246, 246)';

    let angle: string;
    switch (direction) {
      case 'horizontal':
        angle = '90deg';
        break;
      case 'diagonal':
        angle = '45deg';
        break;
      case 'vertical':
      default:
        angle = '180deg';
    }

    return {
      background: primaryColor,
      //backgroundImage: `linear-gradient(${angle}, ${primaryColor}, ${secondaryColor})`,
      backgroundImage: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
    };
  }

  /** Retorna box-shadow baseado no tipo */
  public static getTypeBorderGlowFromApi(
    type: string,
    intensity: number = 8
  ): string {
    const color = this.getTypeColorFromApi(type);
    return `box-shadow: 0 0 ${intensity}px ${color}; border: 2px solid ${color};`;
  }

  /** Cor ideal de contraste para o tipo vindo da API */
  public static getContrastColorFromApi(type: string): string {
    const rgb = this.getTypeColorFromApi(type).match(/\d+/g);
    if (!rgb) return '#000000';

    const r = parseInt(rgb[0], 10);
    const g = parseInt(rgb[1], 10);
    const b = parseInt(rgb[2], 10);

    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance > 0.6 ? '#000000' : '#FFFFFF';
  }




}
