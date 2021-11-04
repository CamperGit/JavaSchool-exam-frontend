export function addArticlesPage(state, {pageNumber, articles}) {
  state.articlesPages.set(pageNumber, articles);
}

export function clearArticlesMap(state) {
  state.articlesPages.clear();
}

export function setSections(state, sections) {
  state.sections = sections;
}