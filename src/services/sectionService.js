import axios from "axios";

class SectionService {
    async getAllSections() {
        try {
            const {data} = await axios.get('/sections')
            return data;
        } catch (e) {
            console.log(e)
            return [];
        }
    }
}

export default new SectionService();
