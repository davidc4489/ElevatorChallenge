export class Configuration {
    static instance;
    numBuildings;
    numFloors;
    numElevators;
    constructor() {
        this.numBuildings = 0;
        this.numFloors = 0;
        this.numElevators = 0;
        this.setDefaultConfiguration();
    }
    static getInstance() {
        if (!Configuration.instance) {
            Configuration.instance = new Configuration();
        }
        return Configuration.instance;
    }
    setConfiguration(numBuildings, numFloors, numElevators) {
        this.numBuildings = numBuildings;
        this.numFloors = numFloors;
        this.numElevators = numElevators;
    }
    setDefaultConfiguration() {
        this.numBuildings = 2;
        this.numFloors = 7;
        this.numElevators = 3;
    }
}
