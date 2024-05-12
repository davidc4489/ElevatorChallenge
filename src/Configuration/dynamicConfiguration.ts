export class Configuration {
    private static instance: Configuration;
    public numBuildings: number;
    public numFloors: number;
    public numElevators: number;

    private constructor() {
        this.numBuildings = 0;
        this.numFloors = 0;
        this.numElevators = 0;
        this.setDefaultConfiguration();
    }

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
}