<template>
  <q-card style="min-width: 350px">
    <q-card-section>
      <div class="text-h6">Добавление аккаунта</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-input dense v-model="formData.username" label="Логин" class="q-mb-md"/>
      <q-input dense v-model="formData.password" label="Пароль"/>
    </q-card-section>

    <q-card-actions align="right" class="text-primary">
      <q-btn flat label="Отмена" v-close-popup />
      <q-btn flat label="Добавить" />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue'
import { Iusers } from 'src/types/models'

const formData: Ref<Iusers> = ref({
  username: '',
  password: ''
})

</script>
