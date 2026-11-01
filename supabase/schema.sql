-- ==============================================================================
-- INS Compiler - Supabase PostgreSQL Schema & Seed Data
-- ==============================================================================

-- 1. Create practicals table
CREATE TABLE IF NOT EXISTS practicals (
    id TEXT PRIMARY KEY,
    practical_number INTEGER NOT NULL UNIQUE,
    practical_code TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT,
    language TEXT NOT NULL DEFAULT 'python',
    install_command TEXT,
    install_label TEXT,
    parts JSONB DEFAULT '[]'::jsonb,
    code_content TEXT NOT NULL,
    copyable BOOLEAN NOT NULL DEFAULT true,
    is_procedural BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE practicals ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Public read-only access (no login required)
DROP POLICY IF EXISTS "Allow public read access" ON practicals;
CREATE POLICY "Allow public read access" 
ON practicals 
FOR SELECT 
TO public 
USING (true);

-- 4. Index for sorted retrieval
CREATE INDEX IF NOT EXISTS idx_practicals_number ON practicals(practical_number ASC);
