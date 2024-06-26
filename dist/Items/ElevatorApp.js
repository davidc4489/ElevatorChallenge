export default class ElevatorApp {
    buildings;
    constructor() {
        this.buildings = [];
    }
    getBuildings() {
        return this.buildings;
    }
    addBuilding(building) {
        this.buildings.push(building);
    }
    // Function to activate the elevator controller from a building received as an argument to a floor received as an argument
    assignFloorToElevator(buildingIndex, floorNumber) {
        if (buildingIndex >= 0 && buildingIndex < this.buildings.length) {
            const building = this.buildings[buildingIndex];
            building.getElevatorsController().assignFloorToElevator(floorNumber);
        }
    }
}
