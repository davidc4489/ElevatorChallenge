import Floor from './Floor.js';
import { Elevator } from './Elevator.js';
import ElevatorsController from './ElevatorsController.js';

export default class Building {
    private floors: Floor[];
    private elevators: Elevator[];
    private elevatorsController!: ElevatorsController ;
    public buildingNumber: number

    constructor(buildingIndex: number) {
        this.floors = [];
        this.elevators = [];
        this.buildingNumber = buildingIndex;
    }

    public setElevatorsController(elevatorsController: ElevatorsController): void {
        // Gives a reference to the building on the elevatorsController of this building
        elevatorsController.setBuilding(this);
        this.elevatorsController = elevatorsController;
    }

    public addFloor(floor: Floor): void {
        this.floors.push(floor);
    }

    public addElevator(elevator: Elevator): void {
        // Gives a reference to the building on each elevator of this building
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

    // Function to display the building
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