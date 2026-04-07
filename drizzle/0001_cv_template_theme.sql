ALTER TABLE "cvs" ADD COLUMN IF NOT EXISTS "template_id" varchar(64) DEFAULT 'commercial_sidebar' NOT NULL;
ALTER TABLE "cvs" ADD COLUMN IF NOT EXISTS "cv_theme" jsonb;
