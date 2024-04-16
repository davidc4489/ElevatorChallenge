import Floor from './Floor.js';
import Elevator from './Elevator.js';
import ElevatorApp from './ElevatorApp.js';
import ElevatorsController from './ElevatorsController.js';

export default class Building {
    private elevatorApp!: ElevatorApp;
    private floors: Floor[];
    private elevators: Elevator[];
    private elevatorsController!: ElevatorsController ;

    constructor() {
        this.floors = [];
        this.elevators = [];
    }

    public setElevatorApp(elevatorApp: ElevatorApp): void {
        this.elevatorApp = elevatorApp;
    }

    public setElevatorsController(elevatorsController: ElevatorsController): void {
        this.elevatorsController = elevatorsController;
    }

    public addFloor(floor: Floor): void {
        this.floors.push(floor);
    }

    public addElevator(elevator: Elevator): void {
        elevator.setBuilding(this);
        this.elevators.push(elevator);
    }

    public getFloors(): Floor[] {
        return this.floors;
    }

    public getElevators(): Elevator[] {
        return this.elevators;
    }

    public getElevatorsController(): ElevatorsController {
        return this.elevatorsController;
    }

    public renderBuilding(numFloors: number): string {
        const marginRight = (numFloors * 75);
        let buildingHTML = `<div style="margin-right: ${marginRight}px; display: flex; position: relative;" class="building-container">`;
        buildingHTML += '<div class="floors-container">';
        for (const floor of this.floors) {
            buildingHTML += floor.render();
        }
        buildingHTML += '</div>'; 
        buildingHTML += '<div class="elevators-container">';
        for (const elevator of this.elevators) {
            buildingHTML += elevator.render();
        }
        buildingHTML += '</div>';
        buildingHTML += '</div>';
        return buildingHTML;
    }

}