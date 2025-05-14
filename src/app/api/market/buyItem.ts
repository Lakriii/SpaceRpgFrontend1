import { db } from '@lib/db/db'; // Adjust imports as necessary
import { players, marketItems, playerInventory } from '@lib/db/schema';
const buyItem = async (playerId: number, itemId: number, price: number) => {
  try {
    // Fetch player and item details
    const player = await db.select().from(players).where(players.id.eq(playerId)).limit(1).execute();
    const item = await db.select().from(marketItems).where(marketItems.id.eq(itemId)).limit(1).execute();

    // If player or item doesn't exist, throw error
    if (player.length === 0 || item.length === 0) {
      throw new Error("Player or item not found");
    }

    // Check if player has enough credits
    const playerCredits = player[0].credits;
    if (playerCredits < price) {
      throw new Error("Insufficient credits");
    }

    // Deduct credits from player account
    await db
      .update(players)
      .set({ credits: playerCredits - price })
      .where(players.id.eq(playerId))
      .execute();

    // Add item to player's inventory
    await db.insert(playerInventory).values({
      player_id: playerId,
      item_id: itemId,
      quantity: 1,
      is_equipped: false, // You can modify this depending on your business logic
    }).execute();

    // Return success
    return { success: true };

  } catch (error) {
    console.error("Error in buying item:", error);
    throw new Error("Purchase failed. Please try again.");
  }
};
export default buyItem;