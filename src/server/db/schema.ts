import {
	boolean,
	index,
	pgTable,
	text,
	timestamp,
	serial,
	varchar,
} from "drizzle-orm/pg-core";

// User table schema
export const user = pgTable("user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("email_verified").notNull(),
	image: text("image"),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
});

export const account = pgTable(
	"account",
	{
		id: text("id").primaryKey(),
		accountId: text("account_id").notNull(),
		providerId: text("provider_id").notNull(),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		accessToken: text("access_token"),
		refreshToken: text("refresh_token"),
		idToken: text("id_token"),
		accessTokenExpiresAt: timestamp("access_token_expires_at"),
		refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
		scope: text("scope"),
		password: text("password"),
		createdAt: timestamp("created_at").notNull(),
		updatedAt: timestamp("updated_at").notNull(),
	},
	(table) => ({
		userIdIdx: index("user_id_idx").on(table.userId),
	}),
);

export const verification = pgTable("verification", {
	id: text("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expires_at").notNull(),
	createdAt: timestamp("created_at"),
	updatedAt: timestamp("updated_at"),
});

export const chats = pgTable(
	"chats",
	{
		id: serial("id").primaryKey(),
		userId: serial("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		title: varchar("title", { length: 100 }).default("New Chat"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
	},
	(table) => {
		return {
			user_idx: index("chats_userId_idx").on(table.userId),
		};
	},
);

export const messages = pgTable(
	"messages",
	{
		id: serial("id").primaryKey(),
		chatId: serial("chat_id")
			.notNull()
			.references(() => chats.id, { onDelete: "cascade" }),
		userId: serial("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		content: varchar("content", { length: 4000 }),
		isBot: boolean("is_bot").default(false).notNull(),
		fileUrl: varchar("file_url", { length: 255 }),
		fileType: varchar("file_type", { length: 50 }),
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(table) => {
		return {
			user_idx: index("messages_userId_idx").on(table.userId),
			chatIdx: index("messages_chatId_idx").on(table.chatId),
		};
	},
);
