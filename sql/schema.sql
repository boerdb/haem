-- Haemo — gasuitwisseling & hemoglobine (MariaDB op 192.168.1.14)
CREATE DATABASE IF NOT EXISTS haemo_db
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE haemo_db;

CREATE TABLE IF NOT EXISTS parameter_presets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(64) NOT NULL UNIQUE,
  label_nl VARCHAR(128) NOT NULL,
  pH DECIMAL(3,2) NOT NULL,
  pCO2 DECIMAL(5,1) NOT NULL,
  temp_c DECIMAL(4,1) NOT NULL DEFAULT 37.0,
  bpg_mmol DECIMAL(4,2) NOT NULL DEFAULT 4.50,
  context ENUM('long', 'weefsel', 'normaal') NOT NULL DEFAULT 'normaal',
  sort_order INT NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS clinical_scenarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(64) NOT NULL UNIQUE,
  title_nl VARCHAR(256) NOT NULL,
  description_nl TEXT,
  pH DECIMAL(3,2),
  pCO2 DECIMAL(5,1),
  notes_nl TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS references_lit (
  id INT AUTO_INCREMENT PRIMARY KEY,
  citation_key VARCHAR(64) NOT NULL UNIQUE,
  authors VARCHAR(512) NOT NULL,
  title VARCHAR(512) NOT NULL,
  year SMALLINT NOT NULL,
  url VARCHAR(512)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT IGNORE INTO parameter_presets (slug, label_nl, pH, pCO2, temp_c, bpg_mmol, context, sort_order) VALUES
  ('normaal-long', 'Normaal \u2013 longcapilair', 7.45, 40.0, 37.0, 4.50, 'long', 1),
  ('normaal-weefsel', 'Normaal \u2013 weefselcapilair', 7.35, 46.0, 37.0, 4.50, 'weefsel', 2),
  ('copd', 'COPD \u2013 chronische hypercapnie', 7.32, 55.0, 37.0, 5.00, 'weefsel', 3),
  ('metabolische-alkalose', 'Metabolische alkalose', 7.50, 40.0, 37.0, 4.50, 'long', 4),
  ('inspanning', 'Inspannend weefsel', 7.25, 50.0, 39.0, 4.00, 'weefsel', 5);

INSERT IGNORE INTO clinical_scenarios (slug, title_nl, description_nl, pH, pCO2, notes_nl) VALUES
  ('bohr-weefsel', 'Bohr-effect in rustig weefsel',
   'Stijgende pCO₂ en dalende pH verlagen de O₂-affiniteit van hemoglobine, waardoor O₂ gemakkelijker aan het weefsel wordt afgegeven.',
   7.35, 46.0, 'H⁺ bindt aan histidine in de β-keten → T-stand stabieler.'),
  ('haldane-long', 'Haldane-effect in de longen',
   'Oxyhemoglobine bindt CO₂ en H⁺ minder sterk dan deoxyhemoglobine. Bij oxygenatie in de longen worden CO₂ en H⁺ vrijgegeven.',
   7.45, 40.0, 'Complementair aan het Bohr-effect.'),
  ('cl-shift', 'Chloride shift (Hamburger)',
   'HCO₃⁻ diffundeert uit de erytrocyt; Cl⁻ diffundeert naar binnen om ladingneutraliteit te handhaven.',
   NULL, NULL, 'Essentieel voor ~70% CO₂-transport als bicarbonaat.');

INSERT IGNORE INTO references_lit (citation_key, authors, title, year, url) VALUES
  ('west-2020', 'West J.B.', 'Respiratory Physiology — The Essentials', 2020, NULL),
  ('geers-1994', 'Geers C., Gross G.', 'Carbon dioxide transport and carbonic anhydrase in blood and muscle', 1994, 'https://pubmed.ncbi.nlm.nih.gov/7933611/'),
  ('dash-2004', 'Dash R.K., Bassingthwaighte J.B.', 'Blood HbO₂ and HbCO₂ dissociation curves at varied O₂, CO₂, pH, 2,3-DPG and temperature', 2004, NULL);
