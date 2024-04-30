import { floorHeightConfig, secondsPerFloor } from '../config.js';
export default class ElevatorsController {
    building;
    buildingFloors;
    buildingElevators;
    waitingFloorsList = [];
    waitingFloors = [];
    constructor(floors, elevators) {
        this.buildingFloors = floors;
        this.buildingElevators = elevators;
    }
    setBuilding(building) {
        this.building = building;
    }
    assignFloorToElevator(floorNumber) {
        if (this.buildingElevators.length > 0) {
            this.buildingFloors[this.buildingFloors.length - 1 - floorNumber].isWaiting = true; // The css floor button updated
            this.buildingFloors[this.buildingFloors.length - 1 - floorNumber].updateRender(); // the button is displayed in green
            let closestElevatorIndex = 0;
            let minimalWaitingTime = Infinity;
            // Check for each elevator in the building the time to arrive at the calling floor
            for (let i = 0; i < this.buildingElevators.length; i++) {
                const elevator = this.buildingElevators[i];
                const elevatorPosition = elevator.getCurrentPosition();
                let movingTime;
                let totalWaitingTime;
                // Calculation in the case where the elevator is already moving towards another floor
                if (elevator.movingTime > 0) {
                    movingTime = elevator.movingTime + (Math.abs(floorNumber - elevator.floorDestinationNumber) * secondsPerFloor);
                    totalWaitingTime = movingTime + elevator.arrivalWaiting;
                }
                // Calculation in the case where the elevator is not moving towards another floor
                else {
                    movingTime = Math.abs(floorNumber - (elevatorPosition / floorHeightConfig)) * secondsPerFloor;
                    totalWaitingTime = movingTime + elevator.arrivalWaiting;
                }
                // Keep the travel time if it is minimum and keeps the elevator index
                if (totalWaitingTime < minimalWaitingTime) {
                    closestElevatorIndex = i;
                    minimalWaitingTime = totalWaitingTime;
                }
            }
            if (minimalWaitingTime !== Infinity) {
                // Assign the waiting time to the calling floor
                this.buildingFloors[this.buildingFloors.length - 1 - floorNumber].setTime(minimalWaitingTime);
                // If available, sends the elevator to the calling floor
                if (this.buildingElevators[closestElevatorIndex].isAvailable === true) {
                    this.buildingElevators[closestElevatorIndex].goToFloor(this.building.buildingNumber, floorNumber, minimalWaitingTime);
                }
                // If not available, recording of the calling floor, elevator and waiting time in the queue
                else {
                    this.waitingFloorsList.push(floorNumber);
                    this.waitingFloors.push({ floorNumber: floorNumber, elevatorNumber: closestElevatorIndex, waitingTime: minimalWaitingTime });
                }
            }
        }
    }
    // Function called when an elevator frees up to take charge of a floor waiting for this elevator
    elevatorIsAvailable(elevatorNumber) {
        // Check if there are floors in the waiting list
        if (this.waitingFloorsList.length > 0) {
            for (let i = 0; i < this.waitingFloorsList.length; i++) {
                const nextFloor = this.waitingFloorsList[i];
                // Check if the elevator with the minimum waiting time for this floor is the one that is now free and keep his index
                const indexInWaitingFloors = this.waitingFloors.findIndex(floor => floor.floorNumber === nextFloor && floor.elevatorNumber === elevatorNumber);
                // In the case where the elevator with the minimum waiting time for this floor is the one that is now free
                if (indexInWaitingFloors !== -1) {
                    const { floorNumber, waitingTime } = this.waitingFloors[indexInWaitingFloors];
                    // Remove the calling floor from the waiting list
                    this.waitingFloors.splice(indexInWaitingFloors, 1);
                    this.waitingFloorsList.splice(i, 1);
                    this.buildingElevators[elevatorNumber].goToFloor(this.building.buildingNumber, floorNumber, waitingTime);
                }
            }
        }
    }
    // Function called when an elevator arrives at its destination: the button of the calling floor stops being green
    elevatorArrival(floorNumber) {
        this.buildingFloors[this.buildingFloors.length - 1 - floorNumber].isWaiting = false;
        this.buildingFloors[this.buildingFloors.length - 1 - floorNumber].updateRender();
    }
}
