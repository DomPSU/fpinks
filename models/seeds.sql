-- Users
INSERT INTO Users (email, username, password, level, approved, created_at, updated_at)
VALUES ('dominiclupo5318@gmail.com', 'DomFPinks', 'password0', 'admin', 1, NOW(), NOW());
INSERT INTO Users (email, username, password, level, approved, created_at, updated_at)
VALUES ('fake1@gmail.com', 'fakeUserName1', 'password1', 'user', 1, NOW(), NOW());
INSERT INTO Users (email, username, password, level, approved, created_at, updated_at)
VALUES ('fake2@gmail.com', 'fakeUsername2', 'password2', 'user', 0, NOW(), NOW());

-- Inks
INSERT INTO Inks (brand, name, approved, created_at, updated_at)
VALUES ('parker quink', 'blue', 1, NOW(), NOW());
INSERT INTO Inks (brand, name, approved, created_at, updated_at)
VALUES ('pilot iroshizuku', 'momiji', 1, NOW(), NOW());
INSERT INTO Inks (brand, name, approved, created_at, updated_at)
VALUES ('diamine', 'ancient copper', 1, NOW(), NOW());
INSERT INTO Inks (brand, name, approved, created_at, updated_at)
VALUES ('noodler''s ink', 'air-corp blue-black', 1, NOW(), NOW());
INSERT INTO Inks (brand, name, approved, created_at, updated_at)
VALUES ('noodler''s ink', 'apache sunset', 1, NOW(), NOW());
INSERT INTO Inks (brand, name, approved, created_at, updated_at)
VALUES ('noodler''s ink', 'bernanke blue', 1, NOW(), NOW());

-- Papers
INSERT INTO Papers (brand, name, style, lbs, grams, approved, created_at, updated_at) 
VALUES ('amazon', 'printer', 'plain', '20', NULL, 1, NOW(), NOW());
INSERT INTO Papers (brand, name, style, lbs, grams, approved, created_at, updated_at) 
VALUES ('amazon', 'notebook', 'lined', NULL, '56', 1, NOW(), NOW());
INSERT INTO Papers (brand, name, style, lbs, grams, approved, created_at, updated_at) 
VALUES ('clairefontaine', NULL, 'grid', NULL, NULL, 1, NOW(), NOW());
INSERT INTO Papers (brand, name, style, lbs, grams, approved, created_at, updated_at) 
VALUES ('mnemosyne', NULL, 'lined', NULL, NULL, 1, NOW(), NOW());
INSERT INTO Papers (brand, name, style, lbs, grams, approved, created_at, updated_at) 
VALUES ('rhodia', NULL, 'dot', NULL, NULL, 1, NOW(), NOW());
INSERT INTO Papers (brand, name, style, lbs, grams, approved, created_at, updated_at) 
VALUES ('mead', 'notebook', 'lined', NULL, NULL, 1, NOW(), NOW());

-- Pens
INSERT INTO Pens (brand, model, approved, created_at, updated_at)
VALUES ('pelikan', 'souveran m400', 1, NOW(), NOW());
INSERT INTO Pens (brand, model, approved, created_at, updated_at)
VALUES ('pilot', 'metropolitan', 1, NOW(), NOW());
INSERT INTO Pens (brand, model, approved, created_at, updated_at)
VALUES ('noodler''s ink', 'konrad', 1, NOW(), NOW());
INSERT INTO Pens (brand, model, approved, created_at, updated_at)
VALUES ('aurora', 'ipsilon', 1, NOW(), NOW());

-- Nibs
INSERT INTO Nibs (size, grind, tune, approved, created_at, updated_at)
VALUES ('f', 'standard', 'factory', 1, NOW(), NOW());
INSERT INTO Nibs (size, grind, tune, approved, created_at, updated_at)
VALUES ('m', 'standard', 'factory', 1, NOW(), NOW());
INSERT INTO Nibs (size, grind, tune, approved, created_at, updated_at)
VALUES ('b', 'standard', 'factory', 1, NOW(), NOW());
INSERT INTO Nibs (size, grind, tune, approved, created_at, updated_at)
VALUES ('flex', 'standard', 'factory', 1, NOW(), NOW());
INSERT INTO Nibs (size, grind, tune, approved, created_at, updated_at)
VALUES ('b', 'italic', 'factory', 1, NOW(), NOW());
INSERT INTO Nibs (size, grind, tune, approved, created_at, updated_at)
VALUES ('m', 'italic', 'custom', 1, NOW(), NOW());

-- PenNibs
INSERT INTO PenNibs (pen_id, nib_id, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pelikan' AND model = 'souveran m400'),
       (SELECT nib_id FROM Nibs WHERE size = 'b' AND grind = 'standard' AND tune = 'factory'), 
       1, NOW(), NOW());
INSERT INTO PenNibs (pen_id, nib_id, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pilot' AND model = 'metropolitan'),
       (SELECT nib_id FROM Nibs WHERE size = 'f' AND grind = 'standard' AND tune = 'factory'), 
       1, NOW(), NOW());
INSERT INTO PenNibs (pen_id, nib_id, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pilot' AND model = 'metropolitan'),
       (SELECT nib_id FROM Nibs WHERE size = 'm' AND grind = 'standard' AND tune = 'factory'), 
       1, NOW(), NOW());
INSERT INTO PenNibs (pen_id, nib_id, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pilot' AND model = 'metropolitan'),
       (SELECT nib_id FROM Nibs WHERE size = 'b' AND grind = 'italic' AND tune = 'factory'), 
       1, NOW(), NOW());
INSERT INTO PenNibs (pen_id, nib_id, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'noodler''s ink' AND model = 'konrad'),
       (SELECT nib_id FROM Nibs WHERE size = 'm' AND grind = 'standard' AND tune = 'factory'), 
       1, NOW(), NOW());
INSERT INTO PenNibs (pen_id, nib_id, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'noodler''s ink' AND model = 'konrad'),
       (SELECT nib_id FROM Nibs WHERE size = 'flex' AND grind = 'standard' AND tune = 'factory'), 
       1, NOW(), NOW());
INSERT INTO PenNibs (pen_id, nib_id, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'aurora' AND model = 'ipsilon'),
       (SELECT nib_id FROM Nibs WHERE size = 'm' AND grind = 'standard' AND tune = 'factory'), 
       1, NOW(), NOW());

-- All Writing Samples

-- Writing Samples Momiji Pilot Metropolitan M
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pilot' AND model = 'metropolitan'),
       (SELECT nib_id FROM Nibs WHERE size = 'm' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'pilot iroshizuku' AND name = 'momiji'),
       (SELECT paper_id FROM Papers WHERE brand = 'clairefontaine' AND name IS NULL AND style = 'grid' AND lbs IS NULL AND grams IS NULL),
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/iroshizuku_momiji_pilot_metropolitan_m_clairefontaine.jpg',
       'high_res/iroshizuku_momiji_pilot_metropolitan_m_clairefontaine.jpg',
       'original/iroshizuku_momiji_pilot_metropolitan_m_clairefontaine.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pilot' AND model = 'metropolitan'),
       (SELECT nib_id FROM Nibs WHERE size = 'm' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'pilot iroshizuku' AND name = 'momiji'),
       (SELECT paper_id FROM Papers WHERE brand = 'mnemosyne' AND name IS NULL AND style = 'lined' AND lbs IS NULL AND grams IS NULL), 
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/iroshizuku_momiji_pilot_metropolitan_m_mnemosyne.jpg', 
       'high_res/iroshizuku_momiji_pilot_metropolitan_m_mnemosyne.jpg', 
       'original/iroshizuku_momiji_pilot_metropolitan_m_mnemosyne.jpg', 
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pilot' AND model = 'metropolitan'),
       (SELECT nib_id FROM Nibs WHERE size = 'm' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'pilot iroshizuku' AND name = 'momiji'),
       (SELECT paper_id FROM Papers WHERE brand = 'rhodia' AND name IS NULL AND style = 'dot' AND lbs IS NULL AND grams IS NULL), 
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/iroshizuku_momiji_pilot_metropolitan_m_rhodia.jpg', 
       'high_res/iroshizuku_momiji_pilot_metropolitan_m_rhodia.jpg',
       'original/iroshizuku_momiji_pilot_metropolitan_m_rhodia.jpg', 
       1, 1, 1 ,1 , NOW(), NOW());

-- Writing Samples Noodler's Ink Apache Sunset Pilot Metropolitan B
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pilot' AND model = 'metropolitan'),
       (SELECT nib_id FROM Nibs WHERE size = 'b' AND grind = 'italic' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'noodler''s ink' AND name = 'apache sunset'),
       (SELECT paper_id FROM Papers WHERE brand = 'clairefontaine' AND name IS NULL AND style = 'grid' AND lbs IS NULL AND grams IS NULL), 
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/noodlers_ink_apache_sunset_pilot_metropolitan_b_clairefontaine.jpg',
       'high_res/noodlers_ink_apache_sunset_pilot_metropolitan_b_clairefontaine.jpg',
       'original/noodlers_ink_apache_sunset_pilot_metropolitan_b_clairefontaine.jpg', 
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pilot' AND model = 'metropolitan'),
       (SELECT nib_id FROM Nibs WHERE size = 'b' AND grind = 'italic' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'noodler''s ink' AND name = 'apache sunset'),
       (SELECT paper_id FROM Papers WHERE brand = 'mnemosyne' AND name IS NULL AND style = 'lined' AND lbs IS NULL AND grams IS NULL), 
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/noodlers_ink_apache_sunset_pilot_metropolitan_b_mnemosyne.jpg',
       'high_res/noodlers_ink_apache_sunset_pilot_metropolitan_b_mnemosyne.jpg',
       'original/noodlers_ink_apache_sunset_pilot_metropolitan_b_mnemosyne.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pilot' AND model = 'metropolitan'),
       (SELECT nib_id FROM Nibs WHERE size = 'b' AND grind = 'italic' AND tune = 'factory'), 
       (SELECT ink_id FROM Inks WHERE brand = 'noodler''s ink' AND name = 'apache sunset'),
       (SELECT paper_id FROM Papers WHERE brand = 'rhodia' AND name IS NULL AND style = 'dot' AND lbs IS NULL AND grams IS NULL), 
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/noodlers_ink_apache_sunset_pilot_metropolitan_b_rhodia.jpg',
       'high_res/noodlers_ink_apache_sunset_pilot_metropolitan_b_rhodia.jpg',
       'original/noodlers_ink_apache_sunset_pilot_metropolitan_b_rhodia.jpg',
       1, 1, 1, 1, NOW(), NOW());

