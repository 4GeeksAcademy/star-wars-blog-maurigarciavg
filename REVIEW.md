# 📝 Revisión del proyecto: Starwars blog reading list - Mauricio Garcia-Valdecasas Gámez

## ✅ Aspectos Positivos

1. **Base global ya encaminada**: el proyecto ya usaba `store.js` y `useGlobalReducer`, así que la idea de estado global estaba bien planteada desde el inicio.

2. **Integración real con SWAPI**: la home ya consumía datos reales y renderizaba varias colecciones del universo Star Wars, que es una parte importante del ejercicio.

3. **Feedback visual de favoritos**: el corazón activo/inactivo se entendía rápido y la intención de UX era clara.

4. **Diseño visual trabajado**: la interfaz tiene personalidad, mantiene una estética coherente con Star Wars y no se queda en el boilerplate por defecto.

5. **Detalle con contenido contextual**: la página de detalle ya intentaba adaptar descripción y campos según el tipo de recurso, lo cual demuestra intención de personalizar la experiencia.

## 🔍 Áreas de Mejora

### 1. Separar la capa HTTP de las pages

La home hacía `fetch` directamente dentro del componente y repetía la misma estructura tres veces. Funciona, pero mezcla UI con acceso a datos y deja la app sin una capa reutilizable.

**Código actual:**

```jsx
const getCharacters = async () => {
    const data = await fetch("https://www.swapi.tech/api/people");
    const result = await data.json();
    dispatch({ type: "set_characters", payload: result.results });
};

const getPlanets = async () => {
    const data = await fetch("https://www.swapi.tech/api/planets");
    const result = await data.json();
    dispatch({ type: "set_planets", payload: result.results });
};

useEffect(() => {
    getCharacters();
    getPlanets();
    getStarships();
}, []);
```

**Código mejorado:**

```jsx
useEffect(() => {
    void loadCatalog(dispatch, {
        hasLoaded: store.status.catalog.hasLoaded
    });
}, [dispatch, store.status.catalog.hasLoaded]);
```

```js
export const fetchCatalog = async () => {
    const [people, planets, vehicles] = await Promise.all([
        fetchCollection("people"),
        fetchCollection("planets"),
        fetchCollection("vehicles")
    ]);

    return { people, planets, vehicles };
};
```

**¿Por qué es mejor?**

- La UI queda enfocada en renderizar, no en hablar con la API.
- La lógica HTTP se reutiliza entre Home y Detail.
- Es más fácil añadir `loading`, error y `retry` sin duplicar código.

### 2. Normalizar favoritos y evitar duplicados

El store ya era inmutable, pero los favoritos se agregaban sin comprobar si ya existían y el borrado solo usaba `uid`, lo que puede colisionar entre categorías distintas.

**Código actual:**

```js
case 'add_favorite':
  return {
    ...store,
    favorites: [...store.favorites, action.payload]
  };
case 'delete_favorite':
  return {
    ...store,
    favorites: store.favorites.filter((fav) => fav.uid !== action.payload)
  };
```

**Código mejorado:**

```js
case ACTION_TYPES.toggleFavorite: {
    const favorite = {
        uid: String(action.payload.uid),
        type: action.payload.type,
        name: action.payload.name
    };
    const exists = store.favorites.some(
        (item) => item.uid === favorite.uid && item.type === favorite.type
    );

    return {
        ...store,
        favorites: exists
            ? store.favorites.filter(
                    (item) =>
                        !(item.uid === favorite.uid && item.type === favorite.type)
                )
            : [...store.favorites, favorite]
    };
}
```

**¿Por qué es mejor?**

- Evita duplicados.
- La eliminación respeta `uid + type`, no solo `uid`.
- El patrón `dispatch({ type, payload })` queda más claro y consistente.

### 3. Alinear la ruta dinámica y el detail con la rúbrica

La ruta original funcionaba, pero no seguía la convención pedida por la solución (`/:type/:uid`) y obligaba a hacer traducciones manuales dentro del componente.

**Código actual:**

```jsx
<Route path="/:categoryId/:theId" element={<Detail />} />
```

