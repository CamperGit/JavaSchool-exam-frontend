export function getArticlesPage(state, numberOfPage) {
  return state.articlesPages.get(numberOfPage);
}

export function getSections(state) {
  return state.sections;
}