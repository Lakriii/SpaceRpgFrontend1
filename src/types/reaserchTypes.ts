// Typy pre neuróny
export interface Neuron {
    id: string;
    type: NeuronType;
    isActive: boolean;
    energyCost: number;
    effect: string;
  }
  
  // Typy pre rôzne typy neurónov
  export type NeuronType = "Amplify" | "Invert" | "Delay" | "Transmit" | "Block";
  
  // Typ pre stav hry
  export interface MiningGameState {
    energy: number;
    minerals: number;
    turnsRemaining: number;
    neurons: Neuron[];
  }
  