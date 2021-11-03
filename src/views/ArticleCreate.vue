<template>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <label>File
        <input type="file" id="zipInput" ref="zipInput" v-on:change="handleFileUpload"/>
      </label>
      <button v-on:click="submitFile">Submit</button>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import {useStore} from "vuex"

export default {
  name: "ArticleCreate",
  setup() {
    const store = useStore();
    const zipInput = ref(null);
    const loadedFile = ref(null);

    const handleFileUpload = () => {
      loadedFile.value = zipInput.value.files[0];
    }

    const submitFile = () => {
      store.dispatch('articles/createArticleFromZip', {file : loadedFile.value, sectionId : 1})
    }

    return {
      zipInput,
      handleFileUpload,
      submitFile
    }
  }
}
</script>

<style scoped>

</style>