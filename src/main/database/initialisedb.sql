CREATE TABLE Beans(
  beans_id int PRIMARY KEY,
  name varchar(50),
  roast varchar(6),
  company varchar(50),
  roast_date Date,
  
  CHECK (roast IN ('light','medium','dark'))
);

CREATE TABLE Brew(
  brew_id int PRIMARY KEY,
  beans_id int,
  brew_date Date,
  brew_time int,
  grind_in int,
  coffee_out int,
  grind_size int,
  
  FOREIGN KEY (beans_id) REFERENCES Beans(beans_id)
);

CREATE TABLE Rating(
  rating_id int PRIMARY KEY,
  brew_id int,
  rating int,
  notes text,
  bitterness int,
  acidity int,
  
  FOREIGN KEY (brew_id) REFERENCES Brew(brew_id)
);