```jsx
const { categoryId, theId } = useParams();
const apiCategory = categoryId === "characters" ? "people" : categoryId;
const data = await fetch(`https://www.swapi.tech/api/${apiCategory}/${theId}`);
```

**Código mejorado:**

```jsx
<Route path=":type/:uid" element={<Detail />} />
```

```jsx
const { type, uid } = useParams();
const canonicalType = normalizeResourceType(type);
const cachedDetail = isSupportedType(canonicalType)
    ? store.detailCache[canonicalType][safeUid]
    : null;

useEffect(() => {
    if (!isSupportedType(canonicalType) || cachedDetail) {
        return;
    }

    void loadDetail(dispatch, {
        type: canonicalType,
        uid: safeUid,
        cachedDetail
    });
}, [cachedDetail, canonicalType, dispatch, safeUid]);
```

**¿Por qué es mejor?**

- La URL queda alineada con la rúbrica y la solución.
- El detalle es reutilizable para cualquier tipo soportado.
- La cache evita peticiones repetidas y mejora la experiencia de usuario.

## 🎯 Patrones y Anti-patrones Identificados

### Patrones Positivos Encontrados ✅

#### 1. Estado global con reducer

**Tipo:** Patrón ✅

**Dónde aparece:**
- `src/store.js`
- `src/hooks/useGlobalReducer.jsx`

**Descripción:** El proyecto ya arrancaba con un estado global centralizado y actualizaciones inmutables usando `useReducer`.

**¿Por qué es importante?**

- Evita prop drilling innecesario.
- Facilita compartir favoritos entre varios componentes.
- Encaja bien con la convención del boilerplate del curso.

#### 2. Feedback visual en favoritos

**Tipo:** Patrón ✅

**Dónde aparece:**
- `src/components/Card.jsx`

**Descripción:** El botón de favoritos ya diferenciaba visualmente el estado activo e inactivo.

**¿Por qué es importante?**

- El usuario entiende rápido qué elementos están guardados.
- Mejora la percepción de interactividad.

### Anti-patrones a Mejorar ❌

#### 1. Fetch duplicado dentro de las pages

**Tipo:** Anti-patrón ❌

**Dónde aparece:**
- `src/pages/Home.jsx`
- `src/pages/Detail.jsx`

**Descripción:** La lógica HTTP estaba mezclada con el render y repetida por categoría.

**Alternativa:**

```js
export const loadCatalog = async (dispatch) => {
    dispatch({ type: ACTION_TYPES.loadCatalogStart });
    const catalog = await fetchCatalog();
    dispatch({ type: ACTION_TYPES.loadCatalogSuccess, payload: catalog });
};
```

**Conceptos relacionados:**

- Separación de responsabilidades
- Reutilización
- Manejo de errores

#### 2. Modelo de datos inconsistente

**Tipo:** Anti-patrón ❌

**Dónde aparece:**
- `src/store.js`
- `src/pages/Home.jsx`
- `src/pages/Detail.jsx`

**Descripción:** El proyecto mezclaba `characters` con `people` y `starships` con `vehicles`, obligando a traducir nombres según el contexto.

**Alternativa:**

```js
catalog: {
    people: [],
    planets: [],
    vehicles: []
}
```

**Conceptos relacionados:**

- Nomenclatura consistente
- Reducir complejidad accidental
- Escalabilidad

#### 3. Favoritos sin protección por tipo

**Tipo:** Anti-patrón ❌

**Dónde aparece:**
- `src/store.js`
- `src/components/Card.jsx`

**Descripción:** Los favoritos se añadían sin deduplicación y se borraban solo por `uid`.

**Alternativa:**

```js
favorites: store.favorites.filter(
    (item) =>
        !(item.uid === String(action.payload.uid) && item.type === action.payload.type)
)
```

**Conceptos relacionados:**

- Integridad de datos
- Claves compuestas
- Estado predecible

## 📊 Evaluación Detallada

### Criterios de Evaluación (Total: 60/100)

| Criterio | Puntos | Obtenido | Comentario |
|----------|--------|----------|------------|
| **Funcionalidad Básica** | 30 | 16 | La home y el detail funcionan, pero no estaban alineados con `people/planets/vehicles`, faltaba manejo de error/retry y los favoritos no evitaban duplicados. |
| **Código Limpio** | 20 | 13 | La base era legible, pero había nombres y acciones inconsistentes, además de restos de boilerplate y configuración rota. |
| **Estructura** | 15 | 9 | Había `store.js` y `useGlobalReducer`, pero faltaba separar SWAPI en una capa de servicios. |
| **Buenas Prácticas** | 15 | 8 | Las actualizaciones eran inmutables, pero faltaban cache, manejo defensivo y un uso más limpio de `dispatch`. |
| **HTML/CSS** | 10 | 7 | La interfaz tiene identidad visual y orden, aunque había pequeños problemas de consistencia y detalles rotos. |
| **UX/Animaciones** | 10 | 7 | El feedback de favoritos era claro y había fallback de imagen, pero faltaban loading, retry y estados vacíos bien resueltos. |
| **TOTAL** | **100** | **60** | **NECESITA MEJORA** |

### Desglose de Puntos Perdidos (-40 puntos)

1. **-5 puntos** - La home no trabajaba con el modelo canónico `people / planets / vehicles`; usaba `characters` y `starships`, alejándose de la solución de referencia.
2. **-5 puntos** - La lógica HTTP estaba duplicada dentro de las pages y faltaba una capa `services/swapi.js`.
3. **-5 puntos** - Los favoritos permitían duplicados y el borrado solo usaba `uid`, sin contemplar también el `type`.
4. **-6 puntos** - No existía un flujo completo de `loading`, error visible y `retry`; Home no mostraba feedback de carga/error y Detail solo tenía un loading básico.
5. **-4 puntos** - La ruta dinámica no seguía la convención `/:type/:uid` pedida por la rúbrica.
6. **-4 puntos** - No había cache de detalle ni manejo defensivo para rutas inválidas o recursos no soportados.
7. **-3 puntos** - `useGlobalReducer` añadía un wrapper `actions` innecesario frente al patrón base del starter con `dispatch({ type, payload })`.
8. **-4 puntos** - Quedaban restos de boilerplate/configuración: `eslint.cjs` no era detectado por ESLint, el título seguía como `Hello Rigo` y el footer tenía un enlace roto.
9. **-4 puntos** - El detail dependía de muchos condicionales hardcodeados por categoría y assets locales especiales, dificultando su reutilización y mantenimiento.

### Cómo Llegar a 100/100

Aplicando las correcciones de este PR:

- ✅ **+12 puntos** - Extraer SWAPI a `src/services/swapi.js`, centralizar la carga del catálogo y del detalle, y dispararla desde las pages con `useEffect`.
- ✅ **+10 puntos** - Normalizar el store a `people / planets / vehicles`, usar la ruta `/:type/:uid` y añadir cache de detalle.
- ✅ **+8 puntos** - Rehacer favoritos globales con `dispatch`, `toggleFavorite` y eliminación segura por `uid + type`.
- ✅ **+6 puntos** - Añadir `loading`, error, `retry`, estados vacíos y fallbacks visuales robustos.
- ✅ **+4 puntos** - Limpiar el boilerplate roto (`.eslintrc.cjs`, `ScrollToTop`, footer e `index.html`) y alinear el proyecto con la solución oficial.

**= 100/100** 🎉

## ✅ Verificación Técnica

- `npm install`: OK
- `npm run lint`: OK
- `npm run build`: OK

## 📊 Resumen

| Aspecto | Estado |
|---------|--------|
| Integración con SWAPI | ✅ Buena base |
| Estado global | ✅ Bien encaminado |
| Separación de responsabilidades | ⚠️ Mejorable |
| Favoritos | ⚠️ Incompletos |
| Ruta dinámica y detail | ⚠️ Mejorables |
| UX de carga/error | ⚠️ Incompleta |

**Nota final:** Hay una base real de trabajo y una identidad visual propia, lo cual es valioso. Las mejoras de este PR no rehacen la idea del proyecto: la ordenan, la alinean con la rúbrica y la convierten en un patrón más sólido para proyectos futuros.
