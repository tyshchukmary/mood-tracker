-- 20260423_initial_schema_create.sql
-- Based on docs/ai/SUPABASE.md

-- 0. Cleanup
DROP TABLE IF EXISTS public.mood_entry_activities CASCADE;
DROP TABLE IF EXISTS public.mood_entries CASCADE;
DROP TABLE IF EXISTS public.activities CASCADE;
DROP TABLE IF EXISTS public.shop_items CASCADE;
DROP TABLE IF EXISTS public.user_roles CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- 1. Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Profiles Table (Syncs with auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. User Roles (RBAC)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  role_name TEXT NOT NULL CHECK (role_name IN ('admin', 'customer', 'editor')),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, role_name)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 4. Activities Catalog
CREATE TABLE public.activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

-- 5. Mood Entries
CREATE TABLE public.mood_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  mood_level INTEGER NOT NULL CHECK (mood_level >= 1 AND mood_level <= 5),
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.mood_entries ENABLE ROW LEVEL SECURITY;

-- Join table for Mood Entries and Activities
CREATE TABLE public.mood_entry_activities (
  mood_entry_id UUID REFERENCES public.mood_entries(id) ON DELETE CASCADE,
  activity_id UUID REFERENCES public.activities(id) ON DELETE CASCADE,
  PRIMARY KEY (mood_entry_id, activity_id)
);

ALTER TABLE public.mood_entry_activities ENABLE ROW LEVEL SECURITY;

-- 6. Shop Items (Requested for testing)
CREATE TABLE public.shop_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  price_cents INTEGER NOT NULL DEFAULT 0,
  image_url TEXT,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.shop_items ENABLE ROW LEVEL SECURITY;

-- 7. Triggers for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_activities_updated_at BEFORE UPDATE ON public.activities FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_mood_entries_updated_at BEFORE UPDATE ON public.mood_entries FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_shop_items_updated_at BEFORE UPDATE ON public.shop_items FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 8. Sync Profile with Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'avatar_url');
  
  -- Default role
  INSERT INTO public.user_roles (user_id, role_name)
  VALUES (NEW.id, 'customer');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 9. RLS Policies

-- Profiles: Users can view all, but only edit their own
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Mood Entries: Users can only see and manage their own
CREATE POLICY "Users can manage own mood entries" ON public.mood_entries
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage own mood activities" ON public.mood_entry_activities
  USING (EXISTS (SELECT 1 FROM public.mood_entries WHERE id = mood_entry_id AND user_id = auth.uid()));

-- Activities: Viewable by all, managed by admins
CREATE POLICY "Activities are viewable by all" ON public.activities FOR SELECT USING (true);
CREATE POLICY "Admins can manage activities" ON public.activities
  USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role_name = 'admin'));

-- Shop Items: Viewable by all, managed by admins
CREATE POLICY "Shop items are viewable by all" ON public.shop_items FOR SELECT USING (true);
CREATE POLICY "Admins can manage shop items" ON public.shop_items
  USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role_name = 'admin'));

-- 10. Mock Data
INSERT INTO public.activities (name, icon) VALUES 
('Work', 'Briefcase'),
('Gym', 'Dumbbell'),
('Sleep', 'Moon'),
('Healthy Food', 'Apple'),
('Music', 'Music');

INSERT INTO public.shop_items (title, description, price_cents, stock_quantity) VALUES
('Premium Zen Theme', 'A dark, soothing theme for your mood tracker.', 499, 1000),
('Emotional Statistics Pack', 'Advanced charts and monthly reports.', 299, 500),
('Sticker Pack: Rainy Days', '15 exclusive stickers for moody notes.', 150, 2000);
