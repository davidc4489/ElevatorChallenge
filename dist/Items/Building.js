export default class Building {
    elevatorApp;
    floors;
    elevators;
    elevatorsController;
    constructor() {
        this.floors = [];
        this.elevators = [];
    }
    setElevatorApp(elevatorApp) {
        this.elevatorApp = elevatorApp;
    }
    setElevatorsController(elevatorsController) {
        this.elevatorsController = elevatorsController;
    }
    addFloor(floor) {
        this.floors.push(floor);
    }
    addElevator(elevator) {
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
