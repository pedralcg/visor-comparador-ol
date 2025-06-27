const capasCargadas = []

// === 1. Declarar capas base modernas e históricas ===
const capas = {
  modernas: {
    "Ortofotos PNOA Máxima Actualidad (IGN)": new ol.layer.Tile({
      title: 'PNOA (IGN)',
      source: new ol.source.TileWMS({
        url: 'https://www.ign.es/wms-inspire/pnoa-ma?',
        params: {
          'LAYERS': 'OI.OrthoimageCoverage',
          'FORMAT': 'image/jpeg',
          'TILED': true,
          'CRS': 'EPSG:3857'
        },
        attributions: 'PNOA &copy; IGN España'
      }),
      visible: false
    }),
    "Open Street Map (OSM)": new ol.layer.Tile({
      title: 'OpenStreetMap',
      source: new ol.source.OSM(),
      visible: false
    }),
    "Mapas Ráster del IGN": new ol.layer.Tile({
      title: 'IGN WMTS',
      source: new ol.source.WMTS({
        url: 'https://www.ign.es/wmts/mapa-raster?',
        layer: 'MTN',
        matrixSet: 'EPSG:3857',
        format: 'image/jpeg',
        style: 'default',
        projection: ol.proj.get('EPSG:3857'),
        tileGrid: new ol.tilegrid.WMTS({
          origin: [-20037508.3428, 20037508.3428],
          resolutions: [
            156543.03392800014, 78271.51696399994, 39135.75848200009,
            19567.87924099992, 9783.93962049996, 4891.96981024998,
            2445.98490512499, 1222.992452562495, 611.4962262813797,
            305.74811314055756, 152.87405657041106, 76.43702828507324,
            38.21851414253662, 19.10925707126831, 9.554628535634155,
            4.77731426794937, 2.388657133974685
          ],
          matrixIds: Array.from({ length: 17 }, (_, i) => i.toString())
        }),
        attributions: 'IGN España &copy; Instituto Geográfico Nacional',
        crossOrigin: 'anonymous'
      }),
      visible: false
    })
  },
  historicas: {
    "Vuelo de 1929-1930 Ruiz de Alda (CHS)": new ol.layer.Tile({
      title: 'Vuelo Ruiz de Alda',
      source: new ol.source.TileWMS({
        url: 'https://www.chsegura.es/server/services/VISOR_CHSIC3/VISOR_PUBLICO_ETRS89_v5_RuizdeAlda/MapServer/WmsServer?',
        params: {
          'LAYERS': '0,1',
          'VERSION': '1.3.0',
          'FORMAT': 'image/jpeg',
          'TRANSPARENT': true
        },
        attributions: 'CHSegura &copy; Vuelo Ruiz de Alda',
        crossOrigin: 'anonymous'
      }),
      visible: false
    }),
    "Vuelo Americano. Serie B, 1956-1957 (IGN)": new ol.layer.Tile({
      title: 'Vuelo Americano. Serie B, 1956-1957',
      source: new ol.source.TileWMS({
        url: 'https://www.ign.es/wms/pnoa-historico?',
        params: {
          'LAYERS': 'AMS_1956-1957',
          'VERSION': '1.3.0',
          'FORMAT': 'image/jpeg',
          'TRANSPARENT': true
        },
        attributions: 'IGN España &copy; Instituto Geográfico Nacional',
        crossOrigin: 'anonymous'
      }),
      visible: false
    }),
    "Vuelo Interministerial 1973-1986 (IGN)": new ol.layer.Tile({
      title: 'Vuelo Interministerial 1973-1986',
      source: new ol.source.TileWMS({
        url: 'https://www.ign.es/wms/pnoa-historico?',
        params: {
          'LAYERS': 'Interministerial_1973-1986',
          'VERSION': '1.3.0',
          'FORMAT': 'image/jpeg',
          'TRANSPARENT': true
        },
        attributions: 'IGN España &copy; Instituto Geográfico Nacional',
        crossOrigin: 'anonymous'
      }),
      visible: false
    }),
    "Vuelo Nacional 1981-1986 (IGN)": new ol.layer.Tile({
      title: 'Vuelo Nacional 1981-1986',
      source: new ol.source.TileWMS({
        url: 'https://www.ign.es/wms/pnoa-historico?',
        params: {
          'LAYERS': 'Nacional_1981-1986',
          'VERSION': '1.3.0',
          'FORMAT': 'image/jpeg',
          'TRANSPARENT': true
        },
        attributions: 'IGN España &copy; Instituto Geográfico Nacional',
        crossOrigin: 'anonymous'
      }),
      visible: false
    }),
    "Vuelo OLISTAT 1997-1998 (IGN)": new ol.layer.Tile({
      title: 'Vuelo OLISTAT 1997-1998',
      source: new ol.source.TileWMS({
        url: 'https://www.ign.es/wms/pnoa-historico?',
        params: {
          'LAYERS': 'OLISTAT',
          'VERSION': '1.3.0',
          'FORMAT': 'image/jpeg',
          'TRANSPARENT': true
        },
        attributions: 'IGN España &copy; Instituto Geográfico Nacional',
        crossOrigin: 'anonymous'
      }),
      visible: false
    }),
  }
};

// === 2. Fuente vectorial para dibujo y medición ===
const drawSource = new ol.source.Vector();
const fuenteMedida = new ol.source.Vector();

// === 3. Coberturas auxiliares ===
const tmMurciaSource = new ol.source.Vector({
  url: './data/tm_murcia.geojson',
  format: new ol.format.GeoJSON()
});

const tmMurciaLayer = new ol.layer.Vector({
  source: tmMurciaSource,
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: '#0000ff',
      width: 1.5
    }),
  }),
  visible: true, // Activa por defecto si quieres que aparezca inicialmente
  title: 'Términos municipales de Murcia'
});

const nombresGeograficos = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'https://www.ign.es/wms-inspire/ngbe',
    params: {
      'LAYERS': 'GN.GeographicalNames',
      'TILED': true,
      'VERSION': '1.3.0',
      'FORMAT': 'image/png'
    },
    projection: 'EPSG:3857',
    attributions: '© Instituto Geográfico Nacional de España'
  }),
  visible: false
});


// === 4. Inicializar visor OL ===
const map = new ol.Map({
  target: 'map',
  layers: [
    ...Object.values(capas.modernas),
    ...Object.values(capas.historicas),
    tmMurciaLayer, // 🧭 Capas auxiliares abajo del todo
    nombresGeograficos,
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([-1.2, 38.0]),
    zoom: 9
  })
});



// === 5. Control Swipe ===
const swipe = new ol.control.Swipe({ orientation: 'vertical' });
map.addControl(swipe);

// === 6. Selectores de capas ===
const selectModern = document.getElementById('modern');
const selectHistoric = document.getElementById('historic');

Object.keys(capas.modernas).forEach(nombre => {
  const opt = document.createElement('option');
  opt.value = nombre;
  opt.textContent = nombre;
  selectModern.appendChild(opt);
});

Object.keys(capas.historicas).forEach(nombre => {
  const opt = document.createElement('option');
  opt.value = nombre;
  opt.textContent = nombre;
  selectHistoric.appendChild(opt);
});

// === 7. Actualizar capas swipe ===
let capaModernaActiva = null;
let capaHistoricaActiva = null;

function actualizarCapas() {
  const capaModerna = capas.modernas[selectModern.value];
  const capaHistorica = capas.historicas[selectHistoric.value];

  Object.values(capas.modernas).forEach(l => l.setVisible(false));
  Object.values(capas.historicas).forEach(l => l.setVisible(false));

  capaModerna.setVisible(true);
  capaHistorica.setVisible(true);

  if (capaModernaActiva) swipe.removeLayer(capaModernaActiva);
  if (capaHistoricaActiva) swipe.removeLayer(capaHistoricaActiva);

  swipe.addLayer(capaHistorica, true);
  swipe.addLayer(capaModerna, false);

  capaModernaActiva = capaModerna;
  capaHistoricaActiva = capaHistorica;
}
selectModern.addEventListener('change', actualizarCapas);
selectHistoric.addEventListener('change', actualizarCapas);

// === 8. Controles adicionales ===
map.addControl(new ol.control.FullScreen());
map.addControl(new ol.control.OverviewMap({
  layers: [new ol.layer.Tile({ source: new ol.source.OSM() }), tmMurciaLayer],
  collapsed: false
}));

// === 9. Herramienta de dibujo ===

const drawLayer = new ol.layer.Vector({
  source: drawSource,
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({ color: 'rgba(200,0,0,1)', width: 2 }),
    fill: new ol.style.Fill({ color: 'rgba(200,0,0,0.4)' }),
    image: new ol.style.Circle({
      radius: 6,
      fill: new ol.style.Fill({ color: 'rgba(200,0,0,1)' })
    })
  })
});
map.addLayer(drawLayer);

let drawInteraction = null;
let botonActivo = null;

const botonesDibujo = document.querySelectorAll(".grupo-dibujo button");

function cancelarDibujo() {
  if (drawInteraction) {
    map.removeInteraction(drawInteraction);
    drawInteraction = null;
  }
  if (botonActivo) {
    botonActivo.classList.remove("activo");
    botonActivo = null;
  }
}

function toggleDibujo(tipo, boton) {
  // Si el botón pulsado ya está activo, cancelar dibujo
  if (botonActivo === boton) {
    cancelarDibujo();
    return;
  }

  // Si hay otro dibujo activo, lo cancelamos y cambiamos botón
  cancelarDibujo();

  // Iniciar nuevo dibujo
  drawInteraction = new ol.interaction.Draw({
    source: drawSource,
    type: tipo
  });
  map.addInteraction(drawInteraction);

  // Marcar botón activo
  boton.classList.add("activo");
  botonActivo = boton;
}

// Asignar eventos a los botones
document.getElementById("btn-draw-point").addEventListener("click", function () {
  toggleDibujo("Point", this);
});
document.getElementById("btn-draw-line").addEventListener("click", function () {
  toggleDibujo("LineString", this);
});
document.getElementById("btn-draw-polygon").addEventListener("click", function () {
  toggleDibujo("Polygon", this);
});

// === 10. Herramienta de medición con popup con unidades dinámicas ===

// Capa vectorial para las medidas (líneas y polígonos)
const capaMedida = new ol.layer.Vector({
  source: fuenteMedida,
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({ color: 'red', width: 2 }),
    fill: new ol.style.Fill({ color: 'rgba(255,0,0,0.6)' }),
    image: new ol.style.Circle({ radius: 5, fill: new ol.style.Fill({ color: 'red' }) })
  })
});
map.addLayer(capaMedida);

// Crear el popup para mostrar resultados
const popup = document.createElement('div');
popup.className = 'ol-popup';
popup.innerHTML = `<div class="popup-content">
  <button class="popup-close">&times;</button>
  <div id="popup-medida-text"></div>
</div>`;
document.body.appendChild(popup);

// Crear overlay para anclar el popup al mapa
const overlay = new ol.Overlay({
  element: popup,
  positioning: 'bottom-center',
  stopEvent: false,
  offset: [0, -15]
});
map.addOverlay(overlay);

// Funcionalidad para cerrar el popup
popup.querySelector('.popup-close').addEventListener('click', () => {
  popup.style.display = 'none';
  overlay.setPosition(undefined);
});

// Variables globales para la interacción de dibujo
let drawMedida = null;

// Obtener botones de medición para manejo de estado activo
const botonesMedicion = document.querySelectorAll(".grupo-medicion button");

// Funciones para formatear unidades de distancia y área según valor
function formatearDistancia(metros) {
  if (metros < 1000) {
    return `${metros.toFixed(1)} m`;           // Menos de 1000 m -> metros con 1 decimal
  } else {
    return `${(metros / 1000).toFixed(2)} km`; // Más -> kilómetros con 2 decimales
  }
}

