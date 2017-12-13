CREATE TYPE tax_filter AS (
    comparator text,
    pname text,
    taxname text,
    value text
);
CREATE TYPE pco_filter AS (
    comparator text,
    pname text,
    pcname text,
    value text
);
CREATE TYPE rco_filter AS (
    comparator text,
    pname text,
    pcname text,
    value text
);
CREATE TYPE pco_property AS (
    pname text,
    pcname text
);
CREATE TYPE rco_property AS (
    pname text,
    pcname text
);