export class Configuration {
    private static instance: Configuration; // The instance variable is declared static, meaning it is associated with the Configuration class itself rather than a specific instance of that class.
    private numBuildings: number;
    private numFloors: number;
    private numElevators: number;

    private constructor() {
        this.numBuildings = 0;
        this.numFloors = 0;
        this.numElevators = 0;
        this.setDefaultConfiguration();
    }

    // This method adheres to the Singleton design pattern principles by ensuring
     // that only one instance of Configuration exists throughout the application.
    public static getInstance(): Configuration {
        if (!Configuration.instance) {
            Configuration.instance = new Configuration();
        }
        return Configuration.instance;
    }

    public setConfiguration(numBuildings: number, numFloors: number, numElevators: number): void {
        this.numBuildings = numBuildings;
        this.numFloors = numFloors;
        this.numElevators = numElevators;
    }

    public setDefaultConfiguration(): void {
        this.numBuildings = 2;
        this.numFloors = 7;
        this.numElevators = 3;
    }

    public getNumBuildings(): number {
        return this.numBuildings;
    }

    public getNumFloors(): number {
        return this.numFloors;
    }

    public getNumElevators(): number {
        return this.numElevators;
    }
}