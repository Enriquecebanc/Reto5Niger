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
foto_perfil VARCHAR(200) NOT NULL
);

create table ingredientes (
id_ingrediente INT AUTO_INCREMENT PRIMARY KEY,
nombre_ingrediente VARCHAR(32) NOT NULL UNIQUE,
descripcion TEXT NULL,
imagen VARCHAR(200) NOT NULL
);

create table receta (
id_receta INT AUTO_INCREMENT PRIMARY KEY,
nombre_receta VARCHAR(32) NOT NULL,
descripcion_breve VARCHAR(50) NOT NULL,
instrucciones TEXT NOT NULL,
imagen VARCHAR(200) NOT NULL,
id_categoria INT,
tiempo INT NOT NULL,
porciones INT NOT NULL,
FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria) ON DELETE SET NULL
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