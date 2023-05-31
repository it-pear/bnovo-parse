<template>
  <q-dialog v-model="prompt">
    <CreateUser :user="updateUser" @update="getUsers(); prompt = false" />
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
          <q-btn round color="primary" icon="edit" class="btn-custom" size="10px" @click="openUpdateUser(user)" />
          <q-btn round color="negative" icon="delete" class="btn-del" size="10px" @click="deleteUser(user.id)" />
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
            <span class="q-ml-md">**************</span>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang='ts'>
import { ref, Ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { Iusers } from 'src/types/models'
import { accountApi } from 'src/api/account.js'
import CreateUser from 'components/CreateUser.vue'

const $q = useQuasar()

const users = ref<Iusers[]>([])

const prompt: Ref<boolean> = ref(false)
const updateUser: Ref<object> = ref(null)

const getUsers = async () => {
  try {
    const resp = await accountApi.getAll()
    users.value = resp
  } catch (err) {
    console.log(err)
  }
}

const deleteUser = async (id: string) => {
  try {
    $q.loading.show()
    await accountApi.del(id)
    await getUsers()
    $q.loading.hide()
    $q.notify({
      color: 'positive',
      textColor: 'white',
      message: 'Удалено'
    })
  } catch (err) {
    console.log(err)
    $q.notify({
      color: 'negative',
      textColor: 'white',
      message: 'Произошла ошибка'
    })
  }
}

const openUpdateUser = async (user: Iusers) => {
  updateUser.value = user
  prompt.value = true
}

onMounted(async () => {
  $q.loading.show()
  await getUsers()
  $q.loading.hide()
})

</script>
