-- Setup Database
CREATE TABLE users (
    id VARCHAR(20) PRIMARY KEY NOT NULL,
    username VARCHAR(32) NOT NULL,
    elevated boolean NOT NULL DEFAULT false
);

CREATE TABLE game (
    id SERIAL PRIMARY KEY NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE entry (
    id SERIAL PRIMARY KEY NOT NULL,
    game INTEGER NOT NULL references game(id),
    player VARCHAR(20) NOT NULL references users(id),
    alias VARCHAR(20),
    UNIQUE (game, player)
);

CREATE TABLE frame (
    id SERIAL PRIMARY KEY NOT NULL,
    entry INTEGER NOT NULL references entry(id),
    roll_one SMALLINT NOT NULL CHECK (roll_one BETWEEN 0 AND 10),
    split boolean NOT NULL DEFAULT false,
    roll_two SMALLINT NOT NULL CHECK (roll_two BETWEEN 0 AND 10),
    extra_roll SMALLINT CHECK (extra_roll BETWEEN  0 AND 10),
    frame_number SMALLINT NOT NULL CHECK (frame_number BETWEEN 1 AND 10),
    UNIQUE (entry, frame_number)
);
