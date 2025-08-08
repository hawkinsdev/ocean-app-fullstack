# Oceans App

## Tecnologías usadas

### Frontend

- **React con Next.js:** Se eligió Next.js por ser la evolución natural frente a Create React App, que está deprecado, aportando optimizaciones en SSR y SSG.  
- **React Query:** Para manejo eficiente del estado de datos remotos y caché.  
- **Zod:** Para validación y parsing de datos de forma segura y declarativa.  
- **Axios:** Cliente HTTP configurado con interceptores para agregar el token de autenticación y manejar errores globales (por ejemplo, cerrar sesión automáticamente al recibir un 401).  
- **React Hook Form:** Para manejo y validación de formularios con bajo impacto en rendimiento.  
- **Material UI:** Biblioteca de componentes UI para un diseño limpio y consistente.  
- **Hooks personalizados:** Se crearon hooks para el manejo del estado de sesión y para extender React Query con lógica personalizada.  
- **Componente `PrivateRoute`:** Maneja rutas privadas, verificando el estado de sesión y redireccionando si es necesario.

### Backend

- **Node.js con Express:** Framework ligero para la creación de APIs REST.  
- **TypeScript:** Para tipado estricto y mejor mantenibilidad.  
- **bcrypt:** Para encriptar y validar contraseñas de usuarios.  
- **cors:** Middleware para configurar políticas de seguridad CORS.  
- **express-validator:** Para validación declarativa y segura de datos de entrada.  
- **firebase-admin:** SDK oficial para interactuar con Firestore en la nube.  
- **jsonwebtoken (JWT):** Para autenticación basada en tokens.  
- **swagger-jsdoc y swagger-ui-express:** Para documentación automática y visualización de la API.  
- **Arquitectura layered básica:** Separación clara en capas de repositorios, servicios, controladores y rutas, siguiendo patrón repository para manejar colecciones Firestore de forma generalizada.  
- **Configuración:** El archivo `config/firebase-key.json` contiene las credenciales de Firebase (reemplazar para uso personal).  
- **Documentación:** Carpeta `/docs` con toda la documentación relacionada.  
- **Modelos:** Tipados TypeScript que describen las colecciones de Firestore.  
- **Scripts:** Scripts de `seed` para crear usuarios base y utilidades para construir respuestas estándar.  
- **Validaciones:** Validadores específicos para las rutas y datos de entrada.  
- **Tests unitarios:** Implementados para controladores y repositorios.

---

## Instrucciones para correr el proyecto

### Opción 1: Usando Docker (recomendado)

1. Clona el repositorio y sitúate en la raíz del proyecto.  
2. Ejecuta:

```bash
docker-compose up --build
```

# Acceso:
# Frontend: http://localhost:3000
# Backend: http://localhost:3001
# Swagger API Docs: http://localhost:3001/docs

para detener los contenedores ejecuta
```bash
docker-compose down
```

### Opción 2: Ejecutar manualmente cada proyecto

cd backend
```bash
npm install
```

```bash
npm run dev # Modo desarrollo con ts-node-dev
```

# ó

```bash
npm run build && npm start # Producción
```

cd frontend

```bash
npm install
```

```bash
npm run dev # Desarrollo
```

```bash
# ó
npm run build && npm start # Producción
```

# Acceso:
# Frontend: http://localhost:3000
# Backend: http://localhost:3001
# Swagger API Docs: http://localhost:3001/docs


### Testing en Backend
El backend cuenta con pruebas unitarias para garantizar la calidad y estabilidad del código, enfocándose principalmente en:

Controladores: Verifican que las rutas respondan correctamente según diferentes escenarios.

Repositorios: Aseguran que la interacción con Firestore se realice correctamente, simulando operaciones CRUD.

Tecnologías usadas para testing
Jest: Framework de pruebas para JavaScript y TypeScript.

Supertest: Para realizar tests de integración sobre los endpoints HTTP (simula peticiones a Express).

Cómo ejecutar las pruebas

Desde la carpeta backend:
```bash
npm install   # Instala las dependencias necesarias
```

# Ejecutar todos los tests
```bash
npm test
```

# Ejecutar tests en modo observador (ideal para desarrollo)
```bash
npm run test:watch
```

# Ejecutar solo tests unitarios
```bash
npm run test:unit
```

### Notas finales

El archivo firebase-key.json no se incluye en el repositorio por seguridad. Debes generarlo desde tu cuenta de Firebase.

Si usas Docker, asegúrate de que el archivo esté en backend/config/.
El sistema soporta login para meseros o admin y mantiene la sesión activa hasta que el token expira o es revocado.