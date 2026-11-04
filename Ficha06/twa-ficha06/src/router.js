
import { createRouter, createWebHistory } from 'vue-router'

import CatalogPage from './pages/CatalogPage.vue'
import ItemPage from './pages/ItemPage.vue'
import NewItemPage from './pages/NewItemPage.vue'
import PokemonPage from './pages/PokemonPage.vue'
import NotFound from './pages/NotFound.vue'

const routes = [
  {
    path: '/',
    component: CatalogPage
  },
  {
    path: '/items/new',
    component: NewItemPage
  },
  {
    path: '/items/:id',
    component: ItemPage
  },
  {
    path: '/pokemon',
    component: PokemonPage
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
