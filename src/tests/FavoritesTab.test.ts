import { mount } from '@vue/test-utils'
import FavoritesTab from '@/components/FavoritesTab.vue'
import { assert, expect, test, vi, describe } from 'vitest'
import { bulbasaurFormatted } from './testdata'
test('page mounts', () => {
  const wrapper = mount(FavoritesTab, { props: { favorites: new Set([1]) } })
  expect(wrapper.exists()).toBe(true)
})
