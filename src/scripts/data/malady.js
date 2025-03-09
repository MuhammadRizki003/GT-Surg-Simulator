import malady from '../globals/malady.json'

class Malady {
    static getMalady() {
        try {
            return malady.sort((a, b) => a.problem.localeCompare(b.problem)) || [];
        } catch (error) {
            console.error('Error fetching tools:', error);
            return [];
        }
    }
    static getMaladyByName(name) {
        try {
            const malady = this.getMalady();
            return malady.find(mal => mal.problem === name) || null;
        } catch (error) {
            console.error('Error fetching malady by name:', error);
            return null;
        }
    }
    static getProblems() {
        try {
            const maladyList = this.getMalady();
            return maladyList.map(mal => mal.problem);
        } catch (error) {
            console.error('Error fetching problems:', error);
            return [];
        }
    }
}

export default Malady;
