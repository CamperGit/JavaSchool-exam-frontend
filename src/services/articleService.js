import axios from "axios";

class ArticleService {
    async createArticle(file, sectionId) {
        let formData = new FormData();
        formData.append('file', file);
        if (sectionId) {
            formData.append('sectionId', sectionId);
        }
        const {data} = await axios.post('/articles', formData,{
            headers : {
                'Content-Type' : 'multipart/form-data'
            }
        })
        console.log(data);
    }

    async getArticlesPage(pageNumber) {
        try {
            const {data} = await axios.get("/articles", {
                params: {
                    pageNumber,
                },
            })
            return data
        } catch (e) {
            console.log(e)
            return [];
        }
    }

    async getArticlesPageBySection(pageNumber, sectionId) {
        try {
            const {data} = await axios.get("/articlesBySection", {
                params: {
                    pageNumber,
                    sectionId
                },
            })
            return data
        } catch (e) {
            console.log(e)
            return [];
        }
    }
}

export default new ArticleService();
