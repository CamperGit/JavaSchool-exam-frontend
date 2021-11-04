import ArticleService from "../../services/articleService"
import SectionService from "../../services/sectionService"


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
    let page;
    if (sectionId) {
        page = await ArticleService.getArticlesPageBySection(pageNumber, sectionId);
    } else {
        page = await ArticleService.getArticlesPage(pageNumber);
    }
    commit('addArticlesPage', {pageNumber, page})
}
