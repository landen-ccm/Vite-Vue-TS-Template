export function capitalizeFirstLetter(text: string) {
  return text.charAt(0).toLocaleUpperCase() + text.slice(1)
}

export function brightnessAdjust(color: string, change: number) {
  return (
    '#' +
    color
      .replace('#', '')
      .match(/(..)/g)
      ?.map((val: string) => {
        return Math.max(0, Math.min(255, Math.floor(Number(`0x${val}`) * change)))
          .toString(16)
          .padStart(2, '0')
      })
      .join('')
  )
}

export const pokemonStatToColor: { [key: string]: string } = {
  hp: '#FF0000',
  attack: '#F08030',
  defense: '#F8D030',
  SpAttack: '#6890F0',
  SpDefense: '#78C850',
  speed: '#F85888',
  'special-attack': '#6890F0',
  'special-defense': '#78C850'
} as const

export const pokemonTypeToColor: { [key: string]: string } = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD'
} as const
