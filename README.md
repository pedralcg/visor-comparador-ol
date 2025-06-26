# Visor comparativo de cartografía histórica y actual

Este proyecto es un visor web desarrollado con **OpenLayers** que permite explorar y comparar mapas históricos y actuales mediante un deslizador interactivo. Está diseñado para facilitar la visualización de la evolución territorial a partir de ortofotos oficiales y cartografía libre, complementado con herramientas de dibujo, medición y carga de archivos vectoriales.

---

## 1. 🌍 Funcionalidades principales

- 🧭 Comparación visual de mapas históricos y modernos mediante control deslizante (Swipe).  
- 📡 Soporte para capas WMS/WMTS oficiales del **IGN** y **OpenStreetMap**.  
- 🗺️ Visualización de ortofotos de diferentes vuelos históricos nacionales y regionales.  
- 📁 Carga de archivos vectoriales: **GeoJSON**, **KML** y **GPX**.  
- ✏️ Herramientas de **dibujo** de punto, línea y polígono.  
- 📏 Herramientas de **medición** con unidades dinámicas (metros, kilómetros, hectáreas...).  
- 🔍 Buscador de lugares con **Nominatim (OpenStreetMap)**.  
- 🗂️ Capas auxiliares: términos municipales de Murcia y nombres geográficos del IGN.  
- 📱 Interfaz responsive adaptada a distintos dispositivos.

---

## 2. 🛠️ Estado actual y hoja de ruta

**Estado actual:**  
Proyecto funcional y estable, ideal para visualizar y comparar cartografía histórica y actual con herramientas básicas de dibujo y medición.

**Últimas mejoras:**  
- Implementación del control deslizable para comparación de mapas.  
- Soporte para carga de archivos vectoriales (GeoJSON, KML, GPX).  
- Mejoras en la interfaz responsive para dispositivos móviles.

**Próximas mejoras previstas:**  
- Mejoras en la integración con servicios WMS adicionales.  
- Incorporación de nuevas capas auxiliares de interés.  

---

## 3. 🔗 Demo en línea

Puedes probar el visor directamente en:

🌐 https://pedralcg.github.io/visor-comparador-ol

---

## 4. 🛠️ Tecnologías utilizadas

- [OpenLayers](https://openlayers.org/) (JS)  
- HTML5 + CSS3  
- Proyecciones EPSG:3857  
- Estándares WMS/WMTS (IGN)  
- Formatos: GeoJSON, KML, GPX  
- API de búsqueda: [Nominatim](https://nominatim.org/)

---

## 5. 🚀 Instalación y uso

1. Clona el repositorio completo:

```bash
git clone https://github.com/pedralcg/visor-comparador-ol.git
```

2. Acceder a la carpeta del proyecto específico:

```bash
cd visor-comparador-ol
```

3. Abre el archivo index.html en tu navegador favorito (se recomienda usar Firefox o Chrome).  
⚠️ No requiere servidor ni instalación adicional. Funciona en local o mediante GitHub Pages.  
Consejo: Para una mejor experiencia, puedes abrir el proyecto con un servidor local como Live Server para VSCode.

---

## 6. 📁 Estructura del proyecto

- **index.html**: Página principal del visor.  
- **style.css**: Estilos CSS para el diseño y la interfaz.  
- **script.js**: Código JavaScript con la lógica del visor.  
- **/lib**: Librerías de terceros (OpenLayers, Proj4, etc.)  
- **/assets**: Imágenes y recursos gráficos.  
- **/data**: Archivos GeoJSON u otros datos vectoriales locales.

---

## 7. 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si quieres colaborar en mejoras, nuevas funcionalidades o corrección de errores:

- Haz un fork del repositorio.
- Crea una rama para tu mejora (`git checkout -b mejora-nueva`).
- Realiza los cambios y haz commit con mensajes claros.
- Envía un pull request describiendo tus cambios.

---

## 8. 🐞 Reportar bugs y solicitar mejoras

Si encuentras algún error o tienes ideas para nuevas funcionalidades, por favor:

- Abre un issue en este repositorio con una descripción detallada.
- O contáctame directamente por email (ver sección de contacto).

Esto ayuda a mantener el proyecto actualizado y útil para todos.

---


## 9. 📬 Contacto

Para dudas, sugerencias o reporte de errores:

**Pedro Alcoba Gómez**  
Técnico ambiental especializado en SIG, teledetección y desarrollo de visores web.  
📧 [pedralcg@gmail.com](mailto:pedralcg@gmail.com)  
🌐 [https://pedralcg.github.io](https://pedralcg.github.io)

---

## 10. 📄 Licencia

Este proyecto está disponible bajo la licencia **MIT**.

Puedes usarlo, modificarlo y distribuirlo libremente, incluso con fines comerciales, siempre que mantengas los créditos del autor original.

Consulta el archivo [LICENSE](LICENSE) para más información.
