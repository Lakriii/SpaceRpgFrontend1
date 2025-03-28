export interface InventoryItem {
    object_id: number | null;
    quantity: number | null;
    is_equipped: boolean;
    player: number | null;
    content_type: string | null;
  }
  
  export interface Weapon {
    name: string;
    description: string;
    value: number | null;
    rarity: string | null;
    base_damage: number | null;
    critical_chance: number | null;
    critical_damage_bonus: number | null;
  }
  
  export interface Armor {
    name: string;
    description: string;
    value: number | null;
    rarity: string | null;
    defense_bonus: number | null;
    special_effect: string;
  }
  
  export interface Jewelry {
    name: string;
    description: string;
    value: number | null;
    rarity: string | null;
    origin: string;
  }
  
  export interface QuestItem {
    name: string;
    description: string;
    value: number | null;
    rarity: string | null;
    quest_name: string;
    is_consumed: boolean;
  }