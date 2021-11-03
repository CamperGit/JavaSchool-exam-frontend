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
}

export default new ArticleService();
