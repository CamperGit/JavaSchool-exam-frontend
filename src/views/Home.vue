<template>
  <div style="height: 100%">
    <div class="center-all container-base row justify-content-center" style="margin: 0 auto;">
      <div id="news-container" class="ma-none pa-none fix-mr">
        <template v-if="currentPage">
          <div v-for="article in currentPage.content" :key="article" class="pa-none fix-pa fix-mb cursor-pointer"
               style="border-radius: 3px;" @click="openReadArticleDialog(article)" data-bs-toggle="modal" data-bs-target="#article-info-dialog">
            <div class="pa-md bg-none article-item mb-md" style="text-align: left">
              <div class="pb-md">
                <span class="text-h6" style="font-weight: bold">{{ article.title }}</span><br>
              </div>
              <div class="pb-sm"><span class="text-caption" >{{getArticleText(article)}}</span><br></div>
              <div class="row justify-content-between">
                <div style="width: 250px"><span>Читать подробнее...</span></div>
                <div style="width: 156px; margin-right: 15px"><span>{{formatDate(new Date(article.dateOfCreation))}}</span></div>
              </div>
            </div>
          </div>
          <div class="row justify-content-between pb-xs">
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
      <div id="sections-container" :style="'height:' + (34 + 18 + 30 + 40 * sections.length) + 'px'"
           class="ma-none pa-none bg-none" style="padding-left: 0; padding-right: 0">
        <div class="pa-none list-group-flush">
          <ul id="section-list" class="list-group pa-none">
            <li class="list-group-item list-group-item-action cursor-pointer"
                :class="selectedSection.name === 'all' ? 'active' : ''" @click="selectedSection = {name: 'all'}">Все
            </li>
            <div class="separator"/>
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
    <div class="modal fade" id="article-info-dialog" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
      <div class="modal-dialog modal-dialog-centered modal-lg"  >
        <div class="modal-content" >
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel" style="margin-right: 45px">{{articleDialogTitle}}</h5>
            <button id="close-modal-button" type="button" class="btn-close btn-lg"  data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" style="text-align: left">
            <div>{{articleDialogText}}</div>
          </div>
          <div class="modal-footer">
            <div>{{articleDialogDate}}</div>
          </div>
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
  components: {
  },
  setup() {
    const store = useStore();
    const selectedSection = ref({name: 'all'});
    const pageNumber = ref(0);
    const sections = computed(() => store.getters['news/getSections'])
    const currentPage = computed( () => {
      const map = store.state.news.articlesPages;
      const page = map.get(pageNumber.value);
      return page;
    });
    const articleDialogTitle = ref('');
    const articleDialogText = ref('');
    const articleDialogDate = ref('');

    const formatDate = (date) => {
      let dd = date.getDate();
      if (dd < 10) dd = '0' + dd;
      let mm = date.getMonth() + 1;
      if (mm < 10) mm = '0' + mm;
      let yy = date.getFullYear();
      let hours = date.getHours();
      if (hours < 10) hours = '0' + hours;
      let minutes = date.getMinutes();
      if (minutes < 10) minutes = '0' + minutes;
      return dd + '.' + mm + '.' + yy + ' ' + hours + ':' + minutes ;
    }

    const openReadArticleDialog = (article) => {
      articleDialogTitle.value = article.title;
      articleDialogText.value = article.text;
      articleDialogDate.value = formatDate(new Date(article.dateOfCreation));
    }

    const getArticleText = (article) => {
      const text = article.text;
      if (text.length > 1000) {
        return text.substr(0, 1000);
      } else {
        return text;
      }
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
      store.commit('news/clearArticlesMap')
      if (val.name === 'all') {
        await store.dispatch('news/loadArticlesPage', {pageNumber : pageNumber.value})
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
      articleDialogTitle,
      articleDialogText,
      articleDialogDate,
      openReadArticleDialog,
      getArticleText,
      formatDate
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
  width: 280px;
  border-radius: 4px;
}

.article-item {
  border-radius: 4px;
}

#section-list {
  padding-top: 15px;
  padding-bottom: 15px;
}

#section-list > li.active {
  color: black;
  padding-left: 20px;
  background: rgb(242, 243, 245);
  border-left: 4px solid dodgerblue;
  border-top: none;
  border-bottom: none;
  border-right: none;
}

#section-list > li {
  border: none;
  text-align: left;
  padding-top: 8px ;
  padding-bottom: 8px ;
}

#close-modal-button {
  margin-right: -65px;
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
