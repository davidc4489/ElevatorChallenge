import Building from "./Building.js";

export default class ElevatorApp {
    buildings: Building[];

    constructor() {
        this.buildings = [];
    }

    addBuilding(building : Building) {
        this.buildings.push(building);
    }

    // Function to activate the elevator controller from a building received as an argument to a floor received as an argument
    assignFloorToElevator(buildingIndex: number, floorNumber: number) {
        if (buildingIndex >= 0 && buildingIndex < this.buildings.length) {
            console.log("buildingIndexArgument :", buildingIndex);
            const building = this.buildings[buildingIndex];
            building.getElevatorsController().assignFloorToElevator(floorNumber);
        }
    }
}