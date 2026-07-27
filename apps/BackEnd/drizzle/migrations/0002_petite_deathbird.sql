CREATE TABLE IF NOT EXISTS "order_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer NOT NULL,
	"product_id" varchar(100),
	"name" varchar(255) NOT NULL,
	"price" numeric(12, 2) NOT NULL,
	"quantity" integer NOT NULL,
	"size" varchar(50)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"address" text NOT NULL,
	"notes" text,
	"total" numeric(12, 2) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DROP TABLE "employees";--> statement-breakpoint
DROP TABLE "user_details";--> statement-breakpoint
DROP TABLE "users";