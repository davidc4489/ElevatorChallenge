export class Configuration {
    static instance; // The instance variable is declared static, meaning it is associated with the Configuration class itself rather than a specific instance of that class.
    numBuildings;
    numFloors;
    numElevators;
    constructor() {
        this.numBuildings = 0;
        this.numFloors = 0;
        this.numElevators = 0;
        this.setDefaultConfiguration();
    }
    // This method adheres to the Singleton design pattern principles by ensuring
    // that only one instance of Configuration exists throughout the application.
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
    getNumBuildings() {
        return this.numBuildings;
    }
    getNumFloors() {
        return this.numFloors;
    }
    getNumElevators() {
        return this.numElevators;
    }
}