-- Writing Samples Noodler's Ink Bernanke Blue Pilot Metropolitan F
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pilot' AND model = 'metropolitan'),
       (SELECT nib_id FROM Nibs WHERE size = 'f' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'noodler''s ink' AND name = 'bernanke blue'),
       (SELECT paper_id FROM Papers WHERE brand = 'clairefontaine' AND name IS NULL AND style = 'grid' AND lbs IS NULL AND grams IS NULL), 
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/noodlers_ink_bernanke_blue_pilot_metropolitan_f_clairefontaine.jpg',
       'high_res/noodlers_ink_bernanke_blue_pilot_metropolitan_f_clairefontaine.jpg',
       'original/noodlers_ink_bernanke_blue_pilot_metropolitan_f_clairefontaine.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pilot' AND model = 'metropolitan'),
       (SELECT nib_id FROM Nibs WHERE size = 'f' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'noodler''s ink' AND name = 'bernanke blue'),
       (SELECT paper_id FROM Papers WHERE brand = 'mnemosyne' AND name IS NULL AND style = 'lined' AND lbs IS NULL AND grams IS NULL), 
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/noodlers_ink_bernanke_blue_pilot_metropolitan_f_mnemosyne.jpg',
       'high_res/noodlers_ink_bernanke_blue_pilot_metropolitan_f_mnemosyne.jpg',
       'original/noodlers_ink_bernanke_blue_pilot_metropolitan_f_mnemosyne.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pilot' AND model = 'metropolitan'),
       (SELECT nib_id FROM Nibs WHERE size = 'f' AND grind = 'standard' AND tune = 'factory'), 
       (SELECT ink_id FROM Inks WHERE brand = 'noodler''s ink' AND name = 'bernanke blue'),
       (SELECT paper_id FROM Papers WHERE brand = 'rhodia' AND name IS NULL AND style = 'dot' AND lbs IS NULL AND grams IS NULL), 
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/noodlers_ink_bernanke_blue_pilot_metropolitan_f_rhodia.jpg',
       'high_res/noodlers_ink_bernanke_blue_pilot_metropolitan_f_rhodia.jpg',
       'original/noodlers_ink_bernanke_blue_pilot_metropolitan_f_rhodia.jpg',
       1, 1, 1, 1, NOW(), NOW());

-- Writing Samples Parker Quink Blue Aurora Ipsilon M
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'aurora' AND model = 'ipsilon'),
       (SELECT nib_id FROM Nibs WHERE size = 'm' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'parker quink' AND name = 'blue'),
       (SELECT paper_id FROM Papers WHERE brand = 'clairefontaine' AND name IS NULL AND style = 'grid' AND lbs IS NULL AND grams IS NULL), 
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/parker_quink_blue_aurora_ipsilon_italia_150_m_clairefontaine.jpg',
       'high_res/parker_quink_blue_aurora_ipsilon_italia_150_m_clairefontaine.jpg',
       'original/parker_quink_blue_aurora_ipsilon_italia_150_m_clairefontaine.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'aurora' AND model = 'ipsilon'),
       (SELECT nib_id FROM Nibs WHERE size = 'm' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'parker quink' AND name = 'blue'),
       (SELECT paper_id FROM Papers WHERE brand = 'mnemosyne' AND name IS NULL AND style = 'lined' AND lbs IS NULL AND grams IS NULL), 
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/parker_quink_blue_aurora_ipsilon_italia_150_m_mnemosyne.jpg',
       'high_res/parker_quink_blue_aurora_ipsilon_italia_150_m_mnemosyne.jpg',
       'original/parker_quink_blue_aurora_ipsilon_italia_150_m_mnemosyne.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'aurora' AND model = 'ipsilon'),
       (SELECT nib_id FROM Nibs WHERE size = 'm' AND grind = 'standard' AND tune = 'factory'), 
       (SELECT ink_id FROM Inks WHERE brand = 'parker quink' AND name = 'blue'),
       (SELECT paper_id FROM Papers WHERE brand = 'rhodia' AND name IS NULL AND style = 'dot' AND lbs IS NULL AND grams IS NULL), 
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/parker_quink_blue_aurora_ipsilon_italia_150_m_rhodia.jpg',
       'high_res/parker_quink_blue_aurora_ipsilon_italia_150_m_rhodia.jpg',
       'original/parker_quink_blue_aurora_ipsilon_italia_150_m_rhodia.jpg',
       1, 1, 1, 1, NOW(), NOW());

-- Writing Samples Diamine Ancient Copper Pelikan Souveran M400 B
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pelikan' AND model = 'souveran m400'),
       (SELECT nib_id FROM Nibs WHERE size = 'b' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'diamine' AND name = 'ancient copper'),
       (SELECT paper_id FROM Papers WHERE brand = 'amazon' AND name = 'printer' AND style = 'plain' AND lbs = '20' AND grams IS NULL), 
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/diamine_ancient_copper_pelikan_souveran_m400_b_amazon_20lb_printer.jpg',
       'high_res/diamine_ancient_copper_pelikan_souveran_m400_b_amazon_20lb_printer.jpg',
       'original/diamine_ancient_copper_pelikan_souveran_m400_b_amazon_20lb_printer.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pelikan' AND model = 'souveran m400'),
       (SELECT nib_id FROM Nibs WHERE size = 'b' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'diamine' AND name = 'ancient copper'),
       (SELECT paper_id FROM Papers WHERE brand = 'amazon' AND name = 'notebook' AND style = 'lined' AND lbs IS NULL AND grams = '56'), 
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/diamine_ancient_copper_pelikan_souveran_m400_b_amazon_56_gsm.jpg',
       'high_res/diamine_ancient_copper_pelikan_souveran_m400_b_amazon_56_gsm.jpg',
       'original/diamine_ancient_copper_pelikan_souveran_m400_b_amazon_56_gsm.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pelikan' AND model = 'souveran m400'),
       (SELECT nib_id FROM Nibs WHERE size = 'b' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'diamine' AND name = 'ancient copper'),
       (SELECT paper_id FROM Papers WHERE brand = 'clairefontaine' AND name IS NULL AND style = 'grid' AND lbs IS NULL AND grams IS NULL), 
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/diamine_ancient_copper_pelikan_souveran_m400_b_clairefontaine.jpg',
       'high_res/diamine_ancient_copper_pelikan_souveran_m400_b_clairefontaine.jpg',
       'original/diamine_ancient_copper_pelikan_souveran_m400_b_clairefontaine.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pelikan' AND model = 'souveran m400'),
       (SELECT nib_id FROM Nibs WHERE size = 'b' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'diamine' AND name = 'ancient copper'),
       (SELECT paper_id FROM Papers WHERE brand = 'mead' AND name = 'notebook' AND style = 'lined' AND lbs IS NULL AND grams IS NULL), 
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/diamine_ancient_copper_pelikan_souveran_m400_b_mead_spiral_notebook.jpg',
       'high_res/diamine_ancient_copper_pelikan_souveran_m400_b_mead_spiral_notebook.jpg',
       'original/diamine_ancient_copper_pelikan_souveran_m400_b_mead_spiral_notebook.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pelikan' AND model = 'souveran m400'),
       (SELECT nib_id FROM Nibs WHERE size = 'b' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'diamine' AND name = 'ancient copper'),
       (SELECT paper_id FROM Papers WHERE brand = 'mnemosyne' AND name IS NULL AND style = 'lined' AND lbs IS NULL AND grams IS NULL), 
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/diamine_ancient_copper_pelikan_souveran_m400_b_mnemosyne.jpg',
       'high_res/diamine_ancient_copper_pelikan_souveran_m400_b_mnemosyne.jpg',
       'original/diamine_ancient_copper_pelikan_souveran_m400_b_mnemosyne.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pelikan' AND model = 'souveran m400'),
       (SELECT nib_id FROM Nibs WHERE size = 'b' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'diamine' AND name = 'ancient copper'),
       (SELECT paper_id FROM Papers WHERE brand = 'rhodia' AND name IS NULL AND style = 'dot' AND lbs IS NULL AND grams IS NULL), 
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/diamine_ancient_copper_pelikan_souveran_m400_b_rhodia.jpg',
       'high_res/diamine_ancient_copper_pelikan_souveran_m400_b_rhodia.jpg',
       'original/diamine_ancient_copper_pelikan_souveran_m400_b_rhodia.jpg',
       1, 1, 1, 1, NOW(), NOW());

-- Writing Samples Noodler's Ink Air-Corp Blue-Black Noodler's Ink Konrad Flex
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'noodler''s ink' AND model = 'konrad'),
       (SELECT nib_id FROM Nibs WHERE size = 'flex' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'noodler''s ink' AND name = 'air-corp blue-black'),
       (SELECT paper_id FROM Papers WHERE brand = 'amazon' AND name = 'printer' AND style = 'plain' AND lbs = '20' AND grams IS NULL), 
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/noodlers_ink_air-corp_blue-black_noodlers_ink_konrad_flex_amazon_20lb_printer.jpg',
       'high_res/noodlers_ink_air-corp_blue-black_noodlers_ink_konrad_flex_amazon_20lb_printer.jpg',
       'original/noodlers_ink_air-corp_blue-black_noodlers_ink_konrad_flex_amazon_20lb_printer.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'noodler''s ink' AND model = 'konrad'),
       (SELECT nib_id FROM Nibs WHERE size = 'flex' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'noodler''s ink' AND name = 'air-corp blue-black'),
       (SELECT paper_id FROM Papers WHERE brand = 'amazon' AND name = 'notebook' AND style = 'lined' AND lbs IS NULL AND grams = '56'),
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/noodlers_ink_air-corp_blue-black_noodlers_ink_konrad_flex_amazon_56_gsm.jpg',
       'high_res/noodlers_ink_air-corp_blue-black_noodlers_ink_konrad_flex_amazon_56_gsm.jpg',
       'original/noodlers_ink_air-corp_blue-black_noodlers_ink_konrad_flex_amazon_56_gsm.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'noodler''s ink' AND model = 'konrad'),
       (SELECT nib_id FROM Nibs WHERE size = 'flex' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'noodler''s ink' AND name = 'air-corp blue-black'),
       (SELECT paper_id FROM Papers WHERE brand = 'clairefontaine' AND name IS NULL AND style = 'grid' AND lbs IS NULL AND grams IS NULL), 
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/noodlers_ink_air-corp_blue-black_noodlers_ink_konrad_flex_clairefontaine.jpg',
       'high_res/noodlers_ink_air-corp_blue-black_noodlers_ink_konrad_flex_clairefontaine.jpg',
       'original/noodlers_ink_air-corp_blue-black_noodlers_ink_konrad_flex_clairefontaine.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'noodler''s ink' AND model = 'konrad'),
       (SELECT nib_id FROM Nibs WHERE size = 'flex' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'noodler''s ink' AND name = 'air-corp blue-black'),
       (SELECT paper_id FROM Papers WHERE brand = 'mead' AND name = 'notebook' AND style = 'lined' AND lbs IS NULL AND grams IS NULL),
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/noodlers_ink_air-corp_blue-black_noodlers_ink_konrad_flex_mead_spiral_notebook.jpg',
       'high_res/noodlers_ink_air-corp_blue-black_noodlers_ink_konrad_flex_mead_spiral_notebook.jpg',
       'original/noodlers_ink_air-corp_blue-black_noodlers_ink_konrad_flex_mead_spiral_notebook.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'noodler''s ink' AND model = 'konrad'),
       (SELECT nib_id FROM Nibs WHERE size = 'flex' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'noodler''s ink' AND name = 'air-corp blue-black'),
       (SELECT paper_id FROM Papers WHERE brand = 'mnemosyne' AND name IS NULL AND style = 'lined' AND lbs IS NULL AND grams IS NULL),
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/noodlers_ink_air-corp_blue-black_noodlers_ink_konrad_flex_mnemosyne.jpg',
       'high_res/noodlers_ink_air-corp_blue-black_noodlers_ink_konrad_flex_mnemosyne.jpg',
       'original/noodlers_ink_air-corp_blue-black_noodlers_ink_konrad_flex_mnemosyne.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'noodler''s ink' AND model = 'konrad'),
       (SELECT nib_id FROM Nibs WHERE size = 'flex' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'noodler''s ink' AND name = 'air-corp blue-black'),
       (SELECT paper_id FROM Papers WHERE brand = 'rhodia' AND name IS NULL AND style = 'dot' AND lbs IS NULL AND grams IS NULL),
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/noodlers_ink_air-corp_blue-black_noodlers_ink_konrad_flex_rhodia.jpg',
       'high_res/noodlers_ink_air-corp_blue-black_noodlers_ink_konrad_flex_rhodia.jpg',
       'original/noodlers_ink_air-corp_blue-black_noodlers_ink_konrad_flex_rhodia.jpg',
       1, 1, 1, 1, NOW(), NOW());

-- Writing Samples Noodler's Ink Air-Corp Blue-Black Noodler's Ink Konrad M
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'noodler''s ink' AND model = 'konrad'),
       (SELECT nib_id FROM Nibs WHERE size = 'm' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'noodler''s ink' AND name = 'air-corp blue-black'),
       (SELECT paper_id FROM Papers WHERE brand = 'amazon' AND name = 'printer' AND style = 'plain' AND lbs = '20' AND grams IS NULL), 
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/noodlers_ink_air-corp_blue-black_noodlers_ink_konrad_m_amazon_20lb_printer.jpg',
       'high_res/noodlers_ink_air-corp_blue-black_noodlers_ink_konrad_m_amazon_20lb_printer.jpg',
       'original/noodlers_ink_air-corp_blue-black_noodlers_ink_konrad_m_amazon_20lb_printer.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'noodler''s ink' AND model = 'konrad'),
       (SELECT nib_id FROM Nibs WHERE size = 'm' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'noodler''s ink' AND name = 'air-corp blue-black'),
       (SELECT paper_id FROM Papers WHERE brand = 'amazon' AND name = 'notebook' AND style = 'lined' AND lbs IS NULL AND grams = '56'),
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/noodlers_ink_air-corp_blue-black_noodlers_ink_konrad_m_amazon_56_gsm.jpg',
       'high_res/noodlers_ink_air-corp_blue-black_noodlers_ink_konrad_m_amazon_56_gsm.jpg',
       'original/noodlers_ink_air-corp_blue-black_noodlers_ink_konrad_m_amazon_56_gsm.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'noodler''s ink' AND model = 'konrad'),
       (SELECT nib_id FROM Nibs WHERE size = 'm' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'noodler''s ink' AND name = 'air-corp blue-black'),
       (SELECT paper_id FROM Papers WHERE brand = 'clairefontaine' AND name IS NULL AND style = 'grid' AND lbs IS NULL AND grams IS NULL), 
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/noodlers_ink_air-corp_blue-black_noodlers_ink_konrad_m_clairefontaine.jpg',
       'high_res/noodlers_ink_air-corp_blue-black_noodlers_ink_konrad_m_clairefontaine.jpg',
       'original/noodlers_ink_air-corp_blue-black_noodlers_ink_konrad_m_clairefontaine.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'noodler''s ink' AND model = 'konrad'),
       (SELECT nib_id FROM Nibs WHERE size = 'm' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'noodler''s ink' AND name = 'air-corp blue-black'),
       (SELECT paper_id FROM Papers WHERE brand = 'mead' AND name = 'notebook' AND style = 'lined' AND lbs IS NULL AND grams IS NULL),
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/noodlers_ink_air-corp_blue-black_noodlers_ink_konrad_m_mead_spiral_notebook.jpg',
       'high_res/noodlers_ink_air-corp_blue-black_noodlers_ink_konrad_m_mead_spiral_notebook.jpg',
       'original/noodlers_ink_air-corp_blue-black_noodlers_ink_konrad_m_mead_spiral_notebook.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'noodler''s ink' AND model = 'konrad'),
       (SELECT nib_id FROM Nibs WHERE size = 'm' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'noodler''s ink' AND name = 'air-corp blue-black'),
       (SELECT paper_id FROM Papers WHERE brand = 'mnemosyne' AND name IS NULL AND style = 'lined' AND lbs IS NULL AND grams IS NULL),
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/noodlers_ink_air-corp_blue-black_noodlers_ink_konrad_m_mnemosyne.jpg',
       'high_res/noodlers_ink_air-corp_blue-black_noodlers_ink_konrad_m_mnemosyne.jpg',
       'original/noodlers_ink_air-corp_blue-black_noodlers_ink_konrad_m_mnemosyne.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'noodler''s ink' AND model = 'konrad'),
       (SELECT nib_id FROM Nibs WHERE size = 'm' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'noodler''s ink' AND name = 'air-corp blue-black'),
       (SELECT paper_id FROM Papers WHERE brand = 'rhodia' AND name IS NULL AND style = 'dot' AND lbs IS NULL AND grams IS NULL),
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/noodlers_ink_air-corp_blue-black_noodlers_ink_konrad_m_rhodia.jpg',
       'high_res/noodlers_ink_air-corp_blue-black_noodlers_ink_konrad_m_rhodia.jpg',
       'original/noodlers_ink_air-corp_blue-black_noodlers_ink_konrad_m_rhodia.jpg',
       1, 1, 1, 1, NOW(), NOW());

-- Writing Samples Noodler's Ink Air-Corp Blue-Black Noodler's Pilot Metropolitan B
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pilot' AND model = 'metropolitan'),
       (SELECT nib_id FROM Nibs WHERE size = 'b' AND grind = 'italic' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'noodler''s ink' AND name = 'air-corp blue-black'),
       (SELECT paper_id FROM Papers WHERE brand = 'amazon' AND name = 'printer' AND style = 'plain' AND lbs = '20' AND grams IS NULL), 
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/noodlers_ink_air-corp_blue-black_pilot_metropolitan_b_amazon_20lb_printer.jpg',
       'high_res/noodlers_ink_air-corp_blue-black_pilot_metropolitan_b_amazon_20lb_printer.jpg',
       'original/noodlers_ink_air-corp_blue-black_pilot_metropolitan_b_amazon_20lb_printer.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pilot' AND model = 'metropolitan'),
       (SELECT nib_id FROM Nibs WHERE size = 'b' AND grind = 'italic' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'noodler''s ink' AND name = 'air-corp blue-black'),
       (SELECT paper_id FROM Papers WHERE brand = 'amazon' AND name = 'notebook' AND style = 'lined' AND lbs IS NULL AND grams = '56'),
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/noodlers_ink_air-corp_blue-black_pilot_metropolitan_b_amazon_56_gsm.jpg',
       'high_res/noodlers_ink_air-corp_blue-black_pilot_metropolitan_b_amazon_56_gsm.jpg',
       'original/noodlers_ink_air-corp_blue-black_pilot_metropolitan_b_amazon_56_gsm.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pilot' AND model = 'metropolitan'),
       (SELECT nib_id FROM Nibs WHERE size = 'b' AND grind = 'italic' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'noodler''s ink' AND name = 'air-corp blue-black'),
       (SELECT paper_id FROM Papers WHERE brand = 'clairefontaine' AND name IS NULL AND style = 'grid' AND lbs IS NULL AND grams IS NULL), 
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/noodlers_ink_air-corp_blue-black_pilot_metropolitan_b_clairefontaine.jpg',
       'high_res/noodlers_ink_air-corp_blue-black_pilot_metropolitan_b_clairefontaine.jpg',
       'original/noodlers_ink_air-corp_blue-black_pilot_metropolitan_b_clairefontaine.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pilot' AND model = 'metropolitan'),
       (SELECT nib_id FROM Nibs WHERE size = 'b' AND grind = 'italic' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'noodler''s ink' AND name = 'air-corp blue-black'),
       (SELECT paper_id FROM Papers WHERE brand = 'mead' AND name = 'notebook' AND style = 'lined' AND lbs IS NULL AND grams IS NULL),
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/noodlers_ink_air-corp_blue-black_pilot_metropolitan_b_mead_spiral_notebook.jpg',
       'high_res/noodlers_ink_air-corp_blue-black_pilot_metropolitan_b_mead_spiral_notebook.jpg',
       'original/noodlers_ink_air-corp_blue-black_pilot_metropolitan_b_mead_spiral_notebook.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pilot' AND model = 'metropolitan'),
       (SELECT nib_id FROM Nibs WHERE size = 'b' AND grind = 'italic' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'noodler''s ink' AND name = 'air-corp blue-black'),
       (SELECT paper_id FROM Papers WHERE brand = 'mnemosyne' AND name IS NULL AND style = 'lined' AND lbs IS NULL AND grams IS NULL),
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/noodlers_ink_air-corp_blue-black_pilot_metropolitan_b_mnemosyne.jpg',
       'high_res/noodlers_ink_air-corp_blue-black_pilot_metropolitan_b_mnemosyne.jpg',
       'original/noodlers_ink_air-corp_blue-black_pilot_metropolitan_b_mnemosyne.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pilot' AND model = 'metropolitan'),
       (SELECT nib_id FROM Nibs WHERE size = 'b' AND grind = 'italic' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'noodler''s ink' AND name = 'air-corp blue-black'),
       (SELECT paper_id FROM Papers WHERE brand = 'rhodia' AND name IS NULL AND style = 'dot' AND lbs IS NULL AND grams IS NULL),
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/noodlers_ink_air-corp_blue-black_pilot_metropolitan_b_rhodia.jpg',
       'high_res/noodlers_ink_air-corp_blue-black_pilot_metropolitan_b_rhodia.jpg',
       'original/noodlers_ink_air-corp_blue-black_pilot_metropolitan_b_rhodia.jpg',
       1, 1, 1, 1, NOW(), NOW());

