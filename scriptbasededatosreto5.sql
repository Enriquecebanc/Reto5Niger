create table categorias (
id_categoria INT AUTO_INCREMENT PRIMARY KEY,
nombre_categoria VARCHAR(100) NOT NULL UNIQUE,
descripcion TEXT NULL,
imagen VARCHAR(200) NOT NULL
);

create table usuario (
id_usuario INT AUTO_INCREMENT PRIMARY KEY,
nombre_usuario VARCHAR(32) NOT NULL UNIQUE,
contraseña VARCHAR(32) NOT NULL,
correo VARCHAR(128) NOT NULL,
foto_perfil INT PRIMARY KEY AUTO_INCREMENT CHECK (valor BETWEEN 1 AND 17),
respuesta_pregunta_1 VARCHAR(40),
respuesta_pregunta_2 VARCHAR(40),
respuesta_pregunta_3 VARCHAR(40)
);

create table ingredientes (
id_ingrediente INT AUTO_INCREMENT PRIMARY KEY,
nombre_ingrediente VARCHAR(32) NOT NULL UNIQUE,
descripcion TEXT NULL,
imagen VARCHAR(200) NOT NULL
);

create table receta (
id_receta INT AUTO_INCREMENT PRIMARY KEY,
id_usuario INT,
nombre_receta VARCHAR(32) NOT NULL,
descripcion_breve VARCHAR(50) NOT NULL,
instrucciones TEXT NOT NULL,
imagen VARCHAR(200) NOT NULL,
id_categoria INT,
tiempo INT NOT NULL,
porciones INT NOT NULL,
FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria) ON DELETE SET NULL,
FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE SET NULL
);

create table comentario (
id_comentario INT AUTO_INCREMENT PRIMARY KEY,
id_usuario INT,
id_receta INT,
texto TEXT NOT NULL,
fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
valoracion TINYINT NOT NULL CHECK (valoracion BETWEEN 0 AND 5),
FOREIGN KEY (id_receta) REFERENCES receta(id_receta) ON DELETE SET NULL,
FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE SET NULL
);

create table cantidades (
id_receta INT,
id_ingrediente INT,
cantidad_ingrediente VARCHAR(40) NOT NULL,
FOREIGN KEY (id_receta) REFERENCES receta(id_receta) ON DELETE SET NULL,
FOREIGN KEY (id_ingrediente) REFERENCES ingredientes(id_ingrediente) ON DELETE SET NULL
);

INSERT INTO `reto5`.`categorias` (`id_categoria`, `nombre_categoria`, `descripcion`, `imagen`) VALUES ('1', 'Entrante', 'Platos ligeros y apetitosos para comenzar la comida, como ensaladas, sopas o aperitivos.', 'No Image');
INSERT INTO `reto5`.`categorias` (`id_categoria`, `nombre_categoria`, `descripcion`, `imagen`) VALUES ('2', 'Plato_Principal', 'Recetas sustanciosas y completas que suelen ser el eje central de la comida, como carnes, pescados o guisos.', 'No Image');
INSERT INTO `reto5`.`categorias` (`id_categoria`, `nombre_categoria`, `descripcion`, `imagen`) VALUES ('3', 'Plato_Secundario', 'Opciones que complementan el plato principal, como pastas, arroces o preparaciones con verduras.', 'No Image');
INSERT INTO `reto5`.`categorias` (`id_categoria`, `nombre_categoria`, `descripcion`, `imagen`) VALUES ('4', 'Postre', 'Dulces y delicias para cerrar la comida, como tartas, helados o flanes.', 'No Image');