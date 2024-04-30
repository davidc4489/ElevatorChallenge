import BuildingFactory from './BuildingFactory.js';
import ElevatorApp from '../Items/ElevatorApp.js';
export default class ElevatorAppFactory {
    createElevatorApp(numBuildings, numFloors, numElevators) {
        const elevatorApp = new ElevatorApp();
        const buildingFactory = new BuildingFactory();
        for (let buildingIndex = 0; buildingIndex < numBuildings; buildingIndex++) {
            const building = buildingFactory.createBuilding(numFloors, numElevators, buildingIndex);
            elevatorApp.addBuilding(building);
        }
        return elevatorApp;
    }
}
