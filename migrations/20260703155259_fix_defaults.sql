-- Fix columns in frame
ALTER TABLE frame ALTER COLUMN split SET DEFAULT false;
ALTER TABLE frame ALTER COLUMN roll_two DROP NOT NULL;
