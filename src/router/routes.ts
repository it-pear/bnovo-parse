import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requireLogin: true },
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }]
  },
  {
    path: '/users',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requireLogin: true },
    children: [{ path: '', component: () => import('pages/UserList.vue') }]
  },
  {
    path: '/list',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requireLogin: true },
    children: [{ path: '', component: () => import('pages/ListParse.vue') }]
  },
  {
    path: '/login',
    component: () => import('layouts/AuthLayout.vue'),
    meta: { requireLogin: false },
    children: [{ path: '', component: () => import('pages/login.vue') }]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
