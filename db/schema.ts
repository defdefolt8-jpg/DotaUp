import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const marketCache = sqliteTable("market_cache", {
  itemId: integer("item_id").primaryKey(),
  steamQuery: text("steam_query").notNull(),
  marketHashName: text("market_hash_name"),
  marketName: text("market_name"),
  imageUrl: text("image_url"),
  priceCoins: integer("price_coins").notNull(),
  sourceCurrency: text("source_currency").notNull().default("RUB"),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAtEpoch: integer("updated_at_epoch").notNull(),
});
