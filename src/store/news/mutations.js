export function addArticlesPage(state, {pageNumber, page}) {
  state.articlesPages.set(pageNumber, page);
}

export function clearArticlesMap(state) {
  state.articlesPages.clear();
}

export function setSections(state, sections) {
  state.sections = sections;
}

export function addNewSection(state, section) {
  state.sections.push(section);
}