<template>
  <div style="height: 100%">
    <div class="row center-all container-base row justify-content-center" style="margin: 0 auto;">
      <div id="article-loading-container" class="ma-none pa-none fix-mr col-4 bg-none">
        <div class="container">
          <div style="margin-top: 15px">
            <h4>Загрузка статьи</h4>
          </div>
          <div class="separator"></div>
          <div class="py-md">
            <select v-model="selectedSection" class="form-select form-select-sm" aria-label=".form-select-sm example">
              <option :value="0" selected>Без раздела</option>
              <template v-for="section of sections" :key="section.sectionId">
                <option :value="section.sectionId">{{ section.name }}</option>
              </template>
            </select>
          </div>
          <div class="input-group mb-3">
            <input type="file" id="zipInput" ref="zipInput" v-on:change="handleFileUpload" class="border-primary form-control"
                   placeholder="Архив со статьёй" aria-label="123e" aria-describedby="button-addon2" style="border-right: none">
            <button v-on:click="submitFile" class="btn btn-outline-primary" type="button">Загрузить</button>
          </div>
        </div>
      </div>
      <div id="sections-creating-container" class="ma-none pa-none bg-none col-4 bg-none" style="padding-left: 0; padding-right: 0">
        <div class="container">
          <div style="margin-top: 15px">
            <h4>Создание новой рубрики</h4>
          </div>
          <div class="separator"></div>
          <div class="py-md">
          </div>
          <div class="input-group mb-3">
            <input type="text" v-model="sectionName" class="border-primary form-control"
                   placeholder="Названии новой рубрики" aria-label="123e" aria-describedby="button-addon2" style="border-right: none">
            <button @click="createNewSection(sectionName)" class="btn btn-outline-primary" :disabled="!(sectionName && sectionName.length > 2 && sectionName.length < 250)" type="button">Загрузить</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {computed, onMounted, ref, watch} from "vue";
import {useStore} from "vuex"


export default {
  name: "ArticleCreate",
  setup() {
    const store = useStore();
    const zipInput = ref(null);
    const loadedFile = ref(null);
    const sections = computed(()=> store.getters['news/getSections'])
    const selectedSection = ref(0);
    const sectionName = ref('');

    const handleFileUpload = () => {
      loadedFile.value = zipInput.value.files[0];
    }

    const submitFile = () => {
      let sectionId;
      if (selectedSection.value !== 0) {
        sectionId = selectedSection.value;
      }
      store.dispatch('news/createArticleFromZip', {file : loadedFile.value, sectionId})
    }

    const createNewSection = async (name) => {
      await store.dispatch('news/createNewSectionByName', name);
    }

    watch(sectionName, (val) => {
      console.log(val)
    })

    onMounted(async () => {
      await store.dispatch('news/getAllSections');
    })

    return {
      zipInput,
      sections,
      selectedSection,
      sectionName,
      handleFileUpload,
      submitFile,
      createNewSection
    }
  }
}
</script>

<style scoped>
@import '../css/style.css';

#article-loading-container {
  margin-right: 15px;
}

#sections-creating-container {
  margin-left: 15px;
}
</style>