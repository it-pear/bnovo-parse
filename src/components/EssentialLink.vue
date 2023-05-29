<template>
  <q-item
    clickable
    :to="link"
  >
    <q-item-section
      v-if="icon"
      avatar
      class="items-center justify-center"
    >
      <q-icon
        :name="`svguse:icons/allIcons.svg#${icon}`"
        size="24px"
      />
    </q-item-section>

    <q-item-section class="justify-center">
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
export interface EssentialLinkProps {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
}
withDefaults(defineProps<EssentialLinkProps>(), {
  caption: '',
  link: '#',
  icon: ''
})
</script>
