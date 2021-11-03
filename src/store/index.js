import { createStore } from 'vuex'

import articles from './articles'

export default createStore({
  modules: {
    articles,
  },

  strict: process.env.DEBUGGING
})
