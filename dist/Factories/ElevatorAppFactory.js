import BuildingFactory from './BuildingFactory.js';
import ElevatorApp from '../Items/ElevatorApp.js';
export default class ElevatorAppFactory {
    createElevatorApp(numBuildings, numFloors, numElevators) {
        const elevatorApp = new ElevatorApp();
        const buildingFactory = new BuildingFactory();
        for (let i = 0; i < numBuildings; i++) {
            const building = buildingFactory.createBuilding(numFloors, numElevators);
            elevatorApp.addBuilding(building);
        }
        return elevatorApp;
    }
}
