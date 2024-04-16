export default class ElevatorApp {
    buildings;
    constructor() {
        this.buildings = [];
    }
    addBuilding(building) {
        building.setElevatorApp(this);
        this.buildings.push(building);
    }
    assignFloorToElevator(buildingIndex, floorNumber) {
        if (buildingIndex >= 0 && buildingIndex < this.buildings.length) {
            const building = this.buildings[buildingIndex];
            building.getElevatorsController().assignFloorToElevator(floorNumber);
        }
    }
}
