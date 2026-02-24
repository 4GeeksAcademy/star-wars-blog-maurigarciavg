export const initialStore = () => {
  return {
    message: null,
    characters: [],
    planets: [],
    starships: [],
    favorites: []
  }
}

export default function storeReducer(store, action = {}) {

  switch (action.type) {
    case 'set_characters':
      return {
        ...store,
        characters: action.payload
      };
    case 'set_planets':
      return {
        ...store,
        planets: action.payload
      };
    case 'set_starships':
      return {
        ...store,
        starships: action.payload
      };
    case 'add_favorite':
      console.log("¡Favorito recibido en el store!", action.payload);
      return {
        ...store,
        favorites: [...store.favorites, action.payload]
      };
    case 'delete_favorite':
      return {
        ...store,
        favorites: store.favorites.filter((fav) => fav.uid !== action.payload)
      };
    default:
      throw Error('Unknown action.');
  };
};

