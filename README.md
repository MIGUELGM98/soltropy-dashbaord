# Soltropy Dashboard

Dashboard IoT integrado para monitoreo de sistemas de energía renovable (solar-térmica, solar-PV, bombas de calor).

## 🚀 Características

- **Dashboard Unificado**: Vista consolidada de todos los sistemas renovables
- **Dual Role**: Portal para Homeowners y Technicians
- **Reportes Verificables**: Integración con blockchain para reportes ESG
- **Alertas en Tiempo Real**: Notificaciones de fallas y mantenimiento
- **Diagnóstico Remoto**: Herramientas para técnicos

## 🛠️ Tecnologías

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (Iconos)

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 🚢 Despliegue en Render

### Opción 1: Despliegue Automático (Recomendado)

1. Crea un repositorio en GitHub y sube este código
2. Ve a [render.com](https://render.com) → "New +" → "Static Site"
3. Conecta tu repositorio de GitHub
4. Render detectará automáticamente la configuración
5. Configura:
   - **Build Command:** `npm ci && npm run build`
   - **Publish Directory:** `dist`
6. Haz clic en "Create Static Site"

### Opción 2: Usando render.yaml

1. El archivo `render.yaml` ya está configurado
2. Ve a Render → "New +" → "Blueprint"
3. Selecciona tu repositorio
4. Render aplicará la configuración automáticamente

## 📁 Estructura del Proyecto

```
soltropy-dashboard/
├── src/
│   ├── components/
│   │   └── SoltropyDashboard.tsx  # Componente principal
│   ├── App.tsx                    # Componente raíz
│   ├── main.tsx                   # Punto de entrada
│   └── index.css                  # Estilos globales (Tailwind)
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── render.yaml                    # Configuración para Render
└── README.md
```

## 🎨 Roles de Usuario

### Homeowner
- Overview: Vista general de sistemas
- Trends: Análisis histórico y predicciones
- Reports: Reportes ESG verificables
- Alerts: Alertas y notificaciones

### Technician
- Diagnostics: Diagnóstico detallado de sensores
- Fleet: Monitoreo de múltiples instalaciones
- Maintenance: Herramientas de mantenimiento
- Setup: Configuración de nuevas instalaciones

## 📝 Notas

- El proyecto usa Vite para desarrollo rápido
- Tailwind CSS para estilos utilitarios
- TypeScript para type safety
- Optimizado para producción con build estático

## 🔗 Enlaces

- [Documentación de Vite](https://vitejs.dev/)
- [Documentación de Tailwind CSS](https://tailwindcss.com/)
- [Documentación de Render](https://render.com/docs)

