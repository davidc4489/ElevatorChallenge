import Building from "./Building.js";

export default class ElevatorApp {
    private buildings: Building[];

    constructor() {
        this.buildings = [];
    }

    public getBuildings(): Building[] {
        return this.buildings;
    }


    public addBuilding(building : Building) {
        this.buildings.push(building);
    }

    // Function to activate the elevator controller from a building received as an argument to a floor received as an argument
    assignFloorToElevator(buildingIndex: number, floorNumber: number) {
        if (buildingIndex >= 0 && buildingIndex < this.buildings.length) {
            const building = this.buildings[buildingIndex];
            building.getElevatorsController().assignFloorToElevator(floorNumber);
        }
    }
}