# ProyectoTopicosServer

## Propósito
Este proyecto es un servidor de ejemplo desarrollado con NestJS y TypeScript, que implementa:
- Autenticación de usuarios usando MongoDB y generación de tokens JWT.
- Manejo de canciones con operaciones CRUD básicas y control de duplicados.
- Endpoints para pruebas de feature flags y datos de ejemplo.
El objetivo es demostrar buenas prácticas de modularidad, uso de MongoDB, autenticación moderna y patrones de diseño en NestJS.

## Uso
1. **Clona el repositorio y entra a la carpeta:**
   ```bash
   git clone <url-del-repo>
   cd ProyectoTopicosServer
   ```
2. **Instala las dependencias:**
   ```bash
   npm install
   ```
3. **Asegúrate de tener MongoDB corriendo en tu máquina local** (puedes usar MongoDB Community o Atlas).
4. **Inicia el servidor NestJS:**
   ```bash
   npm run start:dev
   ```
5. **Carga los datos iniciales:**
   - Inserta usuarios con un POST a `/users/bulk` usando el JSON de `src/users/users.data.json`.
   - Inserta canciones con un POST a `/songs/bulk` usando el JSON de `src/songs/songs.data.json`.

## Endpoints principales

### Autenticación
- `POST /auth/login` — Login de usuario (username y password en el body). Devuelve un token JWT si las credenciales son correctas.
  - Ejemplo de body:
    ```json
    {
      "username": "admin",
      "password": "admin"
    }
    ```
  - Respuesta exitosa:
    ```json
    {
      "token_acceso": "<jwt-token>",
      "usuario": { "usuario": "admin", "rol": "admin" }
    }
    ```

### Usuarios
- `POST /users/bulk` — Inserta varios usuarios.
- `GET /users` — Lista todos los usuarios.
- `GET /users/:username` — Busca un usuario por username.

### Canciones
- `POST /songs/bulk` — Inserta varias canciones (no permite duplicados por nombre y artista).
- `GET /songs` — Lista todas las canciones.
- `GET /songs/artista/:artista` — Lista todas las canciones de un artista específico.
- `DELETE /songs/all` — Borra todas las canciones.


### Feature Flags (Programación Orientada a Aspectos)
- `GET /feature-flag` — Un solo endpoint que responde diferente según el rol del usuario autenticado:
  - Si no envías token, responde como invitado:
    ```json
    { "feature": "acceso-público", "enabled": true, "role": "invitado" }
    ```
  - Si envías token de usuario normal:
    ```json
    { "feature": "solo usuarios", "enabled": true, "role": "usuario" }
    ```
  - Si envías token de administrador:
    ```json
    { "feature": "solo administradores", "enabled": true, "role": "administrador" }
    ```
  - El endpoint detecta el rol usando el token JWT y responde acorde, demostrando un feature flag orientado a aspectos.


## Configuración

- El servidor usa por defecto la base de datos local de MongoDB en `mongodb://localhost:27017/proyecto-topicos`.
- Puedes cambiar la cadena de conexión en `src/app.module.ts` si usas MongoDB Atlas u otro host.
- Los datos de ejemplo para usuarios y canciones están en `src/users/users.data.json` y `src/songs/songs.data.json`.
- El secreto JWT está en `src/auth/constants.ts`.

## Notas
- El login ahora devuelve un token JWT para autenticación moderna.
- El endpoint `/songs/bulk` y `/users/bulk` devuelven un error claro si intentas insertar duplicados.
