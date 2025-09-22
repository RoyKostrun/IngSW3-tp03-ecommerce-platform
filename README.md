# TP03 - Plataforma E-commerce Azure DevOps

## Descripción
Plataforma de comercio electrónico desarrollada para demostrar el uso completo de Azure DevOps en el TP03 de Ingeniería de Software 3. Este proyecto implementa un flujo ágil completo desde la planificación hasta el desarrollo, utilizando todas las herramientas de Azure DevOps.

## 🔗 Acceso al Proyecto Azure DevOps

**URL del Proyecto:** https://dev.azure.com/rbkostrun/TP03
- **Organización:** dev.azure.com/rbkostrun (Owner) 
- **Proyecto:** TP03
- **Proceso:** Agile
- **Repositorio:** IngSW3-tp03-ecommerce-platform

## 🚀 Funcionalidades Implementadas

### Sistema Completo
- ✅ **Autenticación de usuarios** con validación mejorada
- ✅ **Catálogo de productos** con búsqueda y filtros
- ✅ **Carrito de compras** funcional
- ✅ **API REST** backend con Express.js
- ✅ **Interfaz responsive** con HTML5/CSS3/JavaScript

### Azure DevOps Integration
- ✅ **Work Items organizados:** 1 Epic, 3 User Stories, 6 Tasks, 2 Bugs
- ✅ **Sprints configurados:** Iteraciones de 2 semanas
- ✅ **Políticas de branch:** Pull Request obligatorio, reviewers mínimos
- ✅ **Control de versiones:** Git con feature branches
- ✅ **Trazabilidad completa:** Commits vinculados a work items

## 🏗️ Arquitectura y Tecnologías

### Frontend
- **HTML5:** Estructura semántica responsive
- **CSS3:** Diseño moderno con gradients y animaciones
- **JavaScript (Vanilla):** Funcionalidad interactiva sin frameworks
- **Responsive Design:** Compatible con dispositivos móviles

### Backend  
- **Node.js:** Runtime de JavaScript
- **Express.js:** Framework web minimalista
- **API REST:** Endpoints para productos, autenticación y carrito
- **CORS:** Configurado para desarrollo local

### DevOps Tools
- **Azure DevOps:** Planificación, repositorios, CI
- **Git:** Control de versiones distribuido
- **GitHub:** Repositorio principal y backup
- **Metodología Agile:** Con Azure Boards

## 📁 Estructura del Proyecto

```
IngSW3-tp03-ecommerce-platform/
├── src/
│   ├── frontend/
│   │   ├── index.html          # Página principal
│   │   ├── styles.css          # Estilos responsive
│   │   └── app.js              # Lógica del cliente
│   └── backend/
│       ├── server.js           # Servidor Express
│       └── package.json        # Dependencias Node.js
├── README.md                   # Este archivo
└── decisiones.md              # Justificaciones técnicas
```

## ⚙️ Instalación y Ejecución

### Prerrequisitos
- **Node.js** (versión 16 o superior)
- **Git** (para clonar el repositorio)
- **Navegador moderno** (Chrome, Firefox, Safari)

### Paso 1: Clonar el Repositorio
```bash
# Clonar desde GitHub
git clone https://github.com/RoyKostrun/IngSW3-tp03-ecommerce-platform.git

# Navegar al directorio
cd IngSW3-tp03-ecommerce-platform
```

### Paso 2: Configurar el Backend
```bash
# Navegar al backend
cd src/backend

# Instalar dependencias
npm install

# Iniciar el servidor
npm start
```

El servidor se ejecutará en `http://localhost:3000`

### Paso 3: Acceder a la Aplicación
1. **Abrir navegador** en: http://localhost:3000
2. **API Health Check:** http://localhost:3000/api/health
3. **API de productos:** http://localhost:3000/api/products

## ⚙️ Pipelines y CI

### Azure Pipeline Configurado
- **Pipeline ID:** #20250922.1
- **Status:** Configurado y ejecutándose
- **Trigger:** Automático en push a main y feature branches
- **Build Agent:** ubuntu-latest (hosted agent)

### Historial de Builds
- **Build #20250922.1:** "Set up CI with Azure Pipelines for TP03"
  - Duration: 25 segundos
  - Status: Failed (por configuración de npm build)
  - Pull Request: Generado automáticamente
  - Branch: azure-pipelines (creado por políticas de branch)

### Pipeline Configuration (azure-pipelines.yml)
```yaml
trigger:
- main

pool:
  vmImage: 'ubuntu-latest'

steps:
- task: NodeTool@0
  inputs:
    versionSpec: '20.x'
  displayName: 'Install Node.js'

- script: |
    npm install
    npm run build
  displayName: 'npm install and build'
```

### Para Ejecutar Pipelines
```bash
# El pipeline se ejecuta automáticamente en Azure DevOps
# Para desarrollo local:
cd src/backend
npm install    # Instalar dependencias
npm start      # Iniciar servidor local
```

### Build Status
- **Continuous Integration:** Configurado y activo
- **Build Validation:** Políticas de branch requieren builds exitosos
- **Pull Request Integration:** Automático con políticas de calidad

## 📋 Work Items y Metodología

### Epic Principal
**"Plataforma E-commerce Completa"** - Funcionalidad integral de comercio electrónico

### User Stories Implementadas
1. **US #30:** Como usuario quiero registrarme e iniciar sesión
2. **US #31:** Como usuario quiero navegar productos  
3. **US #32:** Como usuario quiero agregar productos al carrito

### Tasks Técnicas (6 total)
- Implementar API endpoints de autenticación
- Crear componentes de interfaz de autenticación  
- Implementar API de productos
- Desarrollar interfaz de catálogo
- Crear lógica del carrito de compras
- Desarrollar interfaz del carrito

### Bugs Documentados (2 ejemplos)
- Error de validación en formulario de registro
- Productos duplicados en resultados de búsqueda

### Sprint Planning
- **Sprint 1:** Autenticación + Catálogo (US #30, #31)
- **Sprint 2:** Carrito de compras (US #32)

## 🔄 Flujo de Desarrollo

### Feature Branches Creadas
```bash
# Branch 1: Autenticación mejorada
feature/user-authentication-improvements

# Branch 2: Mejoras del catálogo  
feature/product-catalog-enhancements
```

### Políticas de Branch Configuradas
- **Pull Request obligatorio** para branch main
- **Mínimo 1 reviewer** requerido
- **Check for linked work items** activado
- **Comment resolution** requerida
- **Merge types:** Squash merge permitido

### Commits Realizados
Todos los commits incluyen:
- Descripción detallada de cambios
- Vinculación a User Stories específicas
- Mensajes descriptivos siguiendo convenciones



### Seguridad
- **CORS:** Configurado apropiadamente
- **Input validation:** Sanitización básica
- **Error messages:** No exposición de información sensible

## 📊 Métricas del Proyecto

### Estadísticas de Código
- **Archivos creados:** 5 archivos principales
- **Líneas de código:** ~567 líneas
- **Commits:** 8 commits con mensajes descriptivos
- **Branches:** 3 branches (main + 2 features)

### Work Items Completion
- **Epic:** 1/1 (100%)
- **User Stories:** 3/3 (100%) 
- **Tasks:** 6/6 (100%)
- **Bugs:** 2/2 documentados (100%)

## 🤝 Colaboración y Revisión

### Code Review Process
- **Feature branches** creados para cada funcionalidad
- **Pull Requests** con descripción detallada
- **Vinculación** automática con work items
- **Review** obligatorio antes de merge

### Trazabilidad
- Cada commit vinculado a User Story específica
- Work items organizados por áreas técnicas
- Historiales completos en Azure DevOps

## 🚧 Limitaciones Conocidas

### Sincronización GitHub-Azure DevOps
- **Problema:** Feature branches no se sincronizaron automáticamente
- **Evidencia:** Branches disponibles en GitHub pero no en Azure DevOps
- **Impacto:** Pull Requests creados localmente pero no completados en Azure
- **Solución futura:** Configurar webhooks para sincronización automática

### Funcionalidades Pendientes
- **Persistencia:** Base de datos real (actualmente en memoria)
- **Autenticación:** JWT tokens y seguridad avanzada
- **Testing:** Suite de tests automatizados
- **CI/CD:** Pipeline completo de integración continua

## 📞 Soporte y Contacto

### Autor
**Roy Kostrun** - TP03 Ingeniería de Software 3

### Repositorio
- **GitHub:** https://github.com/RoyKostrun/IngSW3-tp03-ecommerce-platform
- **Azure DevOps:** [URL del proyecto]

### Documentación Adicional
- Ver `decisiones.md` para justificaciones técnicas detalladas
- Consultar Azure DevOps para work items y planificación
- Revisar commits para historial de desarrollo completo

---

**Desarrollado como demostración del uso integral de Azure DevOps para gestión ágil de proyectos de software**