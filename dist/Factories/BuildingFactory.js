import Building from '../Items/Building.js';
import ElevatorFactory from './ElevatorFactory.js';
import FloorFactory from './FloorFactory.js';
import ElevatorsControllerFactory from './ElevatorsControllerFactory.js';
export default class BuildingFactory {
    floorFactory;
    elevatorFactory;
    elevatorsControllerFactory;
    constructor() {
        this.floorFactory = new FloorFactory();
        this.elevatorFactory = new ElevatorFactory();
        this.elevatorsControllerFactory = new ElevatorsControllerFactory();
    }
    createBuilding(numFloors, numElevators, buildingIndex, elevatorType) {
        const building = new Building(buildingIndex);
        building.buildingNumber = buildingIndex;
        // Allocation to the building of its floors
        for (let i = numFloors - 1; i >= 0; i--) {
            const floor = this.floorFactory.createFloor(i, buildingIndex);
            building.addFloor(floor);
        }
        // Allocation to the building of its elevators
        for (let i = 0; i < numElevators; i++) {
            const elevator = this.elevatorFactory.createElevator(elevatorType, i);
            console.log("velo", elevator.velocity);
            building.addElevator(elevator);
        }
        // Allocation to the building of its elevatorsController
        building.setElevatorsController(this.elevatorsControllerFactory.createElevatorsController(building.getFloors(), building.getElevators()));
        return building;
    }
}
