<template>
  <q-page class="q-pa-md page-auth">
    <h2 class="text-h2 text-center">Вход</h2>
    <q-form
      @submit="onSubmit"
      class="q-gutter-md row justify-center"
    >
    <div style="min-width: 350px;">
      <q-input
        v-model="formData.username"
        label="Введите email"
        lazy-rules
        :rules="[ val => val && val.length > 0 || '']"
      />

      <q-input
        type="password"
        v-model="formData.password"
        label="Введите пароль"
        lazy-rules
        :rules="[ val => val && val.length > 0 || '']"
      />

      <div>
        <q-btn label="Войти" type="submit" color="primary" :loading="loading"/>
      </div>
    </div>
    </q-form>

  </q-page>
</template>

<script setup lang="ts">
// import { ref } from 'vue'
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { authApi } from 'src/api/auth.js'

const $q = useQuasar()
const loading = ref(false)

const formData = ref({
  username: '',
  password: ''
})

async function onSubmit () {
  loading.value = true
  try {
    await authApi.doLogin(formData.value)
    $q.notify({
      color: 'positive',
      textColor: 'white',
      message: 'Вы успешно вошли'
    })
    setTimeout(() => {
      window.location.href = '/'
    }, 1000)
  } catch (err) {
    console.log(err)
    $q.notify({
      color: 'negative',
      textColor: 'white',
      message: 'email или пароль неправильные'
    })
  } finally {
    loading.value = false
  }
}

</script>
