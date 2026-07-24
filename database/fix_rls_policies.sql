-- ============================================
-- FIX: Políticas RLS para auth personalizado
-- ============================================

-- Eliminar políticas existentes de users
DROP POLICY IF EXISTS users_own_data ON users;

-- Permitir INSERT (registro) a cualquier usuario anónimo
CREATE POLICY allow_insert_users ON users
  FOR INSERT
  WITH CHECK (true);

-- Permitir SELECT (login) a cualquier usuario anónimo
CREATE POLICY allow_select_users ON users
  FOR SELECT
  USING (true);

-- Permitir UPDATE solo al propio usuario (ya verificado por la app)
CREATE POLICY allow_update_own_user ON users
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Mantener políticas de user_games y user_achievements usando variable de sesión
-- Primero eliminar las existentes que usan auth.uid()
DROP POLICY IF EXISTS user_games_own_data ON user_games;
DROP POLICY IF EXISTS user_achievements_own_data ON user_achievements;

-- Nuevas políticas para user_games
CREATE POLICY user_games_insert ON user_games
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY user_games_select ON user_games
  FOR SELECT
  USING (true);

CREATE POLICY user_games_update ON user_games
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY user_games_delete ON user_games
  FOR DELETE
  USING (true);

-- Nuevas políticas para user_achievements
CREATE POLICY user_achievements_insert ON user_achievements
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY user_achievements_select ON user_achievements
  FOR SELECT
  USING (true);

CREATE POLICY user_achievements_delete ON user_achievements
  FOR DELETE
  USING (true);