import { arrivalWaitingTimeInSeconds } from '../Configuration/staticConfiguration.js';
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
    updateFloorButton(floorNumber) {
        this.buildingFloors[this.buildingFloors.length - 1 - floorNumber].setIsWaiting(true); // The css floor button updated
        this.buildingFloors[this.buildingFloors.length - 1 - floorNumber].updateRender(); // the button is displayed in green
    }
    minimalWaitingTime(floorNumber) {
        let closestElevatorIndex = 0;
        let minimalWaitingTime = Infinity;
        let currentDeplacementTime = 0;
        // Check for each elevator in the building the time to arrive at the calling floor
        for (let i = 0; i < this.buildingElevators.length; i++) {
            const elevator = this.buildingElevators[i];
            let deplacementTime = Math.abs(elevator.getLastFloorDestination() - floorNumber) * elevator.getVelocity();
            let totalWaitingTime = elevator.getTotalTime() + deplacementTime;
            // Keep the travel time if it is minimum and keeps the elevator index
            if (totalWaitingTime < minimalWaitingTime) {
                closestElevatorIndex = i;
                currentDeplacementTime = deplacementTime;
                minimalWaitingTime = totalWaitingTime;
            }
        }
        return [closestElevatorIndex, minimalWaitingTime, currentDeplacementTime];
    }
    assignFloorToElevator(floorNumber) {
        if (this.buildingElevators.length > 0) {
            const [closestElevatorIndex, minimalWaitingTime, currentDeplacementTime] = this.minimalWaitingTime(floorNumber);
            // Checks if an elevator has been found and if it is not already on the floor calling for it
            if (minimalWaitingTime !== Infinity &&
                !(this.buildingElevators[closestElevatorIndex].getIsAvailable() && this.buildingElevators[closestElevatorIndex].getLastFloorDestination() === floorNumber)) {
                this.updateFloorButton(floorNumber);
                // Assign the waiting time to the calling floor
                this.buildingFloors[this.buildingFloors.length - 1 - floorNumber].setTime(minimalWaitingTime);
                this.buildingElevators[closestElevatorIndex].setLastFloorDestination(floorNumber);
                const previewTotalTime = this.buildingElevators[closestElevatorIndex].getTotalTime();
                this.buildingElevators[closestElevatorIndex].setTotalTime(previewTotalTime + currentDeplacementTime + arrivalWaitingTimeInSeconds);
                // If available, sends the elevator to the calling floor
                if (this.buildingElevators[closestElevatorIndex].getIsAvailable() === true) {
                    this.buildingElevators[closestElevatorIndex].goToFloor(this.building.getBuildingNumber(), floorNumber, minimalWaitingTime);
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
            // Get the floor number of the first floor in the waiting list
            const nextFloor = this.waitingFloorsList[0];
            // Find the index of the floor in the waiting floors array
            const indexInWaitingFloors = this.waitingFloors.findIndex(floor => floor.floorNumber === nextFloor && floor.elevatorNumber === elevatorNumber);
            // If the floor is found in the waiting floors array
            if (indexInWaitingFloors !== -1) {
                const { floorNumber, waitingTime } = this.waitingFloors[indexInWaitingFloors];
                // Remove the calling floor from the waiting list
                this.waitingFloors.splice(indexInWaitingFloors, 1);
                this.waitingFloorsList = this.waitingFloors.map(floor => floor.floorNumber); // Update waitingFloorsList
                this.buildingElevators[elevatorNumber].goToFloor(this.building.getBuildingNumber(), floorNumber, waitingTime);
                // Exit the function after assigning the elevator to the first waiting floor
                return;
            }
        }
    }
    // Function called when an elevator arrives at its destination: the button of the calling floor stops being green
    elevatorArrival(floorNumber) {
        this.buildingFloors[this.buildingFloors.length - 1 - floorNumber].setIsWaiting(false);
        this.buildingFloors[this.buildingFloors.length - 1 - floorNumber].updateRender();
    }
    getWaitingFloorsCount() {
        return this.waitingFloorsList.length;
    }
}
