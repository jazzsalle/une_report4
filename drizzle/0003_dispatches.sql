CREATE TABLE "dispatches" (
	"id" text PRIMARY KEY NOT NULL,
	"token" text NOT NULL,
	"situation_id" text NOT NULL,
	"mission_id" text NOT NULL,
	"contact_id" text,
	"name" text NOT NULL,
	"unit" text DEFAULT '' NOT NULL,
	"phone" text DEFAULT '' NOT NULL,
	"email" text DEFAULT '' NOT NULL,
	"channel" text DEFAULT 'SMS' NOT NULL,
	"message" text DEFAULT '' NOT NULL,
	"sent_at" timestamp with time zone DEFAULT now() NOT NULL,
	"read_at" timestamp with time zone,
	"done_at" timestamp with time zone,
	"note" text DEFAULT '' NOT NULL,
	"note_at" timestamp with time zone,
	"ack_at" timestamp with time zone,
	"ack_by" text DEFAULT '' NOT NULL,
	CONSTRAINT "dispatches_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE INDEX "dispatches_situation_idx" ON "dispatches" USING btree ("situation_id");