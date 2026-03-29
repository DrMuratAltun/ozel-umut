-- Umut Özel Eğitim - Veritabanı Tabloları
-- Bu SQL'i Supabase Dashboard > SQL Editor'de çalıştırın

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
('Özel Eğitim', 'ozel-egitim', 'Bireysel değerlendirme sonuçlarına göre hazırlanan özel eğitim programları ile öğrencilerimizin akademik ve sosyal gelişimlerini destekliyoruz.', 'Özel eğitim programlarımız, her öğrencinin bireysel ihtiyaçlarına göre özel olarak tasarlanmaktadır. Uzman eğitimcilerimiz, bilimsel yöntemler ve güncel yaklaşımlar kullanarak öğrencilerimizin akademik, sosyal ve duygusal gelişimlerini desteklemektedir.

Bireysel Eğitim Planları (BEP) çerçevesinde, her öğrencimiz için özel hedefler belirleniyor ve düzenli olarak ilerleme değerlendirmesi yapılmaktadır.', 'BookOpen', 1),
('Dil ve Konuşma Terapisi', 'dil-ve-konusma-terapisi', 'Dil gecikmesi, artikülasyon bozuklukları, kekemelik ve iletişim güçlüklerinde uzman terapistlerimizle destek sağlıyoruz.', 'Dil ve konuşma terapisi programımız, iletişim güçlüğü yaşayan bireylere kapsamlı destek sunmaktadır. Uzman dil ve konuşma terapistlerimiz, dil gecikmesi, artikülasyon bozuklukları, kekemelik, ses bozuklukları ve pragmatik dil sorunlarında etkili terapi programları uygulamaktadır.', 'MessageCircle', 2),
('Fizyoterapi', 'fizyoterapi', 'Motor gelişim geriliği, serebral palsi ve bedensel yetersizliklerde fiziksel rehabilitasyon programları uyguluyoruz.', 'Fizyoterapi birimimizde, motor gelişim geriliği, serebral palsi, müsküler distrofi ve diğer bedensel yetersizliklerde uzmanlaşmış fizyoterapistlerimiz görev yapmaktadır. Bireysel değerlendirme sonuçlarına göre hazırlanan rehabilitasyon programları ile hastalarımızın fiziksel kapasitelerini en üst düzeye çıkarmak hedeflenmektedir.', 'Activity', 3),
('Psikolojik Danışmanlık', 'psikolojik-danismanlik', 'Çocuk ve aile odaklı psikolojik değerlendirme, terapi ve danışmanlık hizmetleri sunuyoruz.', 'Psikolojik danışmanlık birimimizde, çocuk ve ergen psikolojisi alanında uzman psikologlarımız görev yapmaktadır. Oyun terapisi, bilişsel davranışçı terapi ve aile danışmanlığı gibi bilimsel yöntemlerle çocuklarımızın duygusal ve davranışsal gelişimlerini destekliyoruz.', 'Brain', 4),
('Ergoterapi', 'ergoterapi', 'Günlük yaşam aktiviteleri, ince motor beceriler ve duyusal bütünleme terapisi ile bağımsızlık kazandırıyoruz.', 'Ergoterapi programımız, bireylerin günlük yaşam aktivitelerinde bağımsızlık kazanmalarına yardımcı olmaktadır. İnce motor beceriler, el-göz koordinasyonu, duyusal bütünleme ve öz bakım becerileri gibi alanlarda uzman ergoterapistlerimiz tarafından bireysel terapi programları uygulanmaktadır.', 'Hand', 5),
('Odyoloji', 'odyoloji', 'İşitme değerlendirmesi, işitme cihazı uygulamaları ve işitme engelli bireylere yönelik destek programları sunuyoruz.', 'Odyoloji birimimizde, işitme değerlendirmesi, işitme cihazı uyumlandırması ve işitsel rehabilitasyon programları sunulmaktadır. İşitme kaybı olan bireylerin iletişim becerilerinin geliştirilmesi ve toplumsal katılımlarının desteklenmesi hedeflenmektedir.', 'Ear', 6);

-- Seed data: Programs
INSERT INTO programs (title, slug, short_description, target_group, features, sort_order) VALUES
('Zihinsel Yetersizlik Desteği', 'zihinsel-yetersizlik-destegi', 'Zihinsel gelişim geriliği olan bireylere yönelik bireysel eğitim programları.', '3-18 Yaş', ARRAY['Bireysel eğitim planı', 'Günlük yaşam becerileri', 'Sosyal uyum çalışmaları', 'Akademik destek', 'Aile rehberliği'], 1),
('Otizm Spektrum Bozukluğu Desteği', 'otizm-spektrum-bozuklugu-destegi', 'Otizm spektrum bozukluğu teşhisi almış bireylere özel yapılandırılmış eğitim.', '2-18 Yaş', ARRAY['ABA terapi', 'Sosyal beceri eğitimi', 'İletişim desteği', 'Duyusal bütünleme', 'Yapılandırılmış eğitim'], 2),
('Öğrenme Güçlüğü Desteği', 'ogrenme-guclugu-destegi', 'Disleksi, diskalkuli ve diğer öğrenme güçlüklerinde akademik destek.', '6-18 Yaş', ARRAY['Okuma-yazma desteği', 'Matematik desteği', 'Dikkat çalışmaları', 'Çalışma becerileri', 'Sınav stratejileri'], 3),
('Dil ve Konuşma Bozuklukları Desteği', 'dil-konusma-bozukluklari-destegi', 'Dil gecikmesi, artikülasyon ve akıcılık bozukluklarında uzman terapi.', '2-18 Yaş', ARRAY['Dil terapisi', 'Artikülasyon çalışmaları', 'Pragmatik dil', 'Akıcılık terapisi', 'Alternatif iletişim'], 4),
('Bedensel Yetersizlik Desteği', 'bedensel-yetersizlik-destegi', 'Bedensel engelli bireylere yönelik fiziksel rehabilitasyon ve eğitim.', '3-18 Yaş', ARRAY['Fizyoterapi', 'Motor gelişim', 'Adaptif beceriler', 'Yardımcı teknoloji', 'Postüral destek'], 5),
('İşitme Yetersizlik Desteği', 'isitme-yetersizlik-destegi', 'İşitme engelli bireylere yönelik işitsel eğitim ve iletişim desteği.', '2-18 Yaş', ARRAY['İşitsel eğitim', 'Dudak okuma', 'İşaret dili', 'İşitme cihazı uyumu', 'Konuşma terapisi'], 6);

-- Seed data: Testimonials
INSERT INTO testimonials (name, relation, content, rating, sort_order) VALUES
('Ayşe K.', 'Veli', 'Çocuğumuzun gelişiminde inanılmaz bir ilerleme kaydettik. Öğretmenler çok ilgili ve alakalı. Her gün okula gitmek istiyor artık.', 5, 1),
('Mehmet Y.', 'Veli', 'Dil ve konuşma terapisi sonuçlarını kısa sürede görmeye başladık. Profesyonel kadro ve sıcak ortam için teşekkür ediyoruz.', 5, 2),
('Fatma D.', 'Veli', 'Umut Özel Eğitim ailesi gerçekten adına yaraşıyor. Çocuklarımıza umut aşılıyor burada. Herkese gönül rahatlığıyla tavsiye ederim.', 5, 3);

-- Seed data: Site Settings
INSERT INTO site_settings (key, value, "group") VALUES
('phone', '0242 643 01 45', 'contact'),
('email', 'info@ozelegitimumut.com', 'contact'),
('address', 'Korkuteli, Antalya', 'contact'),
('whatsapp', '902426430145', 'contact'),
('weekday_hours', '08:30 - 17:30', 'contact'),
('saturday_hours', '09:00 - 14:00', 'contact');
