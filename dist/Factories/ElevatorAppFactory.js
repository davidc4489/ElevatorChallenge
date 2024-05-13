import BuildingFactory from './BuildingFactory.js';
import ElevatorApp from '../Items/ElevatorApp.js';
export default class ElevatorAppFactory {
    createElevatorApp(numBuildings, numFloors, numElevators, elevatorType) {
        const elevatorApp = new ElevatorApp();
        const buildingFactory = new BuildingFactory();
        // Allocation to the elevatorApp of its buildingss
        for (let buildingIndex = 0; buildingIndex < numBuildings; buildingIndex++) {
            const building = buildingFactory.createBuilding(numFloors, numElevators, buildingIndex, elevatorType);
            elevatorApp.addBuilding(building);
        }
        return elevatorApp;
    }
}
