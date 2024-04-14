import Building from '../Items/Building.js';
import Floor from '../Items/Floor.js';
import ElevatorFactory from './ElevatorFactory.js';
import Elevator from '../Items/Elevator.js';
import FloorFactory from './FloorFactory.js';


export default class BuildingFactory {
    private floorFactory: FloorFactory;
    private elevatorFactory: ElevatorFactory;

    constructor() {
        this.floorFactory = new FloorFactory();
        this.elevatorFactory = new ElevatorFactory();
    }

    public createBuilding(numFloors: number, numElevators: number): Building {
        const building = new Building();
        for (let i = numFloors - 1; i >= 0; i--) {
            const floor = this.floorFactory.createFloor(i);
            building.addFloor(floor);
        }
        for (let i = 0; i < numElevators; i++) {
            const elevator = this.elevatorFactory.createElevator(i);
            building.addElevator(elevator);
        }
        return building;
    }
}