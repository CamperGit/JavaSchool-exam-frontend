export function getArticlesPage(state, numberOfPage) {
  return state.articles.get(numberOfPage);
}
