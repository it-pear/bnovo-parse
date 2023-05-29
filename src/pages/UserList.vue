<template>
  <q-dialog v-model="prompt">
    <CreateUser />
  </q-dialog>
  <q-page class='column justify-start page-users'>
    <div class="head row q-mb-lg items-center">
      <div class="text-h4">Аккаунты</div>
      <q-btn color="primary" label="добавить" class="btn-custom q-ml-auto" @click="prompt = true" />
    </div>
    <div class='user-list row'>
      <q-card
        flat
        bordered
        class='my-card q-mb-md'
        v-for='user in users'
        :key='user.username'
      >
        <q-card-section>
          <q-btn round color="primary" icon="edit" class="btn-custom" size="10px" />
          <q-btn round color="negative" icon="delete" class="btn-del" size="10px" />
          <div class='text-h6'>
            <q-icon
              :name="`svguse:icons/allIcons.svg#users`"
              size="24px"
            />
            <span class="q-ml-md">{{ user.username }}</span>
          </div>
          <div class='text-h6'>
            <q-icon
              :name="`svguse:icons/allIcons.svg#pass`"
              size="24px"
            />
            <span class="q-ml-md">{{ user.password }}</span>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang='ts'>
import { ref, Ref } from 'vue'
import { Iusers } from 'src/types/models'
import CreateUser from 'components/CreateUser.vue'

const users: Ref<Iusers[]> = ref([
  {
    id: '64663bec2da69+21316',
    username: '64663bec2da69+21316@customapp.bnovo.ru',
    password: '03eb3cd90d6e9099'
  },
  {
    id: '64663eer2da69+21316',
    username: '64527f869808b+30997@customapp.bnovo.ru',
    password: '002efe1e054ae16b'
  }
])

const prompt: Ref<boolean> = ref(false)

const deleteUser = (username: string) => {
  try {
    return username
  } catch (err) {
    console.log(err)
  }
}

</script>
