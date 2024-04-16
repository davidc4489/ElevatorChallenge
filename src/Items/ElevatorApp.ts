import Building from "./Building.js";

export default class ElevatorApp {
    buildings: Building[];

    constructor() {
        this.buildings = [];
    }

    addBuilding(building : Building) {
        building.setElevatorApp(this);
        this.buildings.push(building);
    }

    assignFloorToElevator(buildingIndex: number, floorNumber: number) {
        if (buildingIndex >= 0 && buildingIndex < this.buildings.length) {
            const building = this.buildings[buildingIndex];
            building.getElevatorsController().assignFloorToElevator(floorNumber);
        }
    }
}