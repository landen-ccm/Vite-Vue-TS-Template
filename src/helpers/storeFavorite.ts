import type { Pokemon } from './types'

export type Favorites = { [key: number]: Pokemon | undefined }

export function saveFavorites(favorites: Favorites) {
  localStorage.setItem('favorites', JSON.stringify(favorites))
}

export function loadFavorites(): Favorites {
  const res = localStorage.getItem('favorites')
  if (res === null) {
    return []
  }
  return JSON.parse(res)
}
