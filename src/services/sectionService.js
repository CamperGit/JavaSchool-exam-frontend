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

    async createNewSectionByName(name) {
        try {
            const {data} = await axios.post('/sections', {}, {
                params: {
                    name,
                },
            });
            return data;
        } catch (e) {
            console.log(e)
            return null;
        }
    }
}

export default new SectionService();
