export default class ElevatorApp {
    buildings;
    constructor() {
        this.buildings = [];
    }
    addBuilding(building) {
        // building.setElevatorApp(this);
        this.buildings.push(building);
    }
    // Function to activate the elevator controller from a building received as an argument to a floor received as an argument
    assignFloorToElevator(buildingIndex, floorNumber) {
        if (buildingIndex >= 0 && buildingIndex < this.buildings.length) {
            console.log("buildingIndexArgument :", buildingIndex);
            const building = this.buildings[buildingIndex];
            building.getElevatorsController().assignFloorToElevator(floorNumber);
        }
    }
}
