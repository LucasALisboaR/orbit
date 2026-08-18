-- Migration V1: Criação da tabela base de validação para a V0 do Orbit
CREATE TABLE system_ping (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    message VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Inserção inicial de registro para validação da leitura na V0
INSERT INTO system_ping (message)
VALUES ('Orbit API V0 initialized successfully');
