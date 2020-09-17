SET FOREIGN_KEY_CHECKS=0; 

-- Users
DROP TABLE IF EXISTS Users;
Create TABLE Users(
  user_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  username VARCHAR(20) NOT NULL,
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
  user_id INT NOT NULL,  -- TODO seeds
  low_res_aws_key VARCHAR(1024), -- TODO seeds aws_key -> low_res_aws_key
  high_res_aws_key VARCHAR(1024), -- TODO seeds
  original_aws_key VARCHAR(2014) NOT NULL, -- TODO seeds
  valid_waterproofness TINYINT NOT NULL, -- TODO seeds
  valid_transparency TINYINT NOT NULL, -- TODO seeds
  valid_drying_time TINYINT NOT NULL, -- TODO seeds
  approved TINYINT NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  FOREIGN KEY (ink_id) REFERENCES Inks (ink_id),
  FOREIGN KEY (paper_id) REFERENCES Papers (paper_id),
  FOREIGN KEY (pen_id, nib_id) REFERENCES PenNibs (pen_id, nib_id),
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
    writing_sample_id,
    user_id,
    color_id
  ), 
  writing_sample_id INT NOT NULL,
  user_id INT NOT NULL,
  color_id INT NOT NULL,
  approved TINYINT NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  FOREIGN KEY (writing_sample_id) REFERENCES WritingSamples (writing_sample_id),
  FOREIGN KEY (user_id) REFERENCES Users (user_id),
  FOREIGN KEY (color_id) REFERENCES Colors (color_id)
);

-- ShadingReviews 
DROP TABLE IF EXISTS ShadingReviews;
Create TABLE ShadingReviews(
  Constraint PK_ShadingReviews PRIMARY KEY
  (
    writing_sample_id,
    user_id
  ),
  writing_sample_id INT NOT NULL,
  user_id INT NOT NULL,
  amount varchar(10) NOT NULL,
  approved TINYINT NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  FOREIGN KEY (writing_sample_id) REFERENCES WritingSamples (writing_sample_id),
  FOREIGN KEY (user_id) REFERENCES Users (user_id)
);

-- SheenReviews 
DROP TABLE IF EXISTS SheenReviews;
Create TABLE SheenReviews(
  CONSTRAINT PK_SheenReviews PRIMARY KEY
  (
    writing_sample_id,
    user_id,
    color_id
  ),
  writing_sample_id INT NOT NULL,
  user_id INT NOT NULL,
  color_id INT NOT NULL,
  amount varchar(10) NOT NULL,
  approved TINYINT NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  FOREIGN KEY (writing_sample_id) REFERENCES WritingSamples (writing_sample_id),
  FOREIGN KEY (user_id) REFERENCES Users (user_id),
  FOREIGN KEY (color_id) REFERENCES Colors (color_id)
);

-- FeatheringReviews
DROP TABLE IF EXISTS FeatheringReviews;
Create TABLE FeatheringReviews(
  CONSTRAINT PK_FeatheringReviews PRIMARY KEY
  (
    writing_sample_id,
    user_id
  ),
  writing_sample_id INT NOT NULL,
  user_id INT NOT NULL,
  feathering VARCHAR(10) NOT NULL,
  approved TINYINT NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  FOREIGN KEY (writing_sample_id) REFERENCES WritingSamples (writing_sample_id),
  FOREIGN KEY (user_id) REFERENCES Users (user_id)
);

-- WaterReviews
DROP TABLE IF EXISTS WaterReviews;
Create TABLE WaterReviews(
  CONSTRAINT PK_WaterReviews PRIMARY KEY
  (
    writing_sample_id,
    user_id
  ),
  writing_sample_id INT NOT NULL,
  user_id INT NOT NULL,
  waterproofness VARCHAR(20) NOT NULL,
  approved TINYINT NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  FOREIGN KEY (writing_sample_id) REFERENCES WritingSamples (writing_sample_id),
  FOREIGN KEY (user_id) REFERENCES Users (user_id)
);

-- DryingReviews
DROP TABLE IF EXISTS DryingReviews;
Create TABLE DryingReviews(
  CONSTRAINT PK_DryingReviews PRIMARY KEY
  (
    writing_sample_id,
    user_id
  ),
  writing_sample_id INT NOT NULL,
  user_id INT NOT NULL,
  drying_time VARCHAR(10) NOT NULL,
  approved TINYINT NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  FOREIGN KEY (writing_sample_id) REFERENCES WritingSamples (writing_sample_id),
  FOREIGN KEY (user_id) REFERENCES Users (user_id)
);

-- TransparencyReviews
DROP TABLE IF EXISTS TransparencyReviews;
Create TABLE TransparencyReviews(
  CONSTRAINT PK_TransparencyReviews PRIMARY KEY
  (
    writing_sample_id,
    user_id
  ),
  writing_sample_id INT NOT NULL,
  user_id INT NOT NULL,
  transparency VARCHAR(25) NOT NULL,
  approved TINYINT NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  FOREIGN KEY (writing_sample_id) REFERENCES WritingSamples (writing_sample_id),
  FOREIGN KEY (user_id) REFERENCES Users (user_id)
);

SET FOREIGN_KEY_CHECKS=1;
