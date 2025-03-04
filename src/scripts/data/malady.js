import malady from '../globals/malady.json'

class Malady {
    static getMalady() {
        try {
            return malady || [];
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
}

export default Malady;
