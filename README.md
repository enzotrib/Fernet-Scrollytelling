# Fernet Scrollytelling Experience

Este repositorio es una demostración de **animaciones cinematográficas** y **scrollytelling** para la web. El objetivo es crear una experiencia inmersiva donde el usuario controla el progreso de la animación a través del desplazamiento (scroll).

## 🛠️ Herramientas y Flujo de Trabajo

El proceso de creación de esta experiencia siguió un flujo de trabajo híbrido entre IA generativa y edición tradicional:

1.  **Imágenes base**: Se partió de una imagen descargada de internet como referencia inicial.
2.  **Whisk (AI Image Generator)**: Se utilizó para generar dos versiones del frame: una con los elementos/objetos y otra limpia (sin objetos), estableciendo la base para la animación.
3.  **Kling AI**: Con los frames generados y un prompt específico, se utilizó Kling AI para animar la transición y crear el video cinematográfico.
4.  **Adobe Photoshop**: Una vez obtenido el video, se procesó en Photoshop para eliminar la marca de agua de Kling AI. Al estar en una esquina con poca acción, se utilizó una técnica de parche estático mediante capas para una limpieza impecable.
5.  **EZGIF**: El video final sin marca de agua se descompuso en una secuencia de frames individuales (JPG) para su uso en la web.
6.  **Antigravity**: Mi asistente de IA favorito, encargado de generar el script y la lógica de Astro/React para orquestar la experiencia de scrollytelling.

> [!NOTE]
> Si te interesa conocer los prompts específicos utilizados o necesitas un tutorial detallado sobre este flujo, no dudes en pedirlo.

## 🚀 Tecnologías Core

*   **Astro**: Framework principal para el rendimiento y la estructura.
*   **React + Framer Motion**: Para la gestión de estados de animación y la lógica del componente de scroll.
*   **HTML5 Canvas**: Utilizado para renderizar los frames del video de manera eficiente a 60fps (dependiendo del scroll).

## 📁 Estructura del Proyecto

```text
/
├── public/imagenes/ # Frames extraídos con EZGIF
├── src/
│   ├── components/
│   │   ├── CanvasScroll.tsx    # Lógica de renderizado en Canvas
│   │   └── ScrollExperience.tsx # Orquestación del scrollytelling
│   └── pages/index.astro       # Página principal
└── package.json
```

## ⚙️ Instalación y Uso

1.  **Instalar dependencias:**
    ```bash
    npm install
    ```

2.  **Correr en modo desarrollo:**
    ```bash
    npm run dev
    ```

3.  **Construir para producción:**
    ```bash
    npm run build
    ```

---

> [!TIP]
> Si el sello de la herramienta de video está en un lugar con poco movimiento, Photoshop es la mejor opción para crear una máscara estática que lo oculte sin afectar la experiencia visual.
