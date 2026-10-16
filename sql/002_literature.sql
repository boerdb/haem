-- Literatuur bijwerken naar de canonieke lijst in lib/literature.ts (gegenereerd)
USE haemo_db;

ALTER TABLE references_lit
  ADD COLUMN IF NOT EXISTS journal VARCHAR(256) NULL AFTER title,
  ADD COLUMN IF NOT EXISTS doi VARCHAR(128) NULL AFTER year,
  ADD COLUMN IF NOT EXISTS pmid VARCHAR(16) NULL AFTER doi;

-- Verkeerde bron: de link wees naar een ander artikel (PMID 7933611)
DELETE FROM references_lit WHERE citation_key = 'geers-1994';

INSERT INTO references_lit (citation_key, authors, title, journal, year, doi, pmid, url) VALUES
  ('bohr-1904', 'Bohr C., Hasselbalch K., Krogh A.', 'Ueber einen in biologischer Beziehung wichtigen Einfluss, den die Kohlensäurespannung des Blutes auf dessen Sauerstoffbindung übt', 'Skand Arch Physiol. 1904;16:402–412', 1904, '10.1111/j.1748-1716.1904.tb01382.x', NULL, 'https://doi.org/10.1111/j.1748-1716.1904.tb01382.x'),
  ('mwc-1965', 'Monod J., Wyman J., Changeux J.P.', 'On the nature of allosteric transitions: a plausible model', 'J Mol Biol. 1965;12:88–118', 1965, '10.1016/s0022-2836(65)80285-6', '14343300', 'https://pubmed.ncbi.nlm.nih.gov/14343300/'),
  ('benesch-1967', 'Benesch R., Benesch R.E.', 'The effect of organic phosphates from the human erythrocyte on the allosteric properties of hemoglobin', 'Biochem Biophys Res Commun. 1967;26(2):162–167', 1967, '10.1016/0006-291x(67)90228-8', '6030262', 'https://pubmed.ncbi.nlm.nih.gov/6030262/'),
  ('perutz-1970', 'Perutz M.F.', 'Stereochemistry of cooperative effects in haemoglobin', 'Nature. 1970;228(5273):726–739', 1970, '10.1038/228726a0', '5528785', 'https://pubmed.ncbi.nlm.nih.gov/5528785/'),
  ('severinghaus-1979', 'Severinghaus J.W.', 'Simple, accurate equations for human blood O₂ dissociation computations', 'J Appl Physiol. 1979;46(3):599–602', 1979, '10.1152/jappl.1979.46.3.599', '35496', 'https://pubmed.ncbi.nlm.nih.gov/35496/'),
  ('aubier-1980', 'Aubier M., Murciano D., Milic-Emili J., et al.', 'Effects of the administration of O₂ on ventilation and blood gases in patients with chronic obstructive pulmonary disease during acute respiratory failure', 'Am Rev Respir Dis. 1980;122(5):747–754', 1980, '10.1164/arrd.1980.122.5.747', '6778278', 'https://pubmed.ncbi.nlm.nih.gov/6778278/'),
  ('wright-1999', 'Wright R.O., Lewander W.J., Woolf A.D.', 'Methemoglobinemia: etiology, pharmacology, and clinical management', 'Ann Emerg Med. 1999;34(5):646–656', 1999, '10.1016/s0196-0644(99)70167-8', '10533013', 'https://pubmed.ncbi.nlm.nih.gov/10533013/'),
  ('geers-2000', 'Geers C., Gros G.', 'Carbon dioxide transport and carbonic anhydrase in blood and muscle', 'Physiol Rev. 2000;80(2):681–715', 2000, '10.1152/physrev.2000.80.2.681', '10747205', 'https://pubmed.ncbi.nlm.nih.gov/10747205/'),
  ('weaver-2002', 'Weaver L.K., Hopkins R.O., Chan K.J., et al.', 'Hyperbaric oxygen for acute carbon monoxide poisoning', 'N Engl J Med. 2002;347(14):1057–1067', 2002, '10.1056/NEJMoa013121', '12362006', 'https://pubmed.ncbi.nlm.nih.gov/12362006/'),
  ('jensen-2004', 'Jensen F.B.', 'Red blood cell pH, the Bohr effect, and other oxygenation-linked phenomena in blood O₂ and CO₂ transport', 'Acta Physiol Scand. 2004;182(3):215–227', 2004, '10.1111/j.1365-201X.2004.01361.x', '15491402', 'https://pubmed.ncbi.nlm.nih.gov/15491402/'),
  ('dash-2004', 'Dash R.K., Bassingthwaighte J.B.', 'Blood HbO₂ and HbCO₂ dissociation curves at varied O₂, CO₂, pH, 2,3-DPG and temperature levels', 'Ann Biomed Eng. 2004;32(12):1676–1693', 2004, '10.1007/s10439-004-7821-6', '15682524', 'https://pubmed.ncbi.nlm.nih.gov/15682524/'),
  ('ards-2012', 'ARDS Definition Task Force; Ranieri V.M., Rubenfeld G.D., et al.', 'Acute respiratory distress syndrome: the Berlin Definition', 'JAMA. 2012;307(23):2526–2533', 2012, '10.1001/jama.2012.5669', '22797452', 'https://pubmed.ncbi.nlm.nih.gov/22797452/'),
  ('abdo-2012', 'Abdo W.F., Heunks L.M.A.', 'Oxygen-induced hypercapnia in COPD: myths and facts', 'Crit Care. 2012;16(5):323', 2012, '10.1186/cc11475', '23106947', 'https://pubmed.ncbi.nlm.nih.gov/23106947/'),
  ('mallat-2016', 'Mallat J., Lemyze M., Tronchon L., Vallet B., Thevenin D.', 'Use of venous-to-arterial carbon dioxide tension difference to guide resuscitation therapy in septic shock', 'World J Crit Care Med. 2016;5(1):47–56', 2016, '10.5492/wjccm.v5.i1.47', '26855893', 'https://pubmed.ncbi.nlm.nih.gov/26855893/'),
  ('scott-2016', 'Scott A.V., Nagababu E., Johnson D.J., et al.', '2,3-Diphosphoglycerate concentrations in autologous salvaged versus stored red blood cells and in surgical patients after transfusion', 'Anesth Analg. 2016;122(3):616–623', 2016, '10.1213/ANE.0000000000001071', '26891388', 'https://pubmed.ncbi.nlm.nih.gov/26891388/'),
  ('west-2020', 'West J.B., Luks A.M.', 'West''s Respiratory Physiology: The Essentials (11e editie)', 'Wolters Kluwer, 2020', 2020, NULL, NULL, NULL),
  ('sjoding-2020', 'Sjoding M.W., Dickson R.P., Iwashyna T.J., Gay S.E., Valley T.S.', 'Racial bias in pulse oximetry measurement', 'N Engl J Med. 2020;383(25):2477–2478', 2020, '10.1056/NEJMc2029240', '33326721', 'https://pubmed.ncbi.nlm.nih.gov/33326721/'),
  ('mallat-2025', 'Mallat J., Jozwiak M., Orozco N., et al.', 'Use of CO₂-derived variables in critically ill patients', 'Ann Intensive Care. 2025;15(1):142', 2025, '10.1186/s13613-025-01569-2', '40999252', 'https://pubmed.ncbi.nlm.nih.gov/40999252/')
ON DUPLICATE KEY UPDATE authors = VALUES(authors), title = VALUES(title), journal = VALUES(journal),
  year = VALUES(year), doi = VALUES(doi), pmid = VALUES(pmid), url = VALUES(url);
