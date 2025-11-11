CREATE DATABASE eco_tasks;
USE eco_tasks;

CREATE TABLE tarefas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(100) NOT NULL,
  categoria VARCHAR(50) NOT NULL,
  status BOOLEAN DEFAULT FALSE
);

-- inserindo dados para testes ---
INSERT INTO tarefas (titulo, categoria, status) VALUES
('Levar lixo reciclável', 'Reciclagem', FALSE),
('Desligar luzes ao sair', 'Economia de energia', TRUE),
('Plantar uma árvore', 'Meio ambiente', FALSE),
('Reutilizar garrafas', 'Reciclagem', FALSE);

SELECT * FROM tarefas; -- consultando os testes

CREATE USER 'eco_user'@'localhost' IDENTIFIED BY 'eco123';
GRANT ALL PRIVILEGES ON eco_tasks.* TO 'eco_user'@'localhost';
FLUSH PRIVILEGES;
