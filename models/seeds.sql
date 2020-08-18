-- Users
INSERT INTO Users (email, password, level, createdAt, updatedAt)
VALUES ('dominiclupo5318@gmail.com', 'password1', 'admin', NOW(), NOW());
INSERT INTO Users (email, password, level,  createdAt, updatedAt)
VALUES ('fake@gmail.com', 'password2', 'user', NOW(), NOW());

-- Inks
INSERT INTO Inks (brand, model, color, createdAt, updatedAt)
VALUES ('parker', 'quink', 'blue', NOW(), NOW());
INSERT INTO Inks (brand, model, color, createdAt, updatedAt)
VALUES ('pilot', 'iroshizuku', 'momiji', NOW(), NOW());

-- Papers
INSERT INTO Papers (brand, name, style, lbs, grams, createdAt, updatedAt) 
VALUES ('amazon', 'printer', 'plain', '20', NULL, NOW(), NOW());
INSERT INTO Papers (brand, name, style, lbs, grams, createdAt, updatedAt) 
VALUES ('amazon', 'notebook', 'lined', NULL, '56', NOW(), NOW());

-- Pens
INSERT INTO Pens (brand, model, createdAt, updatedAt)
VALUES ('pelikan', 'souveran m400', NOW(), NOW());
INSERT INTO Pens (brand, model, createdAt, updatedAt)
VALUES ('pilot', 'metropolitan', NOW(), NOW());

-- Nibs
INSERT INTO Nibs (size, grind, tune, createdAt, updatedAt)
VALUES ('b', 'standard', 'factory', NOW(), NOW());
INSERT INTO Nibs (size, grind, tune, createdAt, updatedAt)
VALUES ('m', 'italic', 'custom', NOW(), NOW());

-- PenNibs
INSERT INTO PenNibs (pen_id, nib_id, createdAt, updatedAt)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pelikan' AND model = 'souveran m400'),
       (SELECT nib_id FROM Nibs WHERE size = 'b' AND grind = 'standard' AND tune = 'factory'),
       NOW(), NOW());
INSERT INTO PenNibs (pen_id, nib_id, createdAt, updatedAt)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pelikan' AND model = 'souveran m400'),
       (SELECT nib_id FROM Nibs WHERE size = 'm' AND grind = 'italic' AND tune = 'custom'),
        NOW(), NOW());

-- Writing Samples
INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, url, createdAt, updatedAt)
VALUES((SELECT pen_id FROM Pens WHERE brand = 'pelikan' AND model = 'souveran m400'),
       (SELECT nib_id FROM Nibs WHERE size = 'b' AND grind = 'standard' AND tune = 'factory'),
       (SELECT ink_id FROM Inks WHERE brand = 'parker' AND model = 'quink' AND color = 'blue'),
       (SELECT paper_id FROM Papers WHERE brand = 'amazon' AND name = 'printer' AND style = 'plain' AND 
       lbs = '20'), 'fpinks.com', NOW(), NOW());

-- Reviews
INSERT INTO Reviews (writing_sample_id, user_id, createdAt, updatedAt)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE url = 'fpinks.com'), 
        (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com'),
        NOW(), NOW());
INSERT INTO Reviews (writing_sample_id, user_id, createdAt, updatedAt)
VALUES ((SELECT writing_sample_id FROM WritingSamples WHERE url = 'fpinks.com'), 
        (SELECT user_id FROM Users WHERE email = 'fake@gmail.com'),
        NOW(), NOW());

-- Colors
INSERT INTO Colors (name, createdAt, updatedAt)
VALUES ('red', NOW(), NOW()); 
INSERT INTO Colors (name, createdAt, updatedAt)
VALUES ('orange', NOW(), NOW()); 
INSERT INTO Colors (name, createdAt, updatedAt)
VALUES ('yellow', NOW(), NOW()); 
INSERT INTO Colors (name, createdAt, updatedAt)
VALUES ('green', NOW(), NOW()); 
INSERT INTO Colors (name, createdAt, updatedAt)
VALUES ('blue', NOW(), NOW()); 
INSERT INTO Colors (name, createdAt, updatedAt)
VALUES ('purple', NOW(), NOW()); 
INSERT INTO Colors (name, createdAt, updatedAt)
VALUES ('pink', NOW(), NOW()); 
INSERT INTO Colors (name, createdAt, updatedAt)
VALUES ('black', NOW(), NOW()); 
INSERT INTO Colors (name, createdAt, updatedAt)
VALUES ('grey', NOW(), NOW()); 
INSERT INTO Colors (name, createdAt, updatedAt)
VALUES ('brown', NOW(), NOW()); 
INSERT INTO Colors (name, createdAt, updatedAt)
VALUES ('white', NOW(), NOW()); 

-- ColorReviews
INSERT INTO ColorReviews (review_id, color_id, createdAt, updatedAt)
VALUES ((SELECT review_id FROM Reviews WHERE writing_sample_id = 
        (SELECT writing_sample_id FROM WritingSamples WHERE url = 'fpinks.com') AND user_id = 
        (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com')), 
        (SELECT color_id FROM Colors where name = 'blue'),
        NOW(), NOW());

-- ShadingReviews
INSERT INTO ShadingReviews (review_id, color_id, amount, createdAt, updatedAt)
VALUES ((SELECT review_id FROM Reviews WHERE writing_sample_id = 
        (SELECT writing_sample_id FROM WritingSamples WHERE url = 'fpinks.com') AND user_id = 
        (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com')), 
        (SELECT color_id FROM Colors where name = 'blue'),
        'full', NOW(), NOW());


-- SheenReviews
INSERT INTO SheenReviews (review_id, color_id, amount, createdAt, updatedAt)
VALUES ((SELECT review_id FROM Reviews WHERE writing_sample_id = 
        (SELECT writing_sample_id FROM WritingSamples WHERE url = 'fpinks.com') AND user_id = 
        (SELECT user_id FROM Users WHERE email = 'dominiclupo5318@gmail.com')), 
        (SELECT color_id FROM Colors where name = 'blue'),
        'none', NOW(), NOW());


