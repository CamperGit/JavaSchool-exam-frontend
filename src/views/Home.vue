<template>
  <div style="height: 100%">
    <div class="center-all container-base row justify-content-center" style="margin: 0 auto;">
      <div id="news-container" class="ma-none pa-none fix-mr">
        <div v-for="article in articles" :key="article" class="pa-none fix-pa fix-mb cursor-pointer" style="border-radius: 3px;" @click="openReadArticleDialog(article)">
          <div class="pa-md bg-none article-item" style="margin-bottom: 50px; text-align: left">
            <span class="text-h6 pb-sm ">{{ article.title }}</span><br>
            <span class="text-caption" v-html="article.text"></span><br>
            <span class="text-caption cursor-pointer" >Читать подробнее...</span>
          </div>
        </div>
      </div>
      <div id="sections-container" :style="'height:' + (31 + 11 + 31 * sections.length) + 'px'" class="ma-none pa-none fix-pa bg-none">
        <div class="py-none">
          <template v-for="(section) in sections" :key="section.sectionId"
          >
<!--            <div  :active="newsTypeValue === type" :active-class="theme('active-list active-list-l', 'active-list active-list-d')" class="select-type-news" @click="newsTypeValue = type">
              <span>{{ type.type }}</span>
            </div>-->
            <div>
              <span>{{section.name}}</span>
            </div>
<!--            <q-separator v-if="id === 0" style="margin: 5px 0" />-->
          </template>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {computed, onMounted, ref} from "vue";
import {useStore} from "vuex";


export default {
  name: 'Home',
  components: {
  },
  setup() {
    const store = useStore();
    const selectedPage = ref(1);
    const articles = computed(()=> {
      const map = store.state.news.articlesPages;
      return map.get(selectedPage.value);
    });
    const sections = computed(()=> store.getters['news/getSections'])


    const openReadArticleDialog = (article) => {

    }

    onMounted(async () => {
      await store.dispatch('news/loadArticlesPage', {pageNumber : selectedPage.value});
      await store.dispatch('news/getAllSections');
    })

    return {
      articles,
      sections,
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

.active-list {
  color: black;
  padding-left: 15px;
}

.active-list-d {
  background: rgba(255, 255, 255, 0.1);
  border-left: 3px solid #9a9a9a;
  color: white;
}

.active-list-l {
  background: rgb(242, 243, 245);
  border-left: 3px solid dodgerblue;
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
