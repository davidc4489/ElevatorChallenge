import { floorHeightConfig, secondsPerFloor } from '../config.js';
export default class ElevatorsController {
    buildingFloors;
    buildingElevators;
    waitingFloorsList = [];
    waitingFloors = [];
    constructor(floors, elevators) {
        this.buildingFloors = floors;
        this.buildingElevators = elevators;
    }
    assignFloorToElevator(floorNumber) {
        if (this.buildingElevators.length > 0) {
            this.buildingFloors[this.buildingFloors.length - 1 - floorNumber].isWaiting = true;
            this.buildingFloors[this.buildingFloors.length - 1 - floorNumber].updateRender(); // The floor button turns green
            let closestElevatorIndex = 0;
            let minimalWaitingTime = Infinity;
            for (let i = 0; i < this.buildingElevators.length; i++) {
                const elevator = this.buildingElevators[i];
                const elevatorPosition = elevator.getCurrentPosition();
                let movingTime;
                let totalWaitingTime;
                if (elevator.movingTime > 0) {
                    movingTime = elevator.movingTime + (Math.abs(floorNumber - elevator.floorDestinationNumber) * secondsPerFloor);
                    totalWaitingTime = movingTime + elevator.arrivalWaiting;
                }
                else {
                    movingTime = Math.abs(floorNumber - (elevatorPosition / floorHeightConfig)) * secondsPerFloor;
                    totalWaitingTime = movingTime + elevator.arrivalWaiting;
                }
                if (totalWaitingTime < minimalWaitingTime) {
                    closestElevatorIndex = i;
                    minimalWaitingTime = totalWaitingTime;
                }
            }
            if (minimalWaitingTime !== Infinity) {
                this.buildingFloors[this.buildingFloors.length - 1 - floorNumber].setTime(minimalWaitingTime);
                if (this.buildingElevators[closestElevatorIndex].isAvailable === true) {
                    this.buildingElevators[closestElevatorIndex].goToFloor(floorNumber, minimalWaitingTime);
                }
                else {
                    this.waitingFloorsList.push(floorNumber);
                    this.waitingFloors.push({ floorNumber: floorNumber, elevatorNumber: closestElevatorIndex, waitingTime: minimalWaitingTime });
                }
            }
        }
    }
    elevatorIsAvailable(elevatorNumber) {
        if (this.waitingFloorsList.length > 0) {
            for (let i = 0; i < this.waitingFloorsList.length; i++) {
                const nextFloor = this.waitingFloorsList[i];
                const indexInWaitingFloors = this.waitingFloors.findIndex(floor => floor.floorNumber === nextFloor && floor.elevatorNumber === elevatorNumber);
                if (indexInWaitingFloors !== -1) {
                    const { floorNumber, waitingTime } = this.waitingFloors[indexInWaitingFloors];
                    this.waitingFloors.splice(indexInWaitingFloors, 1);
                    this.waitingFloorsList.splice(i, 1);
                    this.buildingElevators[elevatorNumber].goToFloor(floorNumber, waitingTime);
                }
            }
        }
    }
    elevatorArrival(floorNumber) {
        this.buildingFloors[this.buildingFloors.length - 1 - floorNumber].isWaiting = false;
        this.buildingFloors[this.buildingFloors.length - 1 - floorNumber].updateRender();
    }
}
