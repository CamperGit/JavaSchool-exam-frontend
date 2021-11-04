<template>
  <div class="hello">
    <div v-for="article of data" :key="article">
      {{article.title}}
    </div>
  </div>
  <button class="btn btn-primary"
          data-bs-target="#collapseTarget"
          data-bs-toggle="collapse">
    Bootstrap collapse
  </button>
  <div class="collapse py-2" id="collapseTarget">
    This is the toggle-able content!
  </div>
</template>

<script>
import axios from "axios";
import {onMounted, ref} from "vue";
export default {
  name: 'HelloWorld',
  setup() {
    const data = ref([]);

    const getArticles = async () => {
      try {
        const data = await axios.get("/articles", {})
        console.log(data)
        console.log(data.data)
        return data.data
      } catch (e) {
        console.error(e);
        console.error(e.message);
        console.error(e.response);
        console.error(e.response.data);
        console.error(e.response.data.message);
        console.error(e.message);
        console.error(e.toString());
        return e;
      }
    }

    onMounted(async () => {
      data.value = await getArticles();
    })

    return {
      data
    }
  }
}
</script>

<style scoped>

</style>
