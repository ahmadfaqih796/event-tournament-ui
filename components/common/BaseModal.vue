<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
   title: string;
   modelValue: boolean;
   width?: string;
   loading?: boolean;
}>();

const emit = defineEmits(['update:modelValue', 'confirm']);

const closeModal = () => emit('update:modelValue', false);
</script>

<template>
   <v-dialog v-model="props.modelValue" :width="props.width || '500px'" persistent>
      <v-card>
         <v-card-title class="d-flex justify-space-between">
            <span>{{ props.title }}</span>
            <v-btn icon="mdi-close" @click="closeModal"></v-btn>
         </v-card-title>
         <v-card-text>
            <slot></slot>
         </v-card-text>
         <v-card-actions class="justify-end">
            <v-btn color="grey" @click="closeModal">Cancel</v-btn>
            <v-btn color="primary" :loading="props.loading" @click="emit('confirm')">
               {{ props.loading ? 'Please wait...' : 'Confirm' }}
            </v-btn>
         </v-card-actions>
      </v-card>
   </v-dialog>
</template>