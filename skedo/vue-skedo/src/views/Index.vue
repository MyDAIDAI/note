<script setup lang="ts">
import Emitter from "@/object/Emitter";
import {Draggable} from "@/components/Draggable";


const emitter = new Emitter();
emitter.on('move').subscribe((data: any) => {
  console.log('move', data);
})
emitter.emit('move', 'test');
</script>
<template>
  <main>
    <Draggable>
      <div class="draggable-item"></div>
    </Draggable>
  </main>
</template>
<style scoped>
.draggable-item {
  width: 100px;
  height: 100px;
  background-color: green;
}
</style>