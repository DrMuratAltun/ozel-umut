-- Umut Ozel Egitim - Veritabani Tablolari
-- Bu SQL'i Supabase Dashboard > SQL Editor'de calistirin

CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_description TEXT,
  description TEXT,
  icon_name TEXT,
  image_url TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_description TEXT,
  description TEXT,
  target_group TEXT,
  icon_name TEXT,
  image_url TEXT,
  features TEXT[] DEFAULT ARRAY[]::TEXT[],
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  title TEXT NOT NULL,
  specialization TEXT,
  bio TEXT,
  photo_url TEXT,
  email TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS gallery_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  description TEXT,
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  category TEXT,
  media_type TEXT DEFAULT 'image',
  video_url TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  cover_image_url TEXT,
  author_id UUID REFERENCES profiles(id),
  category TEXT,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  status TEXT DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  cover_image_url TEXT,
  status TEXT DEFAULT 'active',
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  read_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  relation TEXT,
  content TEXT NOT NULL,
  rating INT DEFAULT 5,
  is_active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  "group" TEXT DEFAULT 'general'
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_programs_slug ON programs(slug);
CREATE INDEX IF NOT EXISTS idx_programs_active ON programs(is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_team_active ON team_members(is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery_items(category);
CREATE INDEX IF NOT EXISTS idx_gallery_active ON gallery_items(is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_blog_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_status ON blog_posts(status, published_at);
CREATE INDEX IF NOT EXISTS idx_blog_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_active ON projects(is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_messages_read ON contact_messages(is_read);
CREATE INDEX IF NOT EXISTS idx_messages_date ON contact_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_testimonials_active ON testimonials(is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_settings_key ON site_settings(key);
CREATE INDEX IF NOT EXISTS idx_settings_group ON site_settings("group");

-- Seed data: Services
INSERT INTO services (title, slug, short_description, description, icon_name, sort_order) VALUES
('Ozel Egitim', 'ozel-egitim', 'Bireysel degerlendirme sonuclarina gore hazirlanan ozel egitim programlari ile ogrencilerimizin akademik ve sosyal gelisimlerini destekliyoruz.', 'Ozel egitim programlarimiz, her ogrencinin bireysel ihtiyaclarina gore ozel olarak tasarlanmaktadir. Uzman egitimcilerimiz, bilimsel yontemler ve guncel yaklasimlar kullanarak ogrencilerimizin akademik, sosyal ve duygusal gelisimlerini desteklemektedir.

Bireysel Egitim Planlari (BEP) cercevesinde, her ogrencimiz icin ozel hedefler belirleniyor ve duzenli olarak ilerleme degerlendirmesi yapilmaktadir.', 'BookOpen', 1),
('Dil ve Konusma Terapisi', 'dil-ve-konusma-terapisi', 'Dil gecikmesi, artikulasyon bozukluklari, kekemelik ve iletisim gucluklerinde uzman terapistlerimizle destek sagliyoruz.', 'Dil ve konusma terapisi programimiz, iletisim guclugu yasayan bireylere kapsamli destek sunmaktadir. Uzman dil ve konusma terapistlerimiz, dil gecikmesi, artikulasyon bozukluklari, kekemelik, ses bozukluklari ve pragmatik dil sorunlarinda etkili terapi programlari uygulamaktadir.', 'MessageCircle', 2),
('Fizyoterapi', 'fizyoterapi', 'Motor gelisim geriligi, serebral palsi ve bedensel yetersizliklerde fiziksel rehabilitasyon programlari uyguluyoruz.', 'Fizyoterapi birimimizde, motor gelisim geriligi, serebral palsi, muskuler distrofi ve diger bedensel yetersizliklerde uzmanlasmis fizyoterapistlerimiz gorev yapmaktadir. Bireysel degerlendirme sonuclarina gore hazirlanan rehabilitasyon programlari ile hastalarimizin fiziksel kapasitelerini en ust duzeye cikarmak hedeflenmektedir.', 'Activity', 3),
('Psikolojik Danismanlik', 'psikolojik-danismanlik', 'Cocuk ve aile odakli psikolojik degerlendirme, terapi ve danismanlik hizmetleri sunuyoruz.', 'Psikolojik danismanlik birimimizde, cocuk ve ergen psikolojisi alaninda uzman psikologlarimiz gorev yapmaktadir. Oyun terapisi, bilissel davranisci terapi ve aile danismanligi gibi bilimsel yontemlerle cocuklarimizin duygusal ve davranissal gelisimlerini destekliyoruz.', 'Brain', 4),
('Ergoterapi', 'ergoterapi', 'Gunluk yasam aktiviteleri, ince motor beceriler ve duyusal butunleme terapisi ile bagimsizlik kazandiriyoruz.', 'Ergoterapi programimiz, bireylerin gunluk yasam aktivitelerinde bagimsizlik kazanmalarina yardimci olmaktadir. Ince motor beceriler, el-goz koordinasyonu, duyusal butunleme ve oz bakim becerileri gibi alanlarda uzman ergoterapistlerimiz tarafindan bireysel terapi programlari uygulanmaktadir.', 'Hand', 5),
('Odyoloji', 'odyoloji', 'Isitme degerlendirmesi, isitme cihazi uygulamalari ve isitme engelli bireylere yonelik destek programlari sunuyoruz.', 'Odyoloji birimimizde, isitme degerlendirmesi, isitme cihazi uyumlandirmasi ve isitsel rehabilitasyon programlari sunulmaktadir. Isitme kaybi olan bireylerin iletisim becerilerinin gelistirilmesi ve toplumsal katilimlarinin desteklenmesi hedeflenmektedir.', 'Ear', 6);

-- Seed data: Programs
INSERT INTO programs (title, slug, short_description, target_group, features, sort_order) VALUES
('Zihinsel Yetersizlik Destegi', 'zihinsel-yetersizlik-destegi', 'Zihinsel gelisim geriligi olan bireylere yonelik bireysel egitim programlari.', '3-18 Yas', ARRAY['Bireysel egitim plani', 'Gunluk yasam becerileri', 'Sosyal uyum calismalari', 'Akademik destek', 'Aile rehberligi'], 1),
('Otizm Spektrum Bozuklugu Destegi', 'otizm-spektrum-bozuklugu-destegi', 'Otizm spektrum bozuklugu teshisi almis bireylere ozel yapilandirilmis egitim.', '2-18 Yas', ARRAY['ABA terapi', 'Sosyal beceri egitimi', 'Iletisim destegi', 'Duyusal butunleme', 'Yapilandirilmis egitim'], 2),
('Ogrenme Guclugu Destegi', 'ogrenme-guclugu-destegi', 'Disleksi, diskalkuli ve diger ogrenme gucluklerinde akademik destek.', '6-18 Yas', ARRAY['Okuma-yazma destegi', 'Matematik destegi', 'Dikkat calismalari', 'Calisma becerileri', 'Sinav stratejileri'], 3),
('Dil ve Konusma Bozukluklari Destegi', 'dil-konusma-bozukluklari-destegi', 'Dil gecikmesi, artikulasyon ve akicilik bozukluklarinda uzman terapi.', '2-18 Yas', ARRAY['Dil terapisi', 'Artikulasyon calismalari', 'Pragmatik dil', 'Akicilik terapisi', 'Alternatif iletisim'], 4),
('Bedensel Yetersizlik Destegi', 'bedensel-yetersizlik-destegi', 'Bedensel engelli bireylere yonelik fiziksel rehabilitasyon ve egitim.', '3-18 Yas', ARRAY['Fizyoterapi', 'Motor gelisim', 'Adaptif beceriler', 'Yardimci teknoloji', 'Postural destek'], 5),
('Isitme Yetersizlik Destegi', 'isitme-yetersizlik-destegi', 'Isitme engelli bireylere yonelik isitsel egitim ve iletisim destegi.', '2-18 Yas', ARRAY['Isitsel egitim', 'Dudak okuma', 'Isaret dili', 'Isitme cihazi uyumu', 'Konusma terapisi'], 6);

-- Seed data: Testimonials
INSERT INTO testimonials (name, relation, content, rating, sort_order) VALUES
('Ayse K.', 'Veli', 'Cocugumuzun gelisiminde inanilmaz bir ilerleme kaydettik. Ogretmenler cok ilgili ve alakali. Her gun okula gitmek istiyor artik.', 5, 1),
('Mehmet Y.', 'Veli', 'Dil ve konusma terapisi sonuclarini kisa surede gormeye basladik. Profesyonel kadro ve sicak ortam icin tesekkur ediyoruz.', 5, 2),
('Fatma D.', 'Veli', 'Umut Ozel Egitim ailesi gercekten adina yarasiyor. Cocuklarimiza umut asiliyor burada. Herkese gonul rahatligiyla tavsiye ederim.', 5, 3);

-- Seed data: Site Settings
INSERT INTO site_settings (key, value, "group") VALUES
('phone', '0242 643 01 45', 'contact'),
('email', 'info@ozelegitimumut.com', 'contact'),
('address', 'Korkuteli, Antalya', 'contact'),
('whatsapp', '902426430145', 'contact'),
('weekday_hours', '08:30 - 17:30', 'contact'),
('saturday_hours', '09:00 - 14:00', 'contact');
