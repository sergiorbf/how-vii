CREATE TABLE IF NOT EXISTS tipo_imovel (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(50) NOT NULL
);

INSERT INTO tipo_imovel (descricao) VALUES
('Apartamento'),
('Casa'),
('Terreno'),
('Sala Comercial'),
('Galpão');


CREATE TABLE IF NOT EXISTS imovel (
    id SERIAL PRIMARY KEY,
    codigo_imovel INT UNIQUE NOT NULL,
    descricao TEXT NOT NULL,
    id_tipo INT NOT NULL REFERENCES tipo_imovel(id)
);

INSERT INTO imovel (codigo_imovel, descricao, id_tipo) VALUES
(1001, 'Apartamento 100m² em condomínio fechado', 1),
(1002, 'Casa 120m² em bairro residencial', 2),
(1003, 'Terreno 300m² próximo ao centro', 3),
(1004, 'Sala comercial 45m² no centro', 4),
(1005, 'Galpão 500m² em zona industrial', 5),
(1006, 'Apartamento 80m² em prédio novo', 1),
(1007, 'Casa 150m² com garagem dupla', 2),
(1008, 'Terreno 200m² em loteamento novo', 3);