function formatearArea(metros2) {
  if (metros2 < 10000) {                        // Menos de 1 hectárea (10,000 m²)
    return `${metros2.toFixed(1)} m²`;          // Mostrar en metros cuadrados con 1 decimal
  } else if (metros2 < 1000000) {               // Entre 1 ha y 1 km²
    return `${(metros2 / 10000).toFixed(2)} ha`; // Mostrar en hectáreas con 2 decimales
  } else {                                     // Más de 1 km²
    return `${(metros2 / 1000000).toFixed(2)} km²`; // Mostrar en kilómetros cuadrados con 2 decimales
  }
}

// Función para iniciar la medición
function iniciarMedicion(tipo) {
  // Si ya hay una medición activa, eliminarla y cerrar popup, además desactivar botón
  if (drawMedida) {
    map.removeInteraction(drawMedida);
    drawMedida = null;
    popup.style.display = 'none';
    botonesMedicion.forEach(b => b.classList.remove("activo"));
    return;
  }

  // Crear nueva interacción de dibujo para medición (línea o polígono)
  drawMedida = new ol.interaction.Draw({
    source: fuenteMedida,
    type: tipo
  });
  map.addInteraction(drawMedida);

  // Al acabar el dibujo, calcular y mostrar la medida
  drawMedida.on('drawend', function (e) {
    const geom = e.feature.getGeometry();
    // Obtener coordenadas para colocar el popup (centro interior o último punto)
    const coord = geom.getInteriorPoint ? geom.getInteriorPoint().getCoordinates() : geom.getLastCoordinate();

    let resultado = '';
    if (tipo === 'LineString') {
      const length = ol.sphere.getLength(geom);  // Medir longitud en metros
      resultado = `Distancia: ${formatearDistancia(length)}`;
    } else if (tipo === 'Polygon') {
      const area = ol.sphere.getArea(geom);      // Medir área en metros cuadrados
      resultado = `Superficie: ${formatearArea(area)}`;
    }

    // Mostrar el resultado en el popup
    document.getElementById('popup-medida-text').innerHTML = `<strong>${resultado}</strong>`;
    overlay.setPosition(coord);
    popup.style.display = 'block';

    // Desactivar interacción y botón activo al finalizar
    map.removeInteraction(drawMedida);
    drawMedida = null;
    botonesMedicion.forEach(b => b.classList.remove("activo"));
  });
}

// Asignar eventos a botones para activar/desactivar la medición
document.getElementById('btn-medicion-linea')?.addEventListener('click', (e) => {
  // Alternar activo visual del botón
  const boton = e.currentTarget;
  const estaActivo = boton.classList.contains('activo');

  botonesMedicion.forEach(b => b.classList.remove('activo'));
  if (!estaActivo) {
    boton.classList.add('activo');
    iniciarMedicion('LineString');
  } else {
    // Si ya estaba activo, cancelar la medición
    iniciarMedicion(); // sin parámetros cancela
  }
});

document.getElementById('btn-medicion-area')?.addEventListener('click', (e) => {
  const boton = e.currentTarget;
  const estaActivo = boton.classList.contains('activo');

  botonesMedicion.forEach(b => b.classList.remove('activo'));
  if (!estaActivo) {
    boton.classList.add('activo');
    iniciarMedicion('Polygon');
  } else {
    iniciarMedicion();
  }
});


// === 11. Limpiar dibujo y medición ===
document.getElementById("btn-clear").addEventListener("click", () => {
  drawSource.clear();
  fuenteMedida.clear();
  overlay.setPosition(undefined); // Quita el overlay de medición

  // 🔴 Eliminar marcador de búsqueda
  if (marcadorBusqueda) {
    map.removeOverlay(marcadorBusqueda);
    marcadorBusqueda = null;
  }

  // 🗑️ Eliminar capas cargadas por el usuario
  capasCargadas.forEach(capa => map.removeLayer(capa));
  capasCargadas.length = 0;

  // 🧼 Limpiar input de carga de archivos
  document.getElementById('file-input').value = null;
});



