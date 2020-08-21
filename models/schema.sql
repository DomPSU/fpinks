SET FOREIGN_KEY_CHECKS=0; 

-- Users
DROP TABLE IF EXISTS Users;
Create TABLE Users(
  user_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  level VARCHAR(10) NOT NULL,
  approved TINYINT NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL
);

-- Inks
DROP TABLE IF EXISTS Inks;
Create TABLE Inks(
  ink_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  brand VARCHAR(100) NOT NULL,
  name VARCHAR(100) NOT NULL,
  approved TINYINT NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL
);

-- Papers
DROP TABLE IF EXISTS Papers;
Create TABLE Papers(
  paper_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  brand VARCHAR(100) NOT NULL,
  name VARCHAR(100),
  style VARCHAR(10) NOT NULL,
  lbs VARCHAR(10), -- TODO make NOT NULL and fix seeds
  grams  VARCHAR(10), -- TODO make NOT NULL and fix seeds
  approved TINYINT NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL
);

-- Pens
DROP TABLE IF EXISTS Pens;
Create TABLE Pens(
  pen_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  brand VARCHAR(100) NOT NULL,
  model VARCHAR(255) NOT NULL,
  approved TINYINT NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL
);

-- Nibs
DROP TABLE IF EXISTS Nibs;
Create TABLE Nibs(
  nib_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  size VARCHAR(10) NOT NULL,
  grind VARCHAR(100) NOT NULL,
  tune VARCHAR(10) NOT NULL,
  approved TINYINT NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL
);

-- PenNibs
DROP TABLE IF EXISTS PenNibs;
Create TABLE PenNibs(
  pen_id INT NOT NULL,
  nib_id INT NOT NULL,
  approved TINYINT NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
    CONSTRAINT PK_PenNibs PRIMARY KEY
  (
    pen_id,
    nib_id
  ),
  FOREIGN KEY (pen_id) REFERENCES Pens (pen_id),
  FOREIGN KEY (nib_id) REFERENCES Nibs (nib_id)
);

-- WritingSamples
DROP TABLE IF EXISTS WritingSamples;
Create TABLE WritingSamples(
  writing_sample_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  pen_id INT NOT NULL,
  nib_id INT NOT NULL,
  ink_id INT NOT NULL,
  paper_id INT NOT NULL,
  url VARCHAR(2083) NOT NULL,
-- TODO valid_waterproofness_review TINYINT NOT NULL 
-- TODO vaid_transparency_review TINYINT NOT NULL 
-- TODO split transparency_review into showthrough and bleedthrough ??
-- TODO vaid drying_time TINYINT NOT NULL 
  approved TINYINT NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  FOREIGN KEY (ink_id) REFERENCES Inks (ink_id),
  FOREIGN KEY (paper_id) REFERENCES Papers (paper_id),
  FOREIGN KEY (pen_id, nib_id) REFERENCES PenNibs (pen_id, nib_id)
);

-- Reviews
DROP TABLE IF EXISTS Reviews;
Create TABLE Reviews(
  review_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  writing_sample_id INT NOT NULL,
  user_id INT NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  FOREIGN KEY (writing_sample_id) REFERENCES WritingSamples (writing_sample_id),
  FOREIGN KEY (user_id) REFERENCES Users (user_id)
);

-- Colors
DROP TABLE IF EXISTS Colors;
Create TABLE Colors(
  color_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  name VARCHAR(10) NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL
);

-- ColorReviews
DROP TABLE IF EXISTS ColorReviews;
Create TABLE ColorReviews(
  Constraint PK_ColorReviews PRIMARY KEY
  (
    review_id,
    color_id
  ), 
  review_id INT NOT NULL,
  color_id INT NOT NULL,
  FOREIGN KEY (review_id) REFERENCES Reviews (review_id),
  FOREIGN KEY (color_id) REFERENCES Colors (color_id),
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL
);

-- ShadingReviews 
DROP TABLE IF EXISTS ShadingReviews;
Create TABLE ShadingReviews(
  Constraint PK_ShadingReviews PRIMARY KEY
  (
    review_id,
    color_id
  ),
  review_id INT NOT NULL,
  color_id INT NOT NULL,
  amount VARCHAR(10) NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  FOREIGN KEY (review_id) REFERENCES Reviews (review_id),
  FOREIGN KEY (color_id) REFERENCES Colors (color_id)
);

-- SheenReviews 
DROP TABLE IF EXISTS SheenReviews;
Create TABLE SheenReviews(
  CONSTRAINT PK_SheenReviews PRIMARY KEY
  (
    review_id,
    color_id 
  ),
  review_id INT NOT NULL,
  color_id INT NOT NULL,
  amount varchar(10) NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  FOREIGN KEY (review_id) REFERENCES Reviews (review_id),
  FOREIGN KEY (color_id) REFERENCES Colors (color_id)
);

SET FOREIGN_KEY_CHECKS=1;
