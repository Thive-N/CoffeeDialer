CREATE TABLE Beans(
  beans_id integer PRIMARY KEY,
  name varchar(50),
  roast varchar(6),
  company varchar(50),
  roast_date Date,
  
  CHECK (roast IN ('light','medium','dark'))
);

CREATE TABLE Brew(
  brew_id integer PRIMARY KEY,
  beans_id integer,
  brew_date Date,
  brew_time integer,
  grind_in integer,
  coffee_out integer,
  grind_size integer,
  
  FOREIGN KEY (beans_id) REFERENCES Beans(beans_id)
);

CREATE TABLE Rating(
  rating_id integer PRIMARY KEY,
  brew_id integer,
  rating integer,
  notes text,
  bitterness integer,
  acidity integer,
  
  FOREIGN KEY (brew_id) REFERENCES Brew(brew_id)
);

