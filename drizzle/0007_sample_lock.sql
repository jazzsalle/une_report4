ALTER TABLE "reports" ADD COLUMN "locked" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "situations" ADD COLUMN "locked" boolean DEFAULT false NOT NULL;