CREATE TABLE "tutorial_seeds" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"data" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "situations" ADD COLUMN "tutorial" boolean DEFAULT false NOT NULL;--> statement-breakpoint
-- 따라하기 시드 잠금: 승인(app.tutorial_unlock = 'approve') 없이 고치기·지우기·비우기를 막는다
CREATE OR REPLACE FUNCTION tutorial_seed_guard() RETURNS trigger AS $$
BEGIN
  IF coalesce(current_setting('app.tutorial_unlock', true), '') <> 'approve' THEN
    RAISE EXCEPTION '따라하기 시드 데이터는 잠겨 있습니다. 승인 후 scripts/tutorial-seed.ts --delete --approve 로만 지울 수 있습니다.';
  END IF;
  IF TG_OP = 'DELETE' THEN RETURN OLD; END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
--> statement-breakpoint
CREATE TRIGGER tutorial_seed_lock_row BEFORE UPDATE OR DELETE ON "tutorial_seeds" FOR EACH ROW EXECUTE FUNCTION tutorial_seed_guard();
--> statement-breakpoint
CREATE TRIGGER tutorial_seed_lock_truncate BEFORE TRUNCATE ON "tutorial_seeds" FOR EACH STATEMENT EXECUTE FUNCTION tutorial_seed_guard();
