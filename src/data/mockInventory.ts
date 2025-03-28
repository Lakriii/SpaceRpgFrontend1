import { InventoryItem, Weapon, Armor, Jewelry, QuestItem } from "@/types/inventoryTypes";

export const mockInventory: InventoryItem[] = [
  { object_id: 1, quantity: 1, is_equipped: true, player: 1, content_type: "weapon" },
  { object_id: 2, quantity: 1, is_equipped: false, player: 1, content_type: "armor" },
  { object_id: 3, quantity: 2, is_equipped: false, player: 1, content_type: "jewelry" },
  { object_id: 4, quantity: 1, is_equipped: false, player: 1, content_type: "quest_item" },
];

export const mockItems: Record<number, Weapon | Armor | Jewelry | QuestItem> = {
  1: {
    name: "Plasma Blaster",
    description: "A high-energy plasma weapon",
    value: 500,
    rarity: "Epic",
    base_damage: 75,
    critical_chance: 0.2,
    critical_damage_bonus: 1.5,
  } as Weapon,
  2: {
    name: "Titanium Armor",
    description: "Heavy-duty space armor",
    value: 700,
    rarity: "Rare",
    defense_bonus: 50,
    special_effect: "Reduces energy damage by 10%",
  } as Armor,
  3: {
    name: "Galactic Amulet",
    description: "An ancient amulet with mysterious powers",
    value: 300,
    rarity: "Legendary",
    origin: "Unknown civilization",
  } as Jewelry,
  4: {
    name: "Encrypted Data Disk",
    description: "A disk containing classified information",
    value: null,
    rarity: "Uncommon",
    quest_name: "The Lost Transmission",
    is_consumed: false,
  } as QuestItem,
};