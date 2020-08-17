SET FOREIGN_KEY_CHECKS=0; 

-- Users
DROP TABLE IF EXISTS Users;
Create TABLE Users(
  user_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
-- TODO admin, regular or make a separate table??
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
);

-- Inks
DROP TABLE IF EXISTS Inks;
Create TABLE Inks(
  ink_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  brand VARCHAR(100) NOT NULL,
  name VARCHAR(255) NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
);

-- Papers
-- TODO create table

-- WritingSamples
DROP TABLE IF EXISTS WritingSamples;
Create TABLE WritingSamples(
  writing_sample_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
-- TODO add PenNibs reference
  ink_id INT NOT NULL,
  url VARCHAR(2083) NOT NULL,
  valid_extra_review TINYINT NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
-- TODO add PenNibs FK referernce
  FOREIGN KEY (ink_id) REFERENCES Inks (ink_id)
);


-- Pens
DROP TABLE IF EXISTS Pens;
Create TABLE Pens(
  pen_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  brand VARCHAR(100) NOT NULL,
  model VARCHAR(255) NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
);

-- Nibs
DROP TABLE IF EXISTS Nibs;
Create TABLE Nibs(
  nib_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  size VARCHAR(10) NOT NULL,
  grind VARCHAR(100) NOT NULL,
  tune VARCHAR(10) NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
);

-- PenNibs
DROP TABLE IF EXISTS PenNibs;
Create TABLE PenNibs(
  pen_id INT NOT NULL,
  nib_id INT NOT NULL,
  CONSTRAINT PK_PenNibs PRIMARY KEY
  (
    pen_id,
    nib_id
  ),
  FOREIGN KEY (pen_id) REFERENCES Pens (pen_id),
  FOREIGN KEY (nib_id) REFERENCES Nibs (nib_id),
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
);

-- Reviews
DROP TABLE IF EXISTS Reviews;
Create TABLE Reviews(
  review_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  writing_sample_id INT NOT NULL,
  user_id INT NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  FOREIGN KEY (writing_sample_id) REFERENCES WritingSamples (writing_sample_id),
  FOREIGN KEY (user_id) REFERENCES Users (user_id)
);

-- ExtraReviews
DROP TABLE IF EXISTS ExtraReviews;
Create TABLE ExtraReviews(
  extra_review_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  writing_sample_id INT NOT NULL,
  user_id INT NOT NULL,
-- TOOD waterproofness
-- TODO drying time
-- TODO transparency
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  FOREIGN KEY (writing_sample_id) REFERENCES WritingSamples (writing_sample_id),
  FOREIGN KEY (user_id) REFERENCES Users (user_id)
);

-- Colors
DROP TABLE IF EXISTS Colors;
Create TABLE Colors(
  color_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  name VARCHAR(10) NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
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
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
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
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
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
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  FOREIGN KEY (review_id) REFERENCES Reviews (review_id),
  FOREIGN KEY (color_id) REFERENCES Colors (color_id)
);

SET FOREIGN_KEY_CHECKS=1;
