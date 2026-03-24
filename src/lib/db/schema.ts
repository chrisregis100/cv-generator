import { pgTable, uuid, text, varchar, boolean, integer, jsonb, timestamp } from "drizzle-orm/pg-core";

export const cvs = pgTable("cvs", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).unique(),
  data: jsonb("data").notNull(),
  isPublished: boolean("is_published").default(false).notNull(),
  theme: varchar("theme", { length: 100 }).default("cupcake").notNull(),
  zoom: integer("zoom").default(163).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const cvAnalytics = pgTable("cv_analytics", {
  id: uuid("id").primaryKey().defaultRandom(),
  cvId: uuid("cv_id").notNull().references(() => cvs.id, { onDelete: "cascade" }),
  viewedAt: timestamp("viewed_at").defaultNow().notNull(),
  country: varchar("country", { length: 100 }),
  device: varchar("device", { length: 50 }),
  referer: text("referer"),
});
