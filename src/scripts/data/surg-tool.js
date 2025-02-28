import surtoolData from '../globals/surtool.json'

class SurgTools {
    static getTools(language = 'id') {
        try {
            return surtoolData[language] || [];
        } catch (error) {
            console.error('Error fetching tools:', error);
            return [];
        }
    }
    static getToolByName(toolname, language = 'id') {
        try {
            const tools = this.getTools(language);
            return tools.find(tool => tool.toolname === toolname) || null;
        } catch (error) {
            console.error('Error fetching tool by name:', error);
            return null;
        }
    }
}

export default SurgTools;
