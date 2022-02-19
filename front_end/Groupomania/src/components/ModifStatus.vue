<template>
<div class="ModifStatus">
<form @submit.prevent="handleSubmit">
  <input type="file" @change="uploadFile" />
  <input type="text" >

</form>
</div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  setup() {

  },
});
</script>

<style lang="sass" scoped>

</style>
