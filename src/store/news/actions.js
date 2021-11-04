import ArticleService from "../../services/articleService"
import SectionService from "../../services/sectionService"


// eslint-disable-next-line no-unused-vars
export async function createArticleFromZip({commit}, {file, sectionId}) {
    try {
        await ArticleService.createArticle(file, sectionId)
    } catch (e) {
        console.log(e);
    }
}

export async function getAllSections({commit}) {
    const sections = await SectionService.getAllSections();
    commit('setSections', sections);
}

export async function loadArticlesPage({commit}, {pageNumber, sectionId}) {
    let articles;
    if (sectionId) {
        articles = await ArticleService.getArticlesPageBySection(pageNumber, sectionId);
    } else {
        articles = await ArticleService.getArticlesPage(pageNumber);
    }
    commit('addArticlesPage', {pageNumber, articles})
}
