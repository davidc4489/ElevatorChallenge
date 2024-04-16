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
    createBuilding(numFloors, numElevators) {
        const building = new Building();
        for (let i = numFloors - 1; i >= 0; i--) {
            const floor = this.floorFactory.createFloor(i);
            building.addFloor(floor);
        }
        for (let i = 0; i < numElevators; i++) {
            const elevator = this.elevatorFactory.createElevator(i);
            building.addElevator(elevator);
        }
        building.setElevatorsController(this.elevatorsControllerFactory.createElevatorsController(building.getFloors(), building.getElevators()));
        return building;
    }
}
