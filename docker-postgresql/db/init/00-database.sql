/*Connecting to the database automatically creates it*/
\connect checkerdb;

/*Create user table in public schema*/
CREATE TABLE public.word (
    id SERIAL PRIMARY KEY,
    text TEXT,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE public.word IS
'SpellCheckerDB words.';