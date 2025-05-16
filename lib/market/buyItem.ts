import { db } from '@lib/db/db';
import { players, marketItems, playerInventory } from '@lib/db/schema';
import { eq } from 'drizzle-orm';  // Importuj eq!

const buyItem = async (playerId: number, itemId: number, price: number) => {
  try {
    const player = await db.select()
      .from(players)
      .where(eq(players.id, playerId))   // Použi eq() tu
      .limit(1)
      .execute();

    const item = await db.select()
      .from(marketItems)
      .where(eq(marketItems.id, itemId))  // A tu tiež
      .limit(1)
      .execute();

    if (player.length === 0 || item.length === 0) {
      throw new Error("Player or item not found");
    }

    const playerCredits = player[0].credits;
    if (playerCredits < price) {
      throw new Error("Insufficient credits");
    }

    await db.update(players)
      .set({ credits: playerCredits - price })
      .where(eq(players.id, playerId))   // A tu rovnako
      .execute();

    await db.insert(playerInventory).values({
      player_id: playerId,
      item_id: itemId,
      quantity: 1,
      is_equipped: false,
    }).execute();

    return { success: true };

  } catch (error) {
    console.error("Error in buying item:", error);
    throw new Error("Purchase failed. Please try again.");
  }
};

export default buyItem;
