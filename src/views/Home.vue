<template>
  <div style="height: 100%">
    <div class="center-all container-base row justify-content-center" style="margin: 0 auto;">
      <div id="news-container" class="ma-none pa-none fix-mr">
        <template v-if="currentPage">
          <div v-for="article in currentPage.content" :key="article" class="pa-none fix-pa fix-mb cursor-pointer"
               style="border-radius: 3px;" @click="openReadArticleDialog(article)">
            <div class="pa-md bg-none article-item mb-md" style="text-align: left">
              <span class="text-h6 pb-sm ">{{ article.title }}</span><br>
              <span class="text-caption" v-html="article.text"></span><br>
              <span class="text-caption cursor-pointer">Читать подробнее...</span>
            </div>
          </div>
          <div class="row justify-content-between">
            <div style="width: 250px">
              <button @click="pageNumber--" type="button" class="btn btn-outline-primary" :class="currentPage.first ? 'disabled' : ''"
                      style="width: 100%">Предыдущая страница
              </button>
            </div>
            <div style="width: 250px">
              <button @click="pageNumber++" type="button" class="btn btn-outline-primary" :class="currentPage.last ? 'disabled' : ''"
                      style="width: 100%">Следующая страница
              </button>
            </div>
          </div>
        </template>
      </div>
      <div id="sections-container" :style="'height:' + (40 * sections.length) + 'px'"
           class="ma-none pa-none bg-none" style="padding-left: 0; padding-right: 0">
        <div class="pa-none list-group-flush">
          <ul class="list-group pa-none">
            <li class="list-group-item list-group-item-action cursor-pointer active-list"
                :class="selectedSection.name === 'all' ? 'active' : ''" @click="selectedSection = {name: 'all'}">Все
            </li>
            <template v-for="(section) in sections" :key="section.sectionId">
              <li class="list-group-item list-group-item-action cursor-pointer"
                  :class="selectedSection.name === section.name ? 'active' : ''" @click="selectedSection = section">
                {{ section.name }}
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {computed, onBeforeUnmount, onMounted, ref, watch} from "vue";
import {useStore} from "vuex";


export default {
  name: 'Home',
  components: {},
  setup() {
    const store = useStore();
    const selectedSection = ref({name: 'all'});
    const pageNumber = ref(0);
    const currentPage = computed( () => {
      const map = store.state.news.articlesPages;
      return map.get(pageNumber.value);
    });
    const sections = computed(() => store.getters['news/getSections'])


    const openReadArticleDialog = (article) => {

    }

    watch(pageNumber, async (newVal) => {
      const map = store.getters['news/getArticlesPage'];
      const values = map.get(newVal);
      if (!values) {
        const sectionId = getSectionId();
        await store.dispatch('news/loadArticlesPage', {pageNumber: newVal, sectionId});
      }
    })

    const getSectionId = () => {
      if (selectedSection.value.name !== 'all') {
        return selectedSection.value.sectionId;
      } else {
        return null;
      }
    }

    watch(selectedSection, async (val) => {
      if (val.name === 'all') {
        await store.dispatch('news/loadArticlesPage', {pageNumber : pageNumber.value})
        console.log(val)
      } else {
        await store.dispatch('news/loadArticlesPage', {pageNumber : pageNumber.value, sectionId : val.sectionId})
      }
      pageNumber.value = 0;
    })

    onMounted(async () => {
      await store.dispatch('news/loadArticlesPage', {pageNumber: pageNumber.value});
      await store.dispatch('news/getAllSections');
    })

    onBeforeUnmount(()=> {
      store.commit('news/clearArticlesMap');
    })

    return {
      currentPage,
      sections,
      selectedSection,
      pageNumber,
      openReadArticleDialog
    }
  }
}
</script>

<style lang="css" scoped>
@import '../css/style.css';

.bg-none {
  background-color: white;
}

#news-container {
  width: 800px;
  min-width: 800px;
  border-radius: 4px;
}

#sections-container {
  width: 230px;
  border-radius: 4px;
}

.article-item {
  border-radius: 4px;
}

.select-type-news {
  min-height: 10px;
  margin: 0 -15px;
  padding: 5px 5px 5px 25px;
}

.news-p {
  padding-top: 16px;
}

.border {
  border: 1px solid black;
}

.main-row {
  padding-right: 24px;
  padding-left: 24px;

}

.scroll-hidden {
  overflow: auto;
  -ms-overflow-style: none;
}

.scroll-hidden::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.fix-mr {
  margin-right: 15px;
}

.container-base {
  max-width: 1600px;
}

</style>
