//Interface for Pokemon information as per PokeAPI specifications
// This interface defines the structure of a Pokémon object as returned by the PokeAPI
// It includes various properties such as abilities, moves, stats, and more.

export interface PokemonInfoResponse {
  id: number; // Unique identifier for the Pokémon
  name: string; // Name of the Pokémon
  height: number; // Height in decimetres (1 decimetre = 10 centimetres)
  weight: number; // Weight in hectograms (1 hectogram = 100 grams)
  abilities: Ability[]; // List of abilities the Pokémon can have
  stats: Stat[]; // Stats of the Pokémon (e.g., HP, Attack, Defense, etc.)
  types: Type[]; // Types of the Pokémon (e.g., Fire, Water, etc.)

}

export interface Ability {
  ability: NamedAPIResource;
  is_hidden: boolean;
  slot: number;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
}

export interface Type {
  slot: number;
  type: NamedAPIResource;
}

export interface PastType {
  generation: NamedAPIResource;
  types: Type[];
}

export interface NamedAPIResource {
  name: string;
  url: string;
}
