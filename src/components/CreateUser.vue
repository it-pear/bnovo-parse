<template>
  <q-card style="min-width: 350px">
    <q-card-section>
      <div class="text-h6">
        <span v-if="!user">Добавление аккаунта</span>
        <span v-else>изменить аккаунт {{ user.id }}</span>
      </div>
    </q-card-section>

    <q-form @submit="onSubmit">
      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model="formData.username"
          label="Логин"
          class="q-mb-md"
          :rules="[ val => val && val.length > 0 || '']"
        />
        <q-input
          dense
          v-model="formData.password"
          label="Пароль"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Отмена" v-close-popup />
        <q-btn flat v-if="!user" label="Добавить" :loading="loading" type="submit" />
        <q-btn flat v-else label="Обновить" :loading="loading" type="submit" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { Iusers } from 'src/types/models'
import { accountApi } from 'src/api/account.js'

const $q = useQuasar()
const loading: Ref<boolean> = ref(false)

const props = defineProps({
  user: Object
})

const emit = defineEmits(['update'])

const formData: Ref<Iusers> = ref({
  username: '',
  password: ''
})

const createUser = async () => {
  try {
    loading.value = true
    await accountApi.create(formData.value)
    emit('update')
    loading.value = false
    $q.notify({
      color: 'positive',
      textColor: 'white',
      message: 'Добавлено'
    })
  } catch (err) {
    loading.value = false
    console.log(err)
    $q.notify({
      color: 'negative',
      textColor: 'white',
      message: 'Произошла ошибка'
    })
  }
}

const updateUser = async () => {
  try {
    loading.value = true
    await accountApi.update(props.user)
    emit('update')
    loading.value = false
    $q.notify({
      color: 'positive',
      textColor: 'white',
      message: 'Обновлено'
    })
  } catch (err) {
    loading.value = false
    console.log(err)
    $q.notify({
      color: 'negative',
      textColor: 'white',
      message: 'Произошла ошибка'
    })
  }
}

const onSubmit = async () => {
  if (props.user) updateUser()
  else createUser()
}

onMounted(async () => {
  if (props.user) formData.value = props.user as Iusers
  // await createUser(props.id)
})

</script>