// === 12. Recentrar a TM Región de Murcia ===
document.getElementById("btn-recentrar")?.addEventListener("click", () => {
  const extent = tmMurciaSource.getExtent();
  if (extent && !ol.extent.isEmpty(extent)) {
    map.getView().fit(extent, {
      padding: [20, 20, 20, 20],
      maxZoom: 12,
      duration: 800
    });
  } else {
    alert("No se puede recentrar: la capa no está lista.");
  }
});

// === 12. Control de coberturas auxiliares ===
document.getElementById("toggle-tm")?.addEventListener("change", (e) => {
  tmMurciaLayer.setVisible(e.target.checked);
});

document.getElementById("toggle-nombresGeograficos")?.addEventListener("change", (e) => {
  nombresGeograficos.setVisible(e.target.checked);
});

// === 13. Carga de archivos vectoriales ===
document.getElementById('file-input').addEventListener('change', function (e) {
  const files = e.target.files;

  Array.from(files).forEach(file => {
    const reader = new FileReader();
    const extension = file.name.split('.').pop().toLowerCase();

    reader.onload = function (event) {
      let format;
      switch (extension) {
        case 'geojson':
        case 'json':
          format = new ol.format.GeoJSON();
          break;
        case 'kml':
          format = new ol.format.KML();
          break;
        case 'gpx':
          format = new ol.format.GPX();
          break;
        default:
          alert('Formato no soportado: ' + extension);
          return;
      }

      try {
        const features = format.readFeatures(event.target.result, {
          featureProjection: map.getView().getProjection()
        });

        features.forEach(f => f.setStyle(null));

        const vectorSource = new ol.source.Vector({ features });
        const vectorLayer = new ol.layer.Vector({
          source: vectorSource,
          style: new ol.style.Style({
            stroke: new ol.style.Stroke({ color: 'yellow', width: 2 }),
            fill: new ol.style.Fill({ color: 'rgba(255, 255, 0, 0.1)' }),
            image: new ol.style.Circle({
              radius: 5,
              fill: new ol.style.Fill({ color: 'yellow' }),
              stroke: new ol.style.Stroke({ color: 'black', width: 1 })
            })
          })
        });
        vectorLayer.set('title', file.name);
        vectorLayer.set('color', 'yellow');
        map.addLayer(vectorLayer);
        capasCargadas.push(vectorLayer);

        const extent = vectorSource.getExtent();
        if (extent) map.getView().fit(extent, { padding: [20, 20, 20, 20] });
      } catch (err) {
        console.error("Error cargando archivo:", err);
        alert("Error al cargar archivo. Consulta la consola.");
      }
    };

    reader.readAsText(file);

    // Limpiamos File input
    document.getElementById('file-input').value = null;
  });
});
// map.addLayer(vectorLayer);
// capasCargadas.push(vectorLayer); // añade capa a la lista



// === 14. Buscador de coordenadas o lugares con Nominatim ===

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const resultadosContainer = document.createElement("div");
resultadosContainer.id = "resultados-busqueda";
resultadosContainer.style.position = "absolute";
resultadosContainer.style.background = "white";
resultadosContainer.style.border = "none";
resultadosContainer.style.maxHeight = "200px";
resultadosContainer.style.overflowY = "auto";
resultadosContainer.style.zIndex = 2000;
resultadosContainer.style.width = searchInput.offsetWidth + "px";
resultadosContainer.style.cursor = "pointer";
searchInput.parentNode.appendChild(resultadosContainer);

let debounceTimer = null;

// Función para limpiar resultados
function limpiarResultados() {
  resultadosContainer.innerHTML = "";
  resultadosContainer.style.display = "none";
}

