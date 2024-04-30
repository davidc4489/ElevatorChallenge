export default class Building {
    // private elevatorApp!: ElevatorApp;
    floors;
    elevators;
    elevatorsController;
    buildingNumber;
    constructor(buildingIndex) {
        this.floors = [];
        this.elevators = [];
        this.buildingNumber = buildingIndex;
    }
    // public setElevatorApp(elevatorApp: ElevatorApp): void {
    //     this.elevatorApp = elevatorApp;
    // }
    setElevatorsController(elevatorsController) {
        // Gives a reference to the building on the elevatorsController of this building
        elevatorsController.setBuilding(this);
        this.elevatorsController = elevatorsController;
    }
    addFloor(floor) {
        this.floors.push(floor);
    }
    addElevator(elevator) {
        // Gives a reference to the building on each elevator of this building
        elevator.setBuilding(this);
        this.elevators.push(elevator);
    }
    getFloors() {
        return this.floors;
    }
    getElevators() {
        return this.elevators;
    }
    getElevatorsController() {
        return this.elevatorsController;
    }
    // Function to display the building
    renderBuilding(numFloors) {
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
