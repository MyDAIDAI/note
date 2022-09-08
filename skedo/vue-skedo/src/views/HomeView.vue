<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import Emitter from "@/object/Emitter";

const emitter = new Emitter();
emitter.on('move').subscribe((data: any) => {
  console.log('move', data);
})
emitter.emit('move', 'test');
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
