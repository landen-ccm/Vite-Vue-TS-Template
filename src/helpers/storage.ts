const FavoriteKey = 'favorites'

export function loadFavorites(): { [key: number]: true | undefined } {
  const res = localStorage.getItem(FavoriteKey)
  return res === null ? {} : JSON.parse(res)
}

export function saveFavorites(favs: { [key: number]: true | undefined }) {
  localStorage.setItem(FavoriteKey, JSON.stringify(favs))
}