// Función para centrar mapa y poner marcador
let marcadorBusqueda = null;
function mostrarResultadoEnMapa(coord, nombre) {
  if (marcadorBusqueda) {
    marcadorBusqueda.setPosition(coord);
  } else {
    marcadorBusqueda = new ol.Overlay({
      element: document.createElement("div"),
      positioning: "center-center",
      stopEvent: false,
      offset: [0, -15],
    });
    marcadorBusqueda.getElement().style.width = "24px";
    marcadorBusqueda.getElement().style.height = "24px";
    marcadorBusqueda.getElement().style.background = "rgba(255,0,0,0.5)";
    marcadorBusqueda.getElement().style.borderRadius = "50%";
    marcadorBusqueda.getElement().style.border = "2px solid red";
    map.addOverlay(marcadorBusqueda);
    marcadorBusqueda.setPosition(coord);
  }
  map.getView().animate({ center: coord, zoom: 16 });
}

// Función para hacer la consulta Nominatim con filtros de tipos y país
async function buscarNominatim(query) {
  if (!query || query.length < 3) {
    limpiarResultados();
    return;
  }
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", query);
  url.searchParams.set("format", "json");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("countrycodes", "es"); 
  url.searchParams.set("limit", "10");
  url.searchParams.set("accept-language", "es");

  try {
    const response = await fetch(url.toString(), { headers: { "User-Agent": "TuApp/1.0 (contacto@tuemail.com)" } });
    if (!response.ok) throw new Error("Error en la búsqueda");
    const data = await response.json();

    // Si la consulta es muy corta, no filtramos
    if(query.length < 4) {
      mostrarListaResultados(data);
      return;
    }

    const tiposPermitidos = [
      "municipality",
      "village",
      "town",
      "hamlet",
      "locality",
      "forest",
      "natural",
      "mountain",
      "hill",
      "peak",
      "county",
      "parish",
      "place",
      "suburb",
      "residential",
      "neighbourhood",
      "farm",
      "estate"
    ];

    const filtrados = data.filter(item => {
      if (!item.class) return false;
      const clase = item.class.toLowerCase();
      return tiposPermitidos.some(t => clase.includes(t));
    });

    mostrarListaResultados(filtrados.length ? filtrados : data);

  } catch (error) {
    console.error("Error en la búsqueda:", error);
    limpiarResultados();
  }
}


// Mostrar lista resultados bajo el input
function mostrarListaResultados(resultados) {
  limpiarResultados();
  if (resultados.length === 0) return;

  resultadosContainer.style.display = "block";
  resultados.forEach(item => {
    const div = document.createElement("div");
    div.textContent = item.display_name;
    div.style.padding = "4px 8px";
    div.style.borderBottom = "1px solid #eee";

    div.addEventListener("click", () => {
      limpiarResultados();
      searchInput.value = item.display_name;
      const coord = ol.proj.fromLonLat([parseFloat(item.lon), parseFloat(item.lat)]);
      mostrarResultadoEnMapa(coord, item.display_name);
    });

    div.addEventListener("mouseenter", () => div.style.backgroundColor = "#f0f0f0");
    div.addEventListener("mouseleave", () => div.style.backgroundColor = "white");

    resultadosContainer.appendChild(div);
  });
}

// Debounce para búsqueda input
searchInput.setAttribute("autocomplete", "off");
searchInput.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => buscarNominatim(searchInput.value.trim()), 300);
});

// Botón buscar (para búsqueda manual)
searchBtn.addEventListener("click", () => buscarNominatim(searchInput.value.trim()));

// Cerrar lista si se hace click fuera
document.addEventListener("click", e => {
  if (!resultadosContainer.contains(e.target) && e.target !== searchInput) {
    limpiarResultados();
  }
});




// === 15. Inicializar con selección por defecto ===
window.addEventListener('load', actualizarCapas);

// === 16. Centrar mapa y minimapa en la capa de términos municipales ===
tmMurciaSource.once('change', () => {
  if (tmMurciaSource.getState() === 'ready') {
    const extent = tmMurciaSource.getExtent();

    // Ajustar vista principal
    map.getView().fit(extent, {
      padding: [20, 20, 20, 20],
      maxZoom: 12,
      duration: 1000
    });
  }
});
