CREATE SCHEMA reto5;
USE reto5;

CREATE TABLE categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre_categoria VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT NULL,
    imagen VARCHAR(200) NOT NULL
);

CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(32) NOT NULL UNIQUE,
    contraseña VARCHAR(32) NOT NULL,
    correo VARCHAR(128) NOT NULL,
    foto_perfil INT,
    respuesta_pregunta_1 VARCHAR(40),
    respuesta_pregunta_2 VARCHAR(40),
    respuesta_pregunta_3 VARCHAR(40)
);

CREATE TABLE ingredientes (
    id_ingrediente INT AUTO_INCREMENT PRIMARY KEY,
    nombre_ingrediente VARCHAR(32) NOT NULL UNIQUE,
    descripcion TEXT NULL,
    imagen VARCHAR(200) NOT NULL
);

-- Tabla de alérgenos
CREATE TABLE alergenos (
    id_alergeno INT AUTO_INCREMENT PRIMARY KEY,
    nombre_alergeno VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT NULL
);

-- Relación entre ingredientes y alérgenos
CREATE TABLE ingredientes_alergenos (
    id_ingrediente INT,
    id_alergeno INT,
    PRIMARY KEY (id_ingrediente, id_alergeno),
    FOREIGN KEY (id_ingrediente) REFERENCES ingredientes(id_ingrediente) ON DELETE CASCADE,
    FOREIGN KEY (id_alergeno) REFERENCES alergenos(id_alergeno) ON DELETE CASCADE
);

CREATE TABLE receta (
    id_receta INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    nombre_receta VARCHAR(32) NOT NULL,
    descripcion_breve VARCHAR(400) NOT NULL,
    instrucciones TEXT NOT NULL,
    imagen VARCHAR(200) NOT NULL,
    id_categoria INT,
    tiempo INT NOT NULL,
    porciones INT NOT NULL,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);

CREATE TABLE comentario (
    id_comentario INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    id_receta INT,
    texto TEXT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valoracion TINYINT NOT NULL CHECK (valoracion BETWEEN 0 AND 5),
    FOREIGN KEY (id_receta) REFERENCES receta(id_receta) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);

CREATE TABLE cantidades (
    id_receta INT,
    id_ingrediente INT,
    cantidad_ingrediente VARCHAR(40) NOT NULL,
    FOREIGN KEY (id_receta) REFERENCES receta(id_receta) ON DELETE CASCADE,
    FOREIGN KEY (id_ingrediente) REFERENCES ingredientes(id_ingrediente) ON DELETE CASCADE
);

INSERT INTO categorias (id_categoria, nombre_categoria, descripcion, imagen) VALUES 
    (1, 'Entrante', 'Platos ligeros y apetitosos para comenzar la comida, como ensaladas, sopas o aperitivos.', 'No Image'),
    (2, 'Plato_Principal', 'Recetas sustanciosas y completas que suelen ser el eje central de la comida, como carnes, pescados o guisos.', 'No Image'),
    (3, 'Plato_Secundario', 'Opciones que complementan el plato principal, como pastas, arroces o preparaciones con verduras.', 'No Image'),
    (4, 'Postre', 'Dulces y delicias para cerrar la comida, como tartas, helados o flanes.', 'No Image');

CREATE USER 'admin_reto5'@'localhost' IDENTIFIED BY 'admin';
GRANT ALL PRIVILEGES ON reto5.* TO 'admin_reto5'@'localhost';

CREATE USER 'looker_reto5'@'localhost' IDENTIFIED BY 'look';
GRANT SELECT ON reto5.* TO 'looker_reto5'@'localhost';

FLUSH PRIVILEGES;

