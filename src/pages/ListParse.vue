<template>
  <q-page class="row items-center justify-evenly">
    <q-table
      flat bordered
      grid
      grid-header
      :rows="rows"
      :columns="columns"
      row-key="name"
      hide-header
      hide-pagination
      :pagination="pagination"
      style="width: 100%;"
      class="my-table q-mb-md"
    >
      <template v-slot:top-left>
        <h3 class="q-ma-none q-mb-md">Данные</h3>
      </template>
      <template v-slot:top-right>
        <q-select
          filled
          v-model="query.st"
          :options="[
            {
              value: 'send',
              label: 'Отправлено'
            },
            {
              value: 'stage',
              label: 'Ожидает'
            },
          ]"
          option-value="value"
          option-label="label"
          emit-value
          map-options
          label="Статус в телеграме"
          class="q-mr-md q-mb-md"
          size="sm"
          style="min-width: 220px;"
        >
          <template v-slot:append>
            <q-icon v-if="query.st" name="close" @click.stop.prevent="query.st = null" class="cursor-pointer" />
          </template>
        </q-select>
        <q-select
          filled
          v-model="query.sn"
          :options="['Отменен', 'Новое', 'Проверено']"
          option-value="value"
          option-label="label"
          emit-value
          map-options
          label="Статус брони"
          class="q-mr-md q-mb-md"
          size="sm"
          style="min-width: 220px;"
        >
          <template v-slot:append>
            <q-icon v-if="query.sn" name="close" @click.stop.prevent="query.sn = null" class="cursor-pointer" />
          </template>
        </q-select>
        <q-select
          filled
          v-model="query.h"
          :options="hotels"
          option-value="value"
          option-label="label"
          emit-value
          map-options
          label="Выберите отель"
          class="q-mr-md q-mb-md"
          size="sm"
          style="min-width: 220px;"
        >
          <template v-slot:append>
            <q-icon v-if="query.h" name="close" @click.stop.prevent="query.h = null" class="cursor-pointer" />
          </template>
        </q-select>

        <q-btn
          color="primary"
          size="lg"
          class="q-mb-md"
          :label="getData ? getData?.to ? `${getData.to} - ${getData.from}` : getData : 'Выберите дату'"
        >
          <q-menu ref="menuRef">
            <q-date v-model="getData" range @update:model-value="hideMenu" />
          </q-menu>
          <q-icon name="close" class="q-ml-md" @click.stop="getData = null" v-if="getData" />
        </q-btn>
      </template>
    </q-table>

    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="pagination.page"
        :max="pagesNumber"
        :max-pages="5"
        direction-links
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { IPagination, Iquery, IBooking, IHotel } from 'src/types/models'
import { ref, Ref, computed, ComputedRef, onMounted, watch } from 'vue'
import { useQuasar } from 'quasar'
import { hotelApi } from 'src/api/hotel.js'
import { bookingApi } from 'src/api/booking.js'

const $q = useQuasar()

const columns = [
  {
    name: 'id',
    required: true,
    label: 'id',
    align: 'left',
    field: row => row.id,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'status_name', align: 'left', label: 'Статус заявки', field: 'status_name', sortable: true },
  { name: 'telegram_status', align: 'left', label: 'Статус в телеграм', field: 'telegram_status', sortable: true },
  { name: 'hotel', align: 'left', label: 'Отель', field: row => row.hotel.name, sortable: true },
  { name: 'address', align: 'left', label: 'Адрес отеля', field: row => `${row.hotel.city} ${row.hotel.address}`, sortable: true },
  { name: 'name', align: 'left', label: 'Имя клиента', field: 'name', sortable: false },
  { name: 'surname', align: 'left', label: 'Фамилия клиента', field: 'surname', sortable: false },
  { name: 'phone', align: 'left', label: 'Телефон клиента', field: row => row.client.phone, sortable: false },
  { name: 'email', align: 'left', label: 'Email клиента', field: row => row.client.email, sortable: false }
]

const rows: Ref<IBooking[]> = ref([])

const pagination: Ref<IPagination> = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 8
})
const count: Ref<number> = ref(1)
const pagesNumber: ComputedRef<number> = computed(() => Math.ceil(count.value / pagination.value.rowsPerPage))

const query: Ref<Iquery> = ref({
  lim: pagination.value.rowsPerPage,
  off: pagination.value.rowsPerPage * (pagination.value.page - 1),
  h: null,
  sn: null,
  st: null,
  a: null,
  as: null,
  ae: null
})

const menuRef = ref(null)
const hideMenu = () => {
  const menuElement = menuRef.value as any
  menuElement.hide()
}

const hotels: Ref<IHotel[]> = ref(null)
const getHotels = async () => {
  try {
    const resp = await hotelApi.getHotels()
    const options = resp.map(hotel => ({
      label: hotel.name,
      value: hotel.id
    }))
    hotels.value = options
  } catch (err) {
    console.log(err)
  }
}
const getList = async () => {
  try {
    const resp = await bookingApi.getList(query.value)
    rows.value = resp
  } catch (err) {
    console.log(err)
  }
}
const getCount = async () => {
  try {
    const resp = await bookingApi.getCount(query.value)
    count.value = resp
  } catch (err) {
    console.log(err)
  }
}

const updateQuery = async () => {
  query.value.off = pagination.value.rowsPerPage * (pagination.value.page - 1)
  $q.loading.show()
  await getCount()
  await getList()
  $q.loading.hide()
}

const convertToIsoDate = (date: string): string => {
  return new Date(date).toISOString()
}
const getData = ref(null)
watch(getData, async (newGetDataValue) => {
  if (typeof newGetDataValue === 'object' && newGetDataValue !== null) {
    if ('from' in newGetDataValue && 'to' in newGetDataValue) {
      query.value.a = null
      query.value.as = convertToIsoDate(newGetDataValue.from)
      query.value.ae = convertToIsoDate(newGetDataValue.to)
    }
  } else if (typeof newGetDataValue === 'string') {
    query.value.as = null
    query.value.ae = null
    query.value.a = convertToIsoDate(newGetDataValue)
  } else {
    query.value.as = null
    query.value.ae = null
    query.value.a = null
  }
  await updateQuery()
})

watch([
  () => pagination.value.page,
  () => query.value.h,
  () => query.value.sn,
  () => query.value.st
], async () => {
  updateQuery()
})

onMounted(async () => {
  $q.loading.show()
  await getHotels()
  await getList()
  await getCount()
  $q.loading.hide()
})

</script>