-- Writing Samples Noodler's Ink Air-Corp Blue-Black Noodler's Pilot Metropolitan F
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pilot' AND model = 'metropolitan'),
       (SELECT nib_id FROM Nibs WHERE size = 'f' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'noodler''s ink' AND name = 'air-corp blue-black'),
       (SELECT paper_id FROM Papers WHERE brand = 'amazon' AND name = 'printer' AND style = 'plain' AND lbs = '20' AND grams IS NULL), 
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/noodlers_ink_air-corp_blue-black_pilot_metropolitan_f_amazon_20lb_printer.jpg',
       'high_res/noodlers_ink_air-corp_blue-black_pilot_metropolitan_f_amazon_20lb_printer.jpg',
       'original/noodlers_ink_air-corp_blue-black_pilot_metropolitan_f_amazon_20lb_printer.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pilot' AND model = 'metropolitan'),
       (SELECT nib_id FROM Nibs WHERE size = 'f' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'noodler''s ink' AND name = 'air-corp blue-black'),
       (SELECT paper_id FROM Papers WHERE brand = 'amazon' AND name = 'notebook' AND style = 'lined' AND lbs IS NULL AND grams = '56'),
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/noodlers_ink_air-corp_blue-black_pilot_metropolitan_f_amazon_56_gsm.jpg',
       'high_res/noodlers_ink_air-corp_blue-black_pilot_metropolitan_f_amazon_56_gsm.jpg',
       'original/noodlers_ink_air-corp_blue-black_pilot_metropolitan_f_amazon_56_gsm.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pilot' AND model = 'metropolitan'),
       (SELECT nib_id FROM Nibs WHERE size = 'f' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'noodler''s ink' AND name = 'air-corp blue-black'),
       (SELECT paper_id FROM Papers WHERE brand = 'clairefontaine' AND name IS NULL AND style = 'grid' AND lbs IS NULL AND grams IS NULL), 
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/noodlers_ink_air-corp_blue-black_pilot_metropolitan_f_clairefontaine.jpg',
       'high_res/noodlers_ink_air-corp_blue-black_pilot_metropolitan_f_clairefontaine.jpg',
       'original/noodlers_ink_air-corp_blue-black_pilot_metropolitan_f_clairefontaine.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pilot' AND model = 'metropolitan'),
       (SELECT nib_id FROM Nibs WHERE size = 'f' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'noodler''s ink' AND name = 'air-corp blue-black'),
       (SELECT paper_id FROM Papers WHERE brand = 'mead' AND name = 'notebook' AND style = 'lined' AND lbs IS NULL AND grams IS NULL),
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/noodlers_ink_air-corp_blue-black_pilot_metropolitan_f_mead_spiral_notebook.jpg',
       'high_res/noodlers_ink_air-corp_blue-black_pilot_metropolitan_f_mead_spiral_notebook.jpg',
       'original/noodlers_ink_air-corp_blue-black_pilot_metropolitan_f_mead_spiral_notebook.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pilot' AND model = 'metropolitan'),
       (SELECT nib_id FROM Nibs WHERE size = 'f' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'noodler''s ink' AND name = 'air-corp blue-black'),
       (SELECT paper_id FROM Papers WHERE brand = 'mnemosyne' AND name IS NULL AND style = 'lined' AND lbs IS NULL AND grams IS NULL),
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/noodlers_ink_air-corp_blue-black_pilot_metropolitan_f_mnemosyne.jpg',
       'high_res/noodlers_ink_air-corp_blue-black_pilot_metropolitan_f_mnemosyne.jpg',
       'original/noodlers_ink_air-corp_blue-black_pilot_metropolitan_f_mnemosyne.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pilot' AND model = 'metropolitan'),
       (SELECT nib_id FROM Nibs WHERE size = 'f' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'noodler''s ink' AND name = 'air-corp blue-black'),
       (SELECT paper_id FROM Papers WHERE brand = 'rhodia' AND name IS NULL AND style = 'dot' AND lbs IS NULL AND grams IS NULL),
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/noodlers_ink_air-corp_blue-black_pilot_metropolitan_f_rhodia.jpg',
       'high_res/noodlers_ink_air-corp_blue-black_pilot_metropolitan_f_rhodia.jpg',
       'original/noodlers_ink_air-corp_blue-black_pilot_metropolitan_f_rhodia.jpg',
       1, 1, 1, 1, NOW(), NOW());

-- Writing Samples Noodler's Ink Air-Corp Blue-Black Noodler's Pilot Metropolitan M
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pilot' AND model = 'metropolitan'),
       (SELECT nib_id FROM Nibs WHERE size = 'm' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'noodler''s ink' AND name = 'air-corp blue-black'),
       (SELECT paper_id FROM Papers WHERE brand = 'amazon' AND name = 'printer' AND style = 'plain' AND lbs = '20' AND grams IS NULL), 
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/noodlers_ink_air-corp_blue-black_pilot_metropolitan_m_amazon_20lb_printer.jpg',
       'high_res/noodlers_ink_air-corp_blue-black_pilot_metropolitan_m_amazon_20lb_printer.jpg',
       'original/noodlers_ink_air-corp_blue-black_pilot_metropolitan_m_amazon_20lb_printer.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pilot' AND model = 'metropolitan'),
       (SELECT nib_id FROM Nibs WHERE size = 'm' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'noodler''s ink' AND name = 'air-corp blue-black'),
       (SELECT paper_id FROM Papers WHERE brand = 'amazon' AND name = 'notebook' AND style = 'lined' AND lbs IS NULL AND grams = '56'),
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/noodlers_ink_air-corp_blue-black_pilot_metropolitan_m_amazon_56_gsm.jpg',
       'high_res/noodlers_ink_air-corp_blue-black_pilot_metropolitan_m_amazon_56_gsm.jpg',
       'original/noodlers_ink_air-corp_blue-black_pilot_metropolitan_m_amazon_56_gsm.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pilot' AND model = 'metropolitan'),
       (SELECT nib_id FROM Nibs WHERE size = 'm' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'noodler''s ink' AND name = 'air-corp blue-black'),
       (SELECT paper_id FROM Papers WHERE brand = 'clairefontaine' AND name IS NULL AND style = 'grid' AND lbs IS NULL AND grams IS NULL), 
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/noodlers_ink_air-corp_blue-black_pilot_metropolitan_m_clairefontaine.jpg',
       'high_res/noodlers_ink_air-corp_blue-black_pilot_metropolitan_m_clairefontaine.jpg',
       'original/noodlers_ink_air-corp_blue-black_pilot_metropolitan_m_clairefontaine.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pilot' AND model = 'metropolitan'),
       (SELECT nib_id FROM Nibs WHERE size = 'm' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'noodler''s ink' AND name = 'air-corp blue-black'),
       (SELECT paper_id FROM Papers WHERE brand = 'mead' AND name = 'notebook' AND style = 'lined' AND lbs IS NULL AND grams IS NULL),
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/noodlers_ink_air-corp_blue-black_pilot_metropolitan_m_mead_spiral_notebook.jpg',
       'high_res/noodlers_ink_air-corp_blue-black_pilot_metropolitan_m_mead_spiral_notebook.jpg',
       'original/noodlers_ink_air-corp_blue-black_pilot_metropolitan_m_mead_spiral_notebook.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pilot' AND model = 'metropolitan'),
       (SELECT nib_id FROM Nibs WHERE size = 'm' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'noodler''s ink' AND name = 'air-corp blue-black'),
       (SELECT paper_id FROM Papers WHERE brand = 'mnemosyne' AND name IS NULL AND style = 'lined' AND lbs IS NULL AND grams IS NULL),
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/noodlers_ink_air-corp_blue-black_pilot_metropolitan_m_mnemosyne.jpg',
       'high_res/noodlers_ink_air-corp_blue-black_pilot_metropolitan_m_mnemosyne.jpg',
       'original/noodlers_ink_air-corp_blue-black_pilot_metropolitan_m_mnemosyne.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pilot' AND model = 'metropolitan'),
       (SELECT nib_id FROM Nibs WHERE size = 'm' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'noodler''s ink' AND name = 'air-corp blue-black'),
       (SELECT paper_id FROM Papers WHERE brand = 'rhodia' AND name IS NULL AND style = 'dot' AND lbs IS NULL AND grams IS NULL),
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/noodlers_ink_air-corp_blue-black_pilot_metropolitan_m_rhodia.jpg',
       'high_res/noodlers_ink_air-corp_blue-black_pilot_metropolitan_m_rhodia.jpg',
       'original/noodlers_ink_air-corp_blue-black_pilot_metropolitan_m_rhodia.jpg',
       1, 1, 1, 1, NOW(), NOW());

-- Writing Samples Parker Quink Blue Noodler's Ink Konrad Flex
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'noodler''s ink' AND model = 'konrad'),
       (SELECT nib_id FROM Nibs WHERE size = 'flex' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'noodler''s ink' AND name = 'air-corp blue-black'),
       (SELECT paper_id FROM Papers WHERE brand = 'amazon' AND name = 'printer' AND style = 'plain' AND lbs = '20' AND grams IS NULL), 
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/parker_quink_blue_noodlers_ink_konrad_flex_amazon_20lb_printer.jpg',
       'high_res/parker_quink_blue_noodlers_ink_konrad_flex_amazon_20lb_printer.jpg',
       'original/parker_quink_blue_noodlers_ink_konrad_flex_amazon_20lb_printer.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'noodler''s ink' AND model = 'konrad'),
       (SELECT nib_id FROM Nibs WHERE size = 'flex' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'parker quink' AND name = 'blue'),
       (SELECT paper_id FROM Papers WHERE brand = 'amazon' AND name = 'notebook' AND style = 'lined' AND lbs IS NULL AND grams = '56'),
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/parker_quink_blue_noodlers_ink_konrad_flex_amazon_56_gsm.jpg',
       'high_res/parker_quink_blue_noodlers_ink_konrad_flex_amazon_56_gsm.jpg',
       'original/parker_quink_blue_noodlers_ink_konrad_flex_amazon_56_gsm.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'noodler''s ink' AND model = 'konrad'),
       (SELECT nib_id FROM Nibs WHERE size = 'flex' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'parker quink' AND name = 'blue'),
       (SELECT paper_id FROM Papers WHERE brand = 'clairefontaine' AND name IS NULL AND style = 'grid' AND lbs IS NULL AND grams IS NULL), 
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/parker_quink_blue_noodlers_ink_konrad_flex_clairefontaine.jpg',
       'high_res/parker_quink_blue_noodlers_ink_konrad_flex_clairefontaine.jpg',
       'original/parker_quink_blue_noodlers_ink_konrad_flex_clairefontaine.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'noodler''s ink' AND model = 'konrad'),
       (SELECT nib_id FROM Nibs WHERE size = 'flex' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'parker quink' AND name = 'blue'),
       (SELECT paper_id FROM Papers WHERE brand = 'mead' AND name = 'notebook' AND style = 'lined' AND lbs IS NULL AND grams IS NULL),
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/parker_quink_blue_noodlers_ink_konrad_flex_mead_spiral_notebook.jpg',
       'high_res/parker_quink_blue_noodlers_ink_konrad_flex_mead_spiral_notebook.jpg',
       'original/parker_quink_blue_noodlers_ink_konrad_flex_mead_spiral_notebook.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'noodler''s ink' AND model = 'konrad'),
       (SELECT nib_id FROM Nibs WHERE size = 'flex' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'parker quink' AND name = 'blue'),
       (SELECT paper_id FROM Papers WHERE brand = 'mnemosyne' AND name IS NULL AND style = 'lined' AND lbs IS NULL AND grams IS NULL),
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/parker_quink_blue_noodlers_ink_konrad_flex_mnemosyne.jpg',
       'high_res/parker_quink_blue_noodlers_ink_konrad_flex_mnemosyne.jpg',
       'original/parker_quink_blue_noodlers_ink_konrad_flex_mnemosyne.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'noodler''s ink' AND model = 'konrad'),
       (SELECT nib_id FROM Nibs WHERE size = 'flex' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'parker quink' AND name = 'blue'),
       (SELECT paper_id FROM Papers WHERE brand = 'rhodia' AND name IS NULL AND style = 'dot' AND lbs IS NULL AND grams IS NULL),
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/parker_quink_blue_noodlers_ink_konrad_flex_rhodia.jpg',
       'high_res/parker_quink_blue_noodlers_ink_konrad_flex_rhodia.jpg',
       'original/parker_quink_blue_noodlers_ink_konrad_flex_rhodia.jpg',
       1, 1, 1, 1, NOW(), NOW());

-- Writing Samples Parker Quink Blue Noodler's Ink Konrad M
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'noodler''s ink' AND model = 'konrad'),
       (SELECT nib_id FROM Nibs WHERE size = 'm' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'parker quink' AND name = 'blue'),
       (SELECT paper_id FROM Papers WHERE brand = 'amazon' AND name = 'printer' AND style = 'plain' AND lbs = '20' AND grams IS NULL), 
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/parker_quink_blue_noodlers_ink_konrad_m_amazon_20lb_printer.jpg',
       'high_res/parker_quink_blue_noodlers_ink_konrad_m_amazon_20lb_printer.jpg',
       'original/parker_quink_blue_noodlers_ink_konrad_m_amazon_20lb_printer.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'noodler''s ink' AND model = 'konrad'),
       (SELECT nib_id FROM Nibs WHERE size = 'm' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'parker quink' AND name = 'blue'),
       (SELECT paper_id FROM Papers WHERE brand = 'amazon' AND name = 'notebook' AND style = 'lined' AND lbs IS NULL AND grams = '56'),
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/parker_quink_blue_noodlers_ink_konrad_m_amazon_56_gsm.jpg',
       'high_res/parker_quink_blue_noodlers_ink_konrad_m_amazon_56_gsm.jpg',
       'original/parker_quink_blue_noodlers_ink_konrad_m_amazon_56_gsm.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'noodler''s ink' AND model = 'konrad'),
       (SELECT nib_id FROM Nibs WHERE size = 'm' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'parker quink' AND name = 'blue'),
       (SELECT paper_id FROM Papers WHERE brand = 'clairefontaine' AND name IS NULL AND style = 'grid' AND lbs IS NULL AND grams IS NULL), 
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/parker_quink_blue_noodlers_ink_konrad_m_clairefontaine.jpg',
       'high_res/parker_quink_blue_noodlers_ink_konrad_m_clairefontaine.jpg',
       'original/parker_quink_blue_noodlers_ink_konrad_m_clairefontaine.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'noodler''s ink' AND model = 'konrad'),
       (SELECT nib_id FROM Nibs WHERE size = 'm' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'parker quink' AND name = 'blue'),
       (SELECT paper_id FROM Papers WHERE brand = 'mead' AND name = 'notebook' AND style = 'lined' AND lbs IS NULL AND grams IS NULL),
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/parker_quink_blue_noodlers_ink_konrad_m_mead_spiral_notebook.jpg',
       'high_res/parker_quink_blue_noodlers_ink_konrad_m_mead_spiral_notebook.jpg',
       'original/parker_quink_blue_noodlers_ink_konrad_m_mead_spiral_notebook.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'noodler''s ink' AND model = 'konrad'),
       (SELECT nib_id FROM Nibs WHERE size = 'm' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'parker quink' AND name = 'blue'),
       (SELECT paper_id FROM Papers WHERE brand = 'mnemosyne' AND name IS NULL AND style = 'lined' AND lbs IS NULL AND grams IS NULL),
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/parker_quink_blue_noodlers_ink_konrad_m_mnemosyne.jpg',
       'high_res/parker_quink_blue_noodlers_ink_konrad_m_mnemosyne.jpg',
       'original/parker_quink_blue_noodlers_ink_konrad_m_mnemosyne.jpg',
       1, 1, 1, 1, NOW(), NOW());

-- Writing Samples Parker Quink Blue Noodler's Pilot Metropolitan B
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pilot' AND model = 'metropolitan'),
       (SELECT nib_id FROM Nibs WHERE size = 'b' AND grind = 'italic' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'parker quink' AND name = 'blue'),
       (SELECT paper_id FROM Papers WHERE brand = 'amazon' AND name = 'printer' AND style = 'plain' AND lbs = '20' AND grams IS NULL), 
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/parker_quink_blue_pilot_metropolitan_b_amazon_20lb_printer.jpg',
       'high_res/parker_quink_blue_pilot_metropolitan_b_amazon_20lb_printer.jpg',
       'original/parker_quink_blue_pilot_metropolitan_b_amazon_20lb_printer.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pilot' AND model = 'metropolitan'),
       (SELECT nib_id FROM Nibs WHERE size = 'b' AND grind = 'italic' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'parker quink' AND name = 'blue'),
       (SELECT paper_id FROM Papers WHERE brand = 'amazon' AND name = 'notebook' AND style = 'lined' AND lbs IS NULL AND grams = '56'),
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/parker_quink_blue_pilot_metropolitan_b_amazon_56_gsm.jpg',
       'high_res/parker_quink_blue_pilot_metropolitan_b_amazon_56_gsm.jpg',
       'original/parker_quink_blue_pilot_metropolitan_b_amazon_56_gsm.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pilot' AND model = 'metropolitan'),
       (SELECT nib_id FROM Nibs WHERE size = 'b' AND grind = 'italic' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'parker quink' AND name = 'blue'),
       (SELECT paper_id FROM Papers WHERE brand = 'clairefontaine' AND name IS NULL AND style = 'grid' AND lbs IS NULL AND grams IS NULL), 
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/parker_quink_blue_pilot_metropolitan_b_clairefontaine.jpg',
       'high_res/parker_quink_blue_pilot_metropolitan_b_clairefontaine.jpg',
       'original/parker_quink_blue_pilot_metropolitan_b_clairefontaine.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pilot' AND model = 'metropolitan'),
       (SELECT nib_id FROM Nibs WHERE size = 'b' AND grind = 'italic' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'parker quink' AND name = 'blue'),
       (SELECT paper_id FROM Papers WHERE brand = 'mead' AND name = 'notebook' AND style = 'lined' AND lbs IS NULL AND grams IS NULL),
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/parker_quink_blue_pilot_metropolitan_b_mead_spiral_notebook.jpg',
       'high_res/parker_quink_blue_pilot_metropolitan_b_mead_spiral_notebook.jpg',
       'original/parker_quink_blue_pilot_metropolitan_b_mead_spiral_notebook.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pilot' AND model = 'metropolitan'),
       (SELECT nib_id FROM Nibs WHERE size = 'b' AND grind = 'italic' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'parker quink' AND name = 'blue'),
       (SELECT paper_id FROM Papers WHERE brand = 'mnemosyne' AND name IS NULL AND style = 'lined' AND lbs IS NULL AND grams IS NULL),
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/parker_quink_blue_pilot_metropolitan_b_mnemosyne.jpg',
       'high_res/parker_quink_blue_pilot_metropolitan_b_mnemosyne.jpg',
       'original/parker_quink_blue_pilot_metropolitan_b_mnemosyne.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pilot' AND model = 'metropolitan'),
       (SELECT nib_id FROM Nibs WHERE size = 'b' AND grind = 'italic' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'parker quink' AND name = 'blue'),
       (SELECT paper_id FROM Papers WHERE brand = 'rhodia' AND name IS NULL AND style = 'dot' AND lbs IS NULL AND grams IS NULL),
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/parker_quink_blue_pilot_metropolitan_b_rhodia.jpg',
       'high_res/parker_quink_blue_pilot_metropolitan_b_rhodia.jpg',
       'original/parker_quink_blue_pilot_metropolitan_b_rhodia.jpg',
       1, 1, 1, 1, NOW(), NOW());

-- Writing Samples Parker Quink Blue Noodler's Pilot Metropolitan F
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pilot' AND model = 'metropolitan'),
       (SELECT nib_id FROM Nibs WHERE size = 'f' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'parker quink' AND name = 'blue'),
       (SELECT paper_id FROM Papers WHERE brand = 'amazon' AND name = 'printer' AND style = 'plain' AND lbs = '20' AND grams IS NULL), 
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/parker_quink_blue_pilot_metropolitan_f_amazon_20lb_printer.jpg',
       'high_res/parker_quink_blue_pilot_metropolitan_f_amazon_20lb_printer.jpg',
       'original/parker_quink_blue_pilot_metropolitan_f_amazon_20lb_printer.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pilot' AND model = 'metropolitan'),
       (SELECT nib_id FROM Nibs WHERE size = 'f' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'parker quink' AND name = 'blue'),
       (SELECT paper_id FROM Papers WHERE brand = 'amazon' AND name = 'notebook' AND style = 'lined' AND lbs IS NULL AND grams = '56'),
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/parker_quink_blue_pilot_metropolitan_f_amazon_56_gsm.jpg',
       'high_res/parker_quink_blue_pilot_metropolitan_f_amazon_56_gsm.jpg',
       'original/parker_quink_blue_pilot_metropolitan_f_amazon_56_gsm.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pilot' AND model = 'metropolitan'),
       (SELECT nib_id FROM Nibs WHERE size = 'f' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'parker quink' AND name = 'blue'),
       (SELECT paper_id FROM Papers WHERE brand = 'clairefontaine' AND name IS NULL AND style = 'grid' AND lbs IS NULL AND grams IS NULL), 
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/parker_quink_blue_pilot_metropolitan_f_clairefontaine.jpg',
       'high_res/parker_quink_blue_pilot_metropolitan_f_clairefontaine.jpg',
       'original/parker_quink_blue_pilot_metropolitan_f_clairefontaine.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pilot' AND model = 'metropolitan'),
       (SELECT nib_id FROM Nibs WHERE size = 'f' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'parker quink' AND name = 'blue'),
       (SELECT paper_id FROM Papers WHERE brand = 'mead' AND name = 'notebook' AND style = 'lined' AND lbs IS NULL AND grams IS NULL),
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/parker_quink_blue_pilot_metropolitan_f_mead_spiral_notebook.jpg',
       'high_res/parker_quink_blue_pilot_metropolitan_f_mead_spiral_notebook.jpg',
       'original/parker_quink_blue_pilot_metropolitan_f_mead_spiral_notebook.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pilot' AND model = 'metropolitan'),
       (SELECT nib_id FROM Nibs WHERE size = 'f' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'parker quink' AND name = 'blue'),
       (SELECT paper_id FROM Papers WHERE brand = 'mnemosyne' AND name IS NULL AND style = 'lined' AND lbs IS NULL AND grams IS NULL),
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/parker_quink_blue_pilot_metropolitan_f_mnemosyne.jpg',
       'high_res/parker_quink_blue_pilot_metropolitan_f_mnemosyne.jpg',
       'original/parker_quink_blue_pilot_metropolitan_f_mnemosyne.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pilot' AND model = 'metropolitan'),
       (SELECT nib_id FROM Nibs WHERE size = 'f' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'parker quink' AND name = 'blue'),
       (SELECT paper_id FROM Papers WHERE brand = 'rhodia' AND name IS NULL AND style = 'dot' AND lbs IS NULL AND grams IS NULL),
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/parker_quink_blue_pilot_metropolitan_f_rhodia.jpg',
       'high_res/parker_quink_blue_pilot_metropolitan_f_rhodia.jpg',
       'original/parker_quink_blue_pilot_metropolitan_f_rhodia.jpg',
       1, 1, 1, 1, NOW(), NOW());

-- Writing Samples Parker Quink Blue Noodler's Pilot Metropolitan M
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pilot' AND model = 'metropolitan'),
       (SELECT nib_id FROM Nibs WHERE size = 'm' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'parker quink' AND name = 'blue'),
       (SELECT paper_id FROM Papers WHERE brand = 'amazon' AND name = 'printer' AND style = 'plain' AND lbs = '20' AND grams IS NULL), 
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/parker_quink_blue_pilot_metropolitan_m_amazon_20lb_printer.jpg',
       'high_res/parker_quink_blue_pilot_metropolitan_m_amazon_20lb_printer.jpg',
       'original/parker_quink_blue_pilot_metropolitan_m_amazon_20lb_printer.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pilot' AND model = 'metropolitan'),
       (SELECT nib_id FROM Nibs WHERE size = 'm' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'parker quink' AND name = 'blue'),
       (SELECT paper_id FROM Papers WHERE brand = 'amazon' AND name = 'notebook' AND style = 'lined' AND lbs IS NULL AND grams = '56'),
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/parker_quink_blue_pilot_metropolitan_m_amazon_56_gsm.jpg',
       'high_res/parker_quink_blue_pilot_metropolitan_m_amazon_56_gsm.jpg',
       'original/parker_quink_blue_pilot_metropolitan_m_amazon_56_gsm.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pilot' AND model = 'metropolitan'),
       (SELECT nib_id FROM Nibs WHERE size = 'm' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'parker quink' AND name = 'blue'),
       (SELECT paper_id FROM Papers WHERE brand = 'clairefontaine' AND name IS NULL AND style = 'grid' AND lbs IS NULL AND grams IS NULL), 
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/parker_quink_blue_pilot_metropolitan_m_clairefontaine.jpg',
       'high_res/parker_quink_blue_pilot_metropolitan_m_clairefontaine.jpg',
       'original/parker_quink_blue_pilot_metropolitan_m_clairefontaine.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pilot' AND model = 'metropolitan'),
       (SELECT nib_id FROM Nibs WHERE size = 'm' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'parker quink' AND name = 'blue'),
       (SELECT paper_id FROM Papers WHERE brand = 'mead' AND name = 'notebook' AND style = 'lined' AND lbs IS NULL AND grams IS NULL),
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/parker_quink_blue_pilot_metropolitan_m_mead_spiral_notebook.jpg',
       'high_res/parker_quink_blue_pilot_metropolitan_m_mead_spiral_notebook.jpg',
       'original/parker_quink_blue_pilot_metropolitan_m_mead_spiral_notebook.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pilot' AND model = 'metropolitan'),
       (SELECT nib_id FROM Nibs WHERE size = 'm' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'parker quink' AND name = 'blue'),
       (SELECT paper_id FROM Papers WHERE brand = 'mnemosyne' AND name IS NULL AND style = 'lined' AND lbs IS NULL AND grams IS NULL),
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/parker_quink_blue_pilot_metropolitan_m_mnemosyne.jpg',
       'high_res/parker_quink_blue_pilot_metropolitan_m_mnemosyne.jpg',
       'original/parker_quink_blue_pilot_metropolitan_m_mnemosyne.jpg',
       1, 1, 1, 1, NOW(), NOW());
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, low_res_aws_key, high_res_aws_key, original_aws_key, valid_waterproofness, valid_drying_time, valid_transparency, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pilot' AND model = 'metropolitan'),
       (SELECT nib_id FROM Nibs WHERE size = 'm' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'parker quink' AND name = 'blue'),
       (SELECT paper_id FROM Papers WHERE brand = 'rhodia' AND name IS NULL AND style = 'dot' AND lbs IS NULL AND grams IS NULL),
       (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
       'low_res/parker_quink_blue_pilot_metropolitan_m_rhodia.jpg',
       'high_res/parker_quink_blue_pilot_metropolitan_m_rhodia.jpg',
       'original/parker_quink_blue_pilot_metropolitan_m_rhodia.jpg',
       1, 1, 1, 1, NOW(), NOW());

-- Colors
INSERT INTO Colors (name, created_at, updated_at)
VALUES ('red', NOW(), NOW()); 
INSERT INTO Colors (name, created_at, updated_at)
VALUES ('orange', NOW(), NOW()); 
INSERT INTO Colors (name, created_at, updated_at)
VALUES ('yellow', NOW(), NOW()); 
INSERT INTO Colors (name, created_at, updated_at)
VALUES ('green', NOW(), NOW()); 
INSERT INTO Colors (name, created_at, updated_at)
VALUES ('blue', NOW(), NOW()); 
INSERT INTO Colors (name, created_at, updated_at)
VALUES ('purple', NOW(), NOW()); 
INSERT INTO Colors (name, created_at, updated_at)
VALUES ('pink', NOW(), NOW()); 
INSERT INTO Colors (name, created_at, updated_at)
VALUES ('black', NOW(), NOW()); 
INSERT INTO Colors (name, created_at, updated_at)
VALUES ('grey', NOW(), NOW()); 
INSERT INTO Colors (name, created_at, updated_at)
VALUES ('brown', NOW(), NOW()); 
INSERT INTO Colors (name, created_at, updated_at)
VALUES ('gold', NOW(), NOW()); 
INSERT INTO Colors (name, created_at, updated_at)
VALUES ('silver', NOW(), NOW()); 
INSERT INTO Colors (name, created_at, updated_at)
VALUES ('white', NOW(), NOW());
INSERT INTO Colors (name, created_at, updated_at)
VALUES ('none', NOW(), NOW());

-- ColorReviews

-- ColorReviews Momiji Pilot Metropolitan M
INSERT INTO ColorReviews (writing_sample_id, user_id, color_id, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/iroshizuku_momiji_pilot_metropolitan_m_clairefontaine.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        (SELECT color_id FROM Colors WHERE name='red'),
        1, NOW(), NOW());
INSERT INTO ColorReviews (writing_sample_id, user_id, color_id, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/iroshizuku_momiji_pilot_metropolitan_m_mnemosyne.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        (SELECT color_id FROM Colors WHERE name='red'),
        1, NOW(), NOW());
INSERT INTO ColorReviews (writing_sample_id, user_id, color_id, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/iroshizuku_momiji_pilot_metropolitan_m_rhodia.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        (SELECT color_id FROM Colors WHERE name='red'),
        1, NOW(), NOW());
INSERT INTO ColorReviews (writing_sample_id, user_id, color_id, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/iroshizuku_momiji_pilot_metropolitan_m_clairefontaine.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        (SELECT color_id FROM Colors WHERE name='pink'),
        1, NOW(), NOW());
INSERT INTO ColorReviews (writing_sample_id, user_id, color_id, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/iroshizuku_momiji_pilot_metropolitan_m_mnemosyne.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        (SELECT color_id FROM Colors WHERE name='pink'),
        1, NOW(), NOW());
INSERT INTO ColorReviews (writing_sample_id, user_id, color_id, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/iroshizuku_momiji_pilot_metropolitan_m_rhodia.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        (SELECT color_id FROM Colors WHERE name='pink'),
        1, NOW(), NOW());

-- ColorReviews Noodler's Ink Apache Sunset Pilot Metropolitan B
INSERT INTO ColorReviews (writing_sample_id, user_id, color_id, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/noodlers_ink_apache_sunset_pilot_metropolitan_b_clairefontaine.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        (SELECT color_id FROM Colors WHERE name='yellow'),
        1, NOW(), NOW());
INSERT INTO ColorReviews (writing_sample_id, user_id, color_id, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/noodlers_ink_apache_sunset_pilot_metropolitan_b_mnemosyne.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        (SELECT color_id FROM Colors WHERE name='yellow'),
        1, NOW(), NOW());
INSERT INTO ColorReviews (writing_sample_id, user_id, color_id, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/noodlers_ink_apache_sunset_pilot_metropolitan_b_rhodia.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        (SELECT color_id FROM Colors WHERE name='yellow'),
        1, NOW(), NOW());
INSERT INTO ColorReviews (writing_sample_id, user_id, color_id, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/noodlers_ink_apache_sunset_pilot_metropolitan_b_clairefontaine.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        (SELECT color_id FROM Colors WHERE name='orange'),
        1, NOW(), NOW());
INSERT INTO ColorReviews (writing_sample_id, user_id, color_id, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/noodlers_ink_apache_sunset_pilot_metropolitan_b_mnemosyne.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        (SELECT color_id FROM Colors WHERE name='orange'),
        1, NOW(), NOW());
INSERT INTO ColorReviews (writing_sample_id, user_id, color_id, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/noodlers_ink_apache_sunset_pilot_metropolitan_b_rhodia.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        (SELECT color_id FROM Colors WHERE name='orange'),
        1, NOW(), NOW());

-- ColorReviews Noodler's Ink Bernanke Blue Pilot Metropolitan F
INSERT INTO ColorReviews (writing_sample_id, user_id, color_id, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/noodlers_ink_bernanke_blue_pilot_metropolitan_f_clairefontaine.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        (SELECT color_id FROM Colors WHERE name='blue'),
        1, NOW(), NOW());
INSERT INTO ColorReviews (writing_sample_id, user_id, color_id, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/noodlers_ink_bernanke_blue_pilot_metropolitan_f_mnemosyne.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        (SELECT color_id FROM Colors WHERE name='blue'),
        1, NOW(), NOW());
INSERT INTO ColorReviews (writing_sample_id, user_id, color_id, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/noodlers_ink_bernanke_blue_pilot_metropolitan_f_rhodia.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        (SELECT color_id FROM Colors WHERE name='blue'),
        1, NOW(), NOW());

-- ColorReviews Parker Quink Blue Aurora Ipsilon M
INSERT INTO ColorReviews (writing_sample_id, user_id, color_id, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/parker_quink_blue_aurora_ipsilon_italia_150_m_clairefontaine.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        (SELECT color_id FROM Colors WHERE name='blue'),
        1, NOW(), NOW());
INSERT INTO ColorReviews (writing_sample_id, user_id, color_id, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/parker_quink_blue_aurora_ipsilon_italia_150_m_mnemosyne.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        (SELECT color_id FROM Colors WHERE name='blue'),
        1, NOW(), NOW());
INSERT INTO ColorReviews (writing_sample_id, user_id, color_id, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/parker_quink_blue_aurora_ipsilon_italia_150_m_rhodia.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        (SELECT color_id FROM Colors WHERE name='blue'),
        1, NOW(), NOW());

-- ColorReviews Diamine Ancient Copper Pelikan Souveran M400 B
INSERT INTO ColorReviews (writing_sample_id, user_id, color_id, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/diamine_ancient_copper_pelikan_souveran_m400_b_amazon_20lb_printer.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        (SELECT color_id FROM Colors WHERE name='brown'),
        1, NOW(), NOW());
INSERT INTO ColorReviews (writing_sample_id, user_id, color_id, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/diamine_ancient_copper_pelikan_souveran_m400_b_amazon_56_gsm.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        (SELECT color_id FROM Colors WHERE name='brown'),
        1, NOW(), NOW());
INSERT INTO ColorReviews (writing_sample_id, user_id, color_id, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/diamine_ancient_copper_pelikan_souveran_m400_b_clairefontaine.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        (SELECT color_id FROM Colors WHERE name='brown'),
        1, NOW(), NOW());
INSERT INTO ColorReviews (writing_sample_id, user_id, color_id, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/diamine_ancient_copper_pelikan_souveran_m400_b_mead_spiral_notebook.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        (SELECT color_id FROM Colors WHERE name='brown'),
        1, NOW(), NOW());
INSERT INTO ColorReviews (writing_sample_id, user_id, color_id, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/diamine_ancient_copper_pelikan_souveran_m400_b_mnemosyne.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        (SELECT color_id FROM Colors WHERE name='brown'),
        1, NOW(), NOW());
INSERT INTO ColorReviews (writing_sample_id, user_id, color_id, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/diamine_ancient_copper_pelikan_souveran_m400_b_rhodia.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        (SELECT color_id FROM Colors WHERE name='brown'),
        1, NOW(), NOW());

-- ShadingReviews
-- ShadingReviews Momiji Pilot Metropolitan M
INSERT INTO ShadingReviews (writing_sample_id, user_id, amount, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/iroshizuku_momiji_pilot_metropolitan_m_clairefontaine.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'partial', 1, NOW(), NOW());
INSERT INTO ShadingReviews (writing_sample_id, user_id, amount, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/iroshizuku_momiji_pilot_metropolitan_m_mnemosyne.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'partial', 1, NOW(), NOW());
INSERT INTO ShadingReviews (writing_sample_id, user_id, amount, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/iroshizuku_momiji_pilot_metropolitan_m_rhodia.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'partial', 1, NOW(), NOW());

-- ShadingReviews Noodler's Ink Apache Sunset Pilot Metropolitan B
INSERT INTO ShadingReviews (writing_sample_id, user_id, amount, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/noodlers_ink_apache_sunset_pilot_metropolitan_b_clairefontaine.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'full', 1, NOW(), NOW());
INSERT INTO ShadingReviews (writing_sample_id, user_id, amount, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/noodlers_ink_apache_sunset_pilot_metropolitan_b_mnemosyne.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'full', 1, NOW(), NOW());
INSERT INTO ShadingReviews (writing_sample_id, user_id, amount, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/noodlers_ink_apache_sunset_pilot_metropolitan_b_rhodia.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'full', 1, NOW(), NOW());

-- ShadingReviews Noodler's Ink Bernanke Blue Pilot Metropolitan F
INSERT INTO ShadingReviews (writing_sample_id, user_id, amount, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/noodlers_ink_bernanke_blue_pilot_metropolitan_f_clairefontaine.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'full', 1, NOW(), NOW());
INSERT INTO ShadingReviews (writing_sample_id, user_id, amount, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/noodlers_ink_bernanke_blue_pilot_metropolitan_f_mnemosyne.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'full', 1, NOW(), NOW());
INSERT INTO ShadingReviews (writing_sample_id, user_id, amount, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/noodlers_ink_bernanke_blue_pilot_metropolitan_f_rhodia.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'full', 1, NOW(), NOW());

-- ShadingReviews Parker Quink Blue Aurora Ipsilon M
INSERT INTO ShadingReviews (writing_sample_id, user_id, amount, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/parker_quink_blue_aurora_ipsilon_italia_150_m_clairefontaine.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'partial', 1, NOW(), NOW());
INSERT INTO ShadingReviews (writing_sample_id, user_id, amount, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/parker_quink_blue_aurora_ipsilon_italia_150_m_mnemosyne.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'partial', 1, NOW(), NOW());
INSERT INTO ShadingReviews (writing_sample_id, user_id, amount, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/parker_quink_blue_aurora_ipsilon_italia_150_m_rhodia.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'partial', 1, NOW(), NOW());

-- ShadingReviews Diamine Ancient Copper Pelikan Souveran M400 B
INSERT INTO ShadingReviews (writing_sample_id, user_id, amount, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/diamine_ancient_copper_pelikan_souveran_m400_b_amazon_20lb_printer.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'partial', 1, NOW(), NOW());
INSERT INTO ShadingReviews (writing_sample_id, user_id, amount, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/diamine_ancient_copper_pelikan_souveran_m400_b_amazon_56_gsm.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'partial', 1, NOW(), NOW());
INSERT INTO ShadingReviews (writing_sample_id, user_id, amount, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/diamine_ancient_copper_pelikan_souveran_m400_b_clairefontaine.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'full', 1, NOW(), NOW());
INSERT INTO ShadingReviews (writing_sample_id, user_id, amount, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/diamine_ancient_copper_pelikan_souveran_m400_b_mead_spiral_notebook.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'partial', 1, NOW(), NOW());
INSERT INTO ShadingReviews (writing_sample_id, user_id, amount, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/diamine_ancient_copper_pelikan_souveran_m400_b_mnemosyne.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'full', 1, NOW(), NOW());
INSERT INTO ShadingReviews (writing_sample_id, user_id, amount, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/diamine_ancient_copper_pelikan_souveran_m400_b_rhodia.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'full', 1, NOW(), NOW());

-- SheenReviews
-- SheenReviews Momiji Pilot Metropolitan M
INSERT INTO SheenReviews (writing_sample_id, user_id, color_id, amount, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/iroshizuku_momiji_pilot_metropolitan_m_clairefontaine.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        (SELECT color_id FROM Colors WHERE name='none'),
        'none', 1, NOW(), NOW());
INSERT INTO SheenReviews (writing_sample_id, user_id, color_id, amount, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/iroshizuku_momiji_pilot_metropolitan_m_mnemosyne.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        (SELECT color_id FROM Colors WHERE name='none'),
        'none', 1, NOW(), NOW());
INSERT INTO SheenReviews (writing_sample_id, user_id, color_id, amount, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/iroshizuku_momiji_pilot_metropolitan_m_rhodia.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        (SELECT color_id FROM Colors WHERE name='none'),
        'none', 1, NOW(), NOW());

-- SheenReviews Noodler's Ink Apache Sunset Pilot Metropolitan B
INSERT INTO SheenReviews (writing_sample_id, user_id, color_id, amount, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/noodlers_ink_apache_sunset_pilot_metropolitan_b_clairefontaine.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        (SELECT color_id FROM Colors WHERE name='none'),
        'none', 1, NOW(), NOW());
INSERT INTO SheenReviews (writing_sample_id, user_id, color_id, amount, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/noodlers_ink_apache_sunset_pilot_metropolitan_b_mnemosyne.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        (SELECT color_id FROM Colors WHERE name='none'),
        'none', 1, NOW(), NOW());
INSERT INTO SheenReviews (writing_sample_id, user_id, color_id, amount, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/noodlers_ink_apache_sunset_pilot_metropolitan_b_rhodia.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        (SELECT color_id FROM Colors WHERE name='none'),
        'none', 1, NOW(), NOW());

-- SheenReviews Noodler's Ink Bernanke Blue Pilot Metropolitan F
INSERT INTO SheenReviews (writing_sample_id, user_id, color_id, amount, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/noodlers_ink_bernanke_blue_pilot_metropolitan_f_clairefontaine.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        (SELECT color_id FROM Colors WHERE name='none'),
        'none', 1, NOW(), NOW());
INSERT INTO SheenReviews (writing_sample_id, user_id, color_id, amount, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/noodlers_ink_bernanke_blue_pilot_metropolitan_f_mnemosyne.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        (SELECT color_id FROM Colors WHERE name='none'),
        'none', 1, NOW(), NOW());
INSERT INTO SheenReviews (writing_sample_id, user_id, color_id, amount, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/noodlers_ink_bernanke_blue_pilot_metropolitan_f_rhodia.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        (SELECT color_id FROM Colors WHERE name='none'),
        'none', 1, NOW(), NOW());

-- SheenReviews Parker Quink Blue Aurora Ipsilon M
INSERT INTO SheenReviews (writing_sample_id, user_id, color_id, amount, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/parker_quink_blue_aurora_ipsilon_italia_150_m_clairefontaine.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        (SELECT color_id FROM Colors WHERE name='none'),
        'none', 1, NOW(), NOW());
INSERT INTO SheenReviews (writing_sample_id, user_id, color_id, amount, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/parker_quink_blue_aurora_ipsilon_italia_150_m_mnemosyne.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        (SELECT color_id FROM Colors WHERE name='none'),
        'none', 1, NOW(), NOW());
INSERT INTO SheenReviews (writing_sample_id, user_id, color_id, amount, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/parker_quink_blue_aurora_ipsilon_italia_150_m_rhodia.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        (SELECT color_id FROM Colors WHERE name='none'),
        'none', 1, NOW(), NOW());

-- SheenReviews Diamine Ancient Copper Pelikan Souveran M400 B
INSERT INTO SheenReviews (writing_sample_id, user_id, color_id, amount, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/diamine_ancient_copper_pelikan_souveran_m400_b_amazon_20lb_printer.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        (SELECT color_id FROM Colors WHERE name='none'),
        'none', 1, NOW(), NOW());
INSERT INTO SheenReviews (writing_sample_id, user_id, color_id, amount, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/diamine_ancient_copper_pelikan_souveran_m400_b_amazon_56_gsm.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        (SELECT color_id FROM Colors WHERE name='none'),
        'none', 1, NOW(), NOW());
INSERT INTO SheenReviews (writing_sample_id, user_id, color_id, amount, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/diamine_ancient_copper_pelikan_souveran_m400_b_clairefontaine.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        (SELECT color_id FROM Colors WHERE name='none'),
        'none', 1, NOW(), NOW());
INSERT INTO SheenReviews (writing_sample_id, user_id, color_id, amount, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/diamine_ancient_copper_pelikan_souveran_m400_b_mead_spiral_notebook.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        (SELECT color_id FROM Colors WHERE name='none'),
        'none', 1, NOW(), NOW());
INSERT INTO SheenReviews (writing_sample_id, user_id, color_id, amount, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/diamine_ancient_copper_pelikan_souveran_m400_b_mnemosyne.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        (SELECT color_id FROM Colors WHERE name='none'),
        'none', 1, NOW(), NOW());
INSERT INTO SheenReviews (writing_sample_id, user_id, color_id, amount, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/diamine_ancient_copper_pelikan_souveran_m400_b_rhodia.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        (SELECT color_id FROM Colors WHERE name='none'),
        'none', 1, NOW(), NOW());

-- WaterReviews
-- WaterReviews Momiji Pilot Metropolitan M
INSERT INTO WaterReviews (writing_sample_id, user_id, waterproofness, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/iroshizuku_momiji_pilot_metropolitan_m_clairefontaine.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'none', 1, NOW(), NOW());
INSERT INTO WaterReviews (writing_sample_id, user_id, waterproofness, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/iroshizuku_momiji_pilot_metropolitan_m_mnemosyne.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'none', 1, NOW(), NOW());
INSERT INTO WaterReviews (writing_sample_id, user_id, waterproofness, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/iroshizuku_momiji_pilot_metropolitan_m_rhodia.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'none', 1, NOW(), NOW());

-- WaterReviews Noodler's Ink Apache Sunset Pilot Metropolitan B
INSERT INTO WaterReviews (writing_sample_id, user_id, waterproofness, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/noodlers_ink_apache_sunset_pilot_metropolitan_b_clairefontaine.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'none', 1, NOW(), NOW());
INSERT INTO WaterReviews (writing_sample_id, user_id, waterproofness, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/noodlers_ink_apache_sunset_pilot_metropolitan_b_mnemosyne.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'none', 1, NOW(), NOW());
INSERT INTO WaterReviews (writing_sample_id, user_id, waterproofness, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/noodlers_ink_apache_sunset_pilot_metropolitan_b_rhodia.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'none', 1, NOW(), NOW());

-- WaterReviews Noodler's Ink Bernanke Blue Pilot Metropolitan F
INSERT INTO WaterReviews (writing_sample_id, user_id, waterproofness, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/noodlers_ink_bernanke_blue_pilot_metropolitan_f_clairefontaine.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'none', 1, NOW(), NOW());
INSERT INTO WaterReviews (writing_sample_id, user_id, waterproofness, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/noodlers_ink_bernanke_blue_pilot_metropolitan_f_mnemosyne.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'partially legible', 1, NOW(), NOW());
INSERT INTO WaterReviews (writing_sample_id, user_id, waterproofness, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/noodlers_ink_bernanke_blue_pilot_metropolitan_f_rhodia.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'none', 1, NOW(), NOW());

-- WaterReviews Parker Quink Blue Aurora Ipsilon M
INSERT INTO WaterReviews (writing_sample_id, user_id, waterproofness, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/parker_quink_blue_aurora_ipsilon_italia_150_m_clairefontaine.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'partially legible', 1, NOW(), NOW());
INSERT INTO WaterReviews (writing_sample_id, user_id, waterproofness, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/parker_quink_blue_aurora_ipsilon_italia_150_m_mnemosyne.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'partially legible', 1, NOW(), NOW());
INSERT INTO WaterReviews (writing_sample_id, user_id, waterproofness, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/parker_quink_blue_aurora_ipsilon_italia_150_m_rhodia.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'partially legible', 1, NOW(), NOW());

-- WaterReviews Diamine Ancient Copper Pelikan Souveran M400 B
INSERT INTO WaterReviews (writing_sample_id, user_id, waterproofness, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/diamine_ancient_copper_pelikan_souveran_m400_b_amazon_20lb_printer.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'fully legible', 1, NOW(), NOW());
INSERT INTO WaterReviews (writing_sample_id, user_id, waterproofness, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/diamine_ancient_copper_pelikan_souveran_m400_b_amazon_56_gsm.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'none', 1, NOW(), NOW());
INSERT INTO WaterReviews (writing_sample_id, user_id, waterproofness, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/diamine_ancient_copper_pelikan_souveran_m400_b_clairefontaine.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'none', 1, NOW(), NOW());
INSERT INTO WaterReviews (writing_sample_id, user_id, waterproofness, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/diamine_ancient_copper_pelikan_souveran_m400_b_mead_spiral_notebook.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'partially legible', 1, NOW(), NOW());
INSERT INTO WaterReviews (writing_sample_id, user_id, waterproofness, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/diamine_ancient_copper_pelikan_souveran_m400_b_mnemosyne.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'none', 1, NOW(), NOW());
INSERT INTO WaterReviews (writing_sample_id, user_id, waterproofness, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/diamine_ancient_copper_pelikan_souveran_m400_b_rhodia.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'none', 1, NOW(), NOW());

-- DryingReviews
-- DryingReviews Momiji Pilot Metropolitan M
INSERT INTO DryingReviews (writing_sample_id, user_id, drying_time, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/iroshizuku_momiji_pilot_metropolitan_m_clairefontaine.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        '20s', 1, NOW(), NOW());
INSERT INTO DryingReviews (writing_sample_id, user_id, drying_time, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/iroshizuku_momiji_pilot_metropolitan_m_mnemosyne.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        '15s', 1, NOW(), NOW());
INSERT INTO DryingReviews (writing_sample_id, user_id, drying_time, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/iroshizuku_momiji_pilot_metropolitan_m_rhodia.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        '15s', 1, NOW(), NOW());

-- DryingReviews Noodler's Ink Apache Sunset Pilot Metropolitan B
INSERT INTO DryingReviews (writing_sample_id, user_id, drying_time, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/noodlers_ink_apache_sunset_pilot_metropolitan_b_clairefontaine.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        '25s', 1, NOW(), NOW());
INSERT INTO DryingReviews (writing_sample_id, user_id, drying_time, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/noodlers_ink_apache_sunset_pilot_metropolitan_b_mnemosyne.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        '+60s', 1, NOW(), NOW());
INSERT INTO DryingReviews (writing_sample_id, user_id, drying_time, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/noodlers_ink_apache_sunset_pilot_metropolitan_b_rhodia.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        '25s', 1, NOW(), NOW());

-- DryingReviews Noodler's Ink Bernanke Blue Pilot Metropolitan F
INSERT INTO DryingReviews (writing_sample_id, user_id, drying_time, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/noodlers_ink_bernanke_blue_pilot_metropolitan_f_clairefontaine.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        '1s', 1, NOW(), NOW());
INSERT INTO DryingReviews (writing_sample_id, user_id, drying_time, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/noodlers_ink_bernanke_blue_pilot_metropolitan_f_mnemosyne.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        '5s', 1, NOW(), NOW());
INSERT INTO DryingReviews (writing_sample_id, user_id, drying_time, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/noodlers_ink_bernanke_blue_pilot_metropolitan_f_rhodia.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        '1s', 1, NOW(), NOW());

-- DryingReviews Parker Quink Blue Aurora Ipsilon M
INSERT INTO DryingReviews (writing_sample_id, user_id, drying_time, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/parker_quink_blue_aurora_ipsilon_italia_150_m_clairefontaine.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        '10s', 1, NOW(), NOW());
INSERT INTO DryingReviews (writing_sample_id, user_id, drying_time, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/parker_quink_blue_aurora_ipsilon_italia_150_m_mnemosyne.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        '10s', 1, NOW(), NOW());
INSERT INTO DryingReviews (writing_sample_id, user_id, drying_time, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/parker_quink_blue_aurora_ipsilon_italia_150_m_rhodia.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        '10s', 1, NOW(), NOW());

-- DryingReviews Diamine Ancient Copper Pelikan Souveran M400 B
INSERT INTO DryingReviews (writing_sample_id, user_id, drying_time, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/diamine_ancient_copper_pelikan_souveran_m400_b_amazon_20lb_printer.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        '1s', 1, NOW(), NOW());
INSERT INTO DryingReviews (writing_sample_id, user_id, drying_time, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/diamine_ancient_copper_pelikan_souveran_m400_b_amazon_56_gsm.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        '4s', 1, NOW(), NOW());
INSERT INTO DryingReviews (writing_sample_id, user_id, drying_time, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/diamine_ancient_copper_pelikan_souveran_m400_b_clairefontaine.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        '25s', 1, NOW(), NOW());
INSERT INTO DryingReviews (writing_sample_id, user_id, drying_time, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/diamine_ancient_copper_pelikan_souveran_m400_b_mead_spiral_notebook.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        '2s', 1, NOW(), NOW());
INSERT INTO DryingReviews (writing_sample_id, user_id, drying_time, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/diamine_ancient_copper_pelikan_souveran_m400_b_mnemosyne.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        '60s', 1, NOW(), NOW());
INSERT INTO DryingReviews (writing_sample_id, user_id, drying_time, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/diamine_ancient_copper_pelikan_souveran_m400_b_rhodia.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        '60s', 1, NOW(), NOW());


-- TransparencyReviews
-- TransparencyReviews Momiji Pilot Metropolitan M
INSERT INTO TransparencyReviews (writing_sample_id, user_id, transparency, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/iroshizuku_momiji_pilot_metropolitan_m_clairefontaine.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'none', 1, NOW(), NOW());
INSERT INTO TransparencyReviews (writing_sample_id, user_id, transparency, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/iroshizuku_momiji_pilot_metropolitan_m_mnemosyne.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'none', 1, NOW(), NOW());
INSERT INTO TransparencyReviews (writing_sample_id, user_id, transparency, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/iroshizuku_momiji_pilot_metropolitan_m_rhodia.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'none', 1, NOW(), NOW());

-- TransparencyReviews Noodler's Ink Apache Sunset Pilot Metropolitan B
INSERT INTO TransparencyReviews (writing_sample_id, user_id, transparency, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/noodlers_ink_apache_sunset_pilot_metropolitan_b_clairefontaine.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'none', 1, NOW(), NOW());
INSERT INTO TransparencyReviews (writing_sample_id, user_id, transparency, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/noodlers_ink_apache_sunset_pilot_metropolitan_b_mnemosyne.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'none', 1, NOW(), NOW());
INSERT INTO TransparencyReviews (writing_sample_id, user_id, transparency, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/noodlers_ink_apache_sunset_pilot_metropolitan_b_rhodia.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'none', 1, NOW(), NOW());

-- TransparencyReviews Noodler's Ink Bernanke Blue Pilot Metropolitan F
INSERT INTO TransparencyReviews (writing_sample_id, user_id, transparency, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/noodlers_ink_bernanke_blue_pilot_metropolitan_f_clairefontaine.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'some ghosting', 1, NOW(), NOW());
INSERT INTO TransparencyReviews (writing_sample_id, user_id, transparency, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/noodlers_ink_bernanke_blue_pilot_metropolitan_f_mnemosyne.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'none', 1, NOW(), NOW());
INSERT INTO TransparencyReviews (writing_sample_id, user_id, transparency, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/noodlers_ink_bernanke_blue_pilot_metropolitan_f_rhodia.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'none', 1, NOW(), NOW());

-- TransparencyReviews Parker Quink Blue Aurora Ipsilon M
INSERT INTO TransparencyReviews (writing_sample_id, user_id, transparency, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/parker_quink_blue_aurora_ipsilon_italia_150_m_clairefontaine.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'none', 1, NOW(), NOW());
INSERT INTO TransparencyReviews (writing_sample_id, user_id, transparency, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/parker_quink_blue_aurora_ipsilon_italia_150_m_mnemosyne.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'none', 1, NOW(), NOW());
INSERT INTO TransparencyReviews (writing_sample_id, user_id, transparency, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/parker_quink_blue_aurora_ipsilon_italia_150_m_rhodia.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'none', 1, NOW(), NOW());

-- TransparencyReviews Diamine Ancient Copper Pelikan Souveran M400 B
INSERT INTO TransparencyReviews (writing_sample_id, user_id, transparency, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/diamine_ancient_copper_pelikan_souveran_m400_b_amazon_20lb_printer.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'some bleed-through', 1, NOW(), NOW());
INSERT INTO TransparencyReviews (writing_sample_id, user_id, transparency, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/diamine_ancient_copper_pelikan_souveran_m400_b_amazon_56_gsm.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'some bleed-through', 1, NOW(), NOW());
INSERT INTO TransparencyReviews (writing_sample_id, user_id, transparency, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/diamine_ancient_copper_pelikan_souveran_m400_b_clairefontaine.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'none', 1, NOW(), NOW());
INSERT INTO TransparencyReviews (writing_sample_id, user_id, transparency, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/diamine_ancient_copper_pelikan_souveran_m400_b_mead_spiral_notebook.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'some bleed-through', 1, NOW(), NOW());
INSERT INTO TransparencyReviews (writing_sample_id, user_id, transparency, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/diamine_ancient_copper_pelikan_souveran_m400_b_mnemosyne.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'none', 1, NOW(), NOW());
INSERT INTO TransparencyReviews (writing_sample_id, user_id, transparency, approved, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE original_aws_key = 'original/diamine_ancient_copper_pelikan_souveran_m400_b_rhodia.jpg'),
        (SELECT user_id From Users WHERE email='dominiclupo5318@gmail.com'),
        'none', 1, NOW(), NOW());

-- FeatheringReviews