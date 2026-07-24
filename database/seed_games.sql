-- ============================================
-- SEED DATA: Videojuegos y Logros
-- ============================================

-- Primero insertar plataformas
INSERT INTO platforms (name) VALUES
  ('PC'),
  ('PlayStation'),
  ('Xbox'),
  ('Nintendo Switch');

-- Insertar géneros
INSERT INTO genres (name) VALUES
  ('Metroidvania'),
  ('Action'),
  ('FPS'),
  ('Co-op'),
  ('Survival Horror');

-- ============================================
-- HOLLOW KNIGHT
-- ============================================
INSERT INTO games (id, title, description, developer, publisher, total_achievements) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567801',
   'Hollow Knight',
   'Forja tu propio camino en Hollow Knight! Un épico aventura de acción a través de un vasto reino de insectos en ruinas.',
   'Team Cherry',
   'Team Cherry',
   63);

INSERT INTO game_platforms (game_id, platform_id) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567801', 1),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567801', 3),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567801', 4);

INSERT INTO game_genres (game_id, genre_id) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567801', 1),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567801', 2);

-- Logros de Hollow Knight
INSERT INTO achievements (game_id, title, description, rarity, sort_order) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567801', 'Beginning of the Journey', 'Despierta en el Mundo Hollow', 75.00, 1),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567801', 'False Knight', 'Derrota al Falso Caballero', 62.00, 2),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567801', 'Mantis Lords', 'Derrota a los Señores Mantis', 42.00, 3),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567801', 'Watcher Knights', 'Derrota a los Caballeros Vigías', 38.00, 4),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567801', 'Hollow Knight', 'Derrota al Hollow Knight', 35.00, 5),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567801', 'The Radiance', 'Derrota a La Radiance', 15.00, 6),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567801', 'Dream Slayer', 'Obtén el Aguijón del Sueño', 48.00, 7),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567801', 'Nailmaster', 'Domina el arte del clavo', 32.00, 8),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567801', 'Soul Master', 'Derrota al Maestro del Alma', 50.00, 9),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567801', 'Crystal Guardian', 'Derrota al Guardián de Cristal', 52.00, 10),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567801', 'Dung Defender', 'Derrota al Defensor deestiércol', 45.00, 11),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567801', 'Hive Knight', 'Derrota al Caballero de la Colmena', 38.00, 12),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567801', 'Grimm', 'Derrota a Grimm', 40.00, 13),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567801', 'Troupe Master Grimm', 'Derrota al Maestro de la Troupe', 28.00, 14),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567801', 'Pure Vessel', 'Derrota al Vaso Puro', 12.00, 15),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567801', 'Champion of Hallownest', 'Completa el Coliseo del Loco', 25.00, 16),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567801', 'Pantheon of Hallownest', 'Supera el Panteón de Hallownest', 8.00, 17),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567801', 'Neglectful', 'No hables con Cloth antes de su muerte', 30.00, 18),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567801', 'Hunter', 'Obtén el Diario del Cazador', 55.00, 19),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567801', 'Embrace the Void', 'Supera el Panteón de Hallownest con la Marca del Alma', 5.00, 20);

-- ============================================
-- HOLLOW KNIGHT: SILKSONG
-- ============================================
INSERT INTO games (id, title, description, developer, publisher, total_achievements) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567802',
   'Hollow Knight: Silksong',
   'Viaja a un mundo completamente nuevo en Hollow Knight: Silksong. Explora las tierras de Pharloom como Hornet.',
   'Team Cherry',
   'Team Cherry',
   55);

INSERT INTO game_platforms (game_id, platform_id) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567802', 1),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567802', 3),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567802', 4);

INSERT INTO game_genres (game_id, genre_id) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567802', 1),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567802', 2);

-- Logros de Silksong (basados en información disponible)
INSERT INTO achievements (game_id, title, description, rarity, sort_order) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567802', 'First Flight', 'Escapa de la Prisión de PHARLOOM', 80.00, 1),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567802', 'Needleworker', 'Obtène la Aguja de Hornet', 75.00, 2),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567802', 'Woven', 'Derrota al Primer Tejedor', 65.00, 3),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567802', 'Bellbound', 'Libera las Campanas de Pharloom', 55.00, 4),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567802', 'Silk & Soul', 'Alcanza 100% de completion', 20.00, 5),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567802', 'The Last Weaver', 'Derrota al último Tejedor', 25.00, 6),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567802', 'Sisterhood', 'Completa la línea de misiones de la Hermana', 45.00, 7),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567802', 'Mask Maker', 'Crea 10 máscaras diferentes', 50.00, 8),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567802', 'Speedrunner', 'Completa el juego en menos de 5 horas', 10.00, 9),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567802', 'No Damage', 'Derrota a 10 jefes sin recibir daño', 8.00, 10);

-- ============================================
-- CALL OF DUTY: MODERN WARFARE (2019)
-- ============================================
INSERT INTO games (id, title, description, developer, publisher, total_achievements) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567803',
   'Call of Duty: Modern Warfare',
   'La renovación del clásico Modern Warfare. Una campaña intensa y multijugador renovado.',
   'Infinity Ward',
   'Activision',
   45);

INSERT INTO game_platforms (game_id, platform_id) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567803', 1),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567803', 2),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567803', 3);

INSERT INTO game_genres (game_id, genre_id) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567803', 2),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567803', 3);

-- Logros de COD MW 2019
INSERT INTO achievements (game_id, title, description, rarity, sort_order) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567803', 'Piggyback', 'Completa "Emboscada"', 85.00, 1),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567803', 'Price''s Arsenal', 'Usa todas las armas del Capitán Price', 70.00, 2),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567803', 'Door Kicker', 'Mata 10 enemigos usando el francotirador del techo', 60.00, 3),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567803', 'Golden Path', 'Completa la campaña en Normal o superior', 55.00, 4),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567803', 'True Guardian', 'Completa la campaña en Veterano', 15.00, 5),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567803', 'War Hero', 'Consigue 5000 bajas en multijugador', 40.00, 6),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567803', 'Grounded', 'Completa la misión "Grounded" sin ser detectado', 35.00, 7),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567803', 'Hot Swap', 'Cambia de arma 20 veces en una misión', 50.00, 8),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567803', 'Urban Assault', 'Completa "Clean House" en 2 minutos', 25.00, 9),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567803', 'Collateral Damage', 'Mata 5 enemigos con una sola bala', 30.00, 10);

-- ============================================
-- CALL OF DUTY: BLACK OPS COLD WAR
-- ============================================
INSERT INTO games (id, title, description, developer, publisher, total_achievements) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567804',
   'Call of Duty: Black Ops Cold War',
   'La Guerra Fría se intensifica. Campaign, Zombies y multijugador clásico de Black Ops.',
   'Treyarch',
   'Activision',
   48);

INSERT INTO game_platforms (game_id, platform_id) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567804', 1),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567804', 2),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567804', 3);

INSERT INTO game_genres (game_id, genre_id) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567804', 2),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567804', 3),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567804', 4);

-- Logros de COD BOCW
INSERT INTO achievements (game_id, title, description, rarity, sort_order) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567804', 'Nowhere to Hide', 'Completa "Nowhere to Hide"', 80.00, 1),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567804', 'Break on Through', 'Completa la campaña', 65.00, 2),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567804', 'Redlight, Greenlight', 'Sobrevive el bombardeo nuclear', 50.00, 3),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567804', 'Desperate Measures', 'Completa la misión en Moscú', 55.00, 4),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567804', 'Die Pie Die', 'Derrota a Die Maschine en Zombies', 45.00, 5),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567804', 'Terra Maledicta', 'Completa el Easter Egg de Terra Maledicta', 25.00, 6),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567804', 'Forsaken', 'Completa el Easter Egg de Forsaken', 20.00, 7),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567804', 'Zombie Slayer', 'Mata 5000 zombis en total', 35.00, 8),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567804', 'Crafty', 'Crea 100 armas en el Pack-a-Punch', 30.00, 9),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567804', 'Multi-Intel', 'Encuentra todos los intel en la campaña', 18.00, 10);

-- ============================================
-- LEFT 4 DEAD 2
-- ============================================
INSERT INTO games (id, title, description, developer, publisher, total_achievements) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567805',
   'Left 4 Dead 2',
   'El cooperativo de supervivencia definitivo. Lucha contra hordas de zombis en 5 campañas épicas.',
   'Valve',
   'Valve',
   50);

INSERT INTO game_platforms (game_id, platform_id) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567805', 1),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567805', 3);

INSERT INTO game_genres (game_id, genre_id) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567805', 3),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567805', 4),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567805', 5);

-- Logros de Left 4 Dead 2
INSERT INTO achievements (game_id, title, description, rarity, sort_order) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567805', 'No-one Left Behind', 'Completa la campaña Dead Center', 70.00, 1),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567805', 'Headache', 'Completa Dark Carnival', 65.00, 2),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567805', 'Spittlelicious', 'Completa Swamp Fever', 60.00, 3),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567805', 'Hardball', 'Completa Hard Rain', 55.00, 4),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567805', 'The Parish', 'Completa The Parish', 50.00, 5),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567805', 'Zombicidal Maniac', 'Mata 1000 zombis con armas de fuego', 45.00, 6),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567805', 'Tour of Duty', 'Completa todas las campañas en Normal', 40.00, 7),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567805', 'Stand Tall', 'Completa todas las campañas en Expert', 15.00, 8),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567805', 'Scatternut', 'Mata un Boomer con un bate de béisbol', 55.00, 9),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567805', 'Guardin'' Gnome', 'Lleva al gnome a la camioneta en Dead Center', 35.00, 10),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567805', 'Unbreakable', 'Sobrevive sin ser incendiado por un Boomer', 60.00, 11),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567805', 'Tank Buster', 'Mata un Tank con una granada RPG', 30.00, 12),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567805', 'Hunter Punter', 'Mata un Hunter en pleno salto', 50.00, 13),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567805', 'Smash Hit', 'Mata 500 zombis con armas cuerpo a cuerpo', 38.00, 14),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567805', 'Dead Stop', 'Mata un Tank con una escopeta en la cabeza', 20.00, 15),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567805', 'Confederacy of Crumbs', 'Recoge todos los pile-acá en una campaña', 25.00, 16),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567805', 'One Thousand Deaths', 'Muere 1000 veces en total', 45.00, 17),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567805', 'Army of Darkness', 'Mata 100 zombis con el katana', 32.00, 18),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567805', 'Stomach Upset', 'Mata un Spitter antes de que escupa', 40.00, 19),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567805', 'Second Wind', 'Sobrevive a un incendio de molotov', 55.00, 20);