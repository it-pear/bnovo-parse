<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Bnovo - parse
        </q-toolbar-title>

        <q-icon
          :name="`svguse:icons/allIcons.svg#logout`"
          size="18px"
          style="cursor: pointer;"
          @click="logout"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Навигация
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
// import { ref } from 'vue'
import EssentialLink, { EssentialLinkProps } from 'components/EssentialLink.vue'
import { authApi } from 'src/api/auth.js'
import { useRouter } from 'vue-router'

const router = useRouter()

const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'Аккаунты',
    icon: 'users',
    link: '/users'
  },
  {
    title: 'Данные',
    icon: 'list',
    link: '/list'
  }
]

const logout = async () => {
  await authApi.doLogout()
  router.push('/login')
}

</script>
