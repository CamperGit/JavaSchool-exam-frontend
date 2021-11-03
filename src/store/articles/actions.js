import ArticleService from "../../services/articleService"

// eslint-disable-next-line no-unused-vars
export async function createArticleFromZip({commit}, {file, sectionId}) {
    try {
        await ArticleService.createArticle(file, sectionId)
    } catch (e) {
        console.log(e);
    }
}
