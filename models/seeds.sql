-- Users
INSERT INTO Users (email, password, level, approved, created_at, updated_at)
VALUES ('dominiclupo5318@gmail.com', 'password0', 'admin', 1, NOW(), NOW());
INSERT INTO Users (email, password, level, approved, created_at, updated_at)
VALUES ('fake1@gmail.com', 'password1', 'user', 1, NOW(), NOW());
INSERT INTO Users (email, password, level, approved, created_at, updated_at)
VALUES ('fake2@gmail.com', 'password2', 'user', 0, NOW(), NOW());

-- Inks
INSERT INTO Inks (brand, name, approved, created_at, updated_at)
VALUES ('parker quink', 'blue', 1, NOW(), NOW());
INSERT INTO Inks (brand, name, approved, created_at, updated_at)
VALUES ('pilot iroshizuku', 'momiji', 1, NOW(), NOW());

-- Papers
INSERT INTO Papers (brand, name, style, lbs, grams, approved, created_at, updated_at) 
VALUES ('amazon', 'printer', 'plain', '20', NULL, 1, NOW(), NOW());
INSERT INTO Papers (brand, name, style, lbs, grams, approved, created_at, updated_at) 
VALUES ('amazon', 'notebook', 'lined', NULL, '56', 1, NOW(), NOW());

-- Pens
INSERT INTO Pens (brand, model, approved, created_at, updated_at)
VALUES ('pelikan', 'souveran m400', 1, NOW(), NOW());
INSERT INTO Pens (brand, model, approved, created_at, updated_at)
VALUES ('pilot', 'metropolitan', 1, NOW(), NOW());

-- Nibs
INSERT INTO Nibs (size, grind, tune, approved, created_at, updated_at)
VALUES ('b', 'standard', 'factory', 1, NOW(), NOW());
INSERT INTO Nibs (size, grind, tune, approved, created_at, updated_at)
VALUES ('m', 'italic', 'custom', 1, NOW(), NOW());

-- PenNibs
INSERT INTO PenNibs (pen_id, nib_id, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pelikan' AND model = 'souveran m400'),
       (SELECT nib_id FROM Nibs WHERE size = 'b' AND grind = 'standard' AND tune = 'factory'), 
       1, NOW(), NOW());
INSERT INTO PenNibs (pen_id, nib_id, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pelikan' AND model = 'souveran m400'),
       (SELECT nib_id FROM Nibs WHERE size = 'm' AND grind = 'italic' AND tune = 'custom'), 
       1, NOW(), NOW());

-- Writing Samples
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, url, approved, created_at, updated_at)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pelikan' AND model = 'souveran m400'),
       (SELECT nib_id FROM Nibs WHERE size = 'b' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'parker quink' AND name = 'blue'),
       (SELECT paper_id FROM Papers WHERE brand = 'amazon' AND name = 'printer' AND style = 'plain' AND 
       lbs = '20'), 'fpinks.com', 1, NOW(), NOW());

-- Reviews
INSERT INTO Reviews (writing_sample_id, user_id, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE url = 'fpinks.com'), 
        (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
        NOW(), NOW());
INSERT INTO Reviews (writing_sample_id, user_id, created_at, updated_at)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE url = 'fpinks.com'), 
        (SELECT user_id FROM Users WHERE email = 'fake1@gmail.com'),
        NOW(), NOW());

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
VALUES ('white', NOW(), NOW()); 

-- ColorReviews
INSERT INTO ColorReviews (review_id, color_id, created_at, updated_at)
VALUES ((SELECT review_id FROM Reviews WHERE writing_sample_id = 
        (SELECT writing_sample_id FROM WritingSamples WHERE url = 'fpinks.com') AND user_id = 
        (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com')), 
        (SELECT color_id FROM Colors where name = 'blue'),
        NOW(), NOW());

-- ShadingReviews
INSERT INTO ShadingReviews (review_id, color_id, amount, created_at, updated_at)
VALUES ((SELECT review_id FROM Reviews WHERE writing_sample_id = 
        (SELECT writing_sample_id FROM WritingSamples WHERE url = 'fpinks.com') AND user_id = 
        (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com')), 
        (SELECT color_id FROM Colors where name = 'blue'),
        'full', NOW(), NOW());


-- SheenReviews
INSERT INTO SheenReviews (review_id, color_id, amount, created_at, updated_at)
VALUES ((SELECT review_id FROM Reviews WHERE writing_sample_id = 
        (SELECT writing_sample_id FROM WritingSamples WHERE url = 'fpinks.com') AND user_id = 
        (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com')), 
        (SELECT color_id FROM Colors where name = 'blue'),
        'none', NOW(), NOW());
