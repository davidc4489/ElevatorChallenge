import Elevator from './Elevator';
import Floor from './Floor';

export default class ElevatorsController {
    private buildingFloors: Floor[];
    private buildingElevators: Elevator[];
    private waitingFloors: number[] = [];

    constructor(floors: Floor[], elevators: Elevator[]) {
        this.buildingFloors = floors;
        this.buildingElevators = elevators;
    }

    public assignFloorToElevator(floorNumber: number): void {
        if (this.buildingElevators.length > 0) {
            this.buildingFloors[this.buildingFloors.length - 1 - floorNumber].isWaiting = true;
            this.buildingFloors[this.buildingFloors.length - 1 - floorNumber].updateRender();
            let closestElevatorIndex = 0;
            let closestDistance = Infinity; 
        
            for (let i = 0; i < this.buildingElevators.length; i++) {
                const elevator = this.buildingElevators[i];
                const elevatorPosition = elevator.getCurrentPosition();
                const distance = Math.abs(110 * floorNumber - elevatorPosition);
                
                if (!elevator.isMoving && distance < closestDistance) {
                    closestElevatorIndex = i;
                    closestDistance = distance;
                }
            }
        
            if (closestDistance !== Infinity) {
                this.buildingElevators[closestElevatorIndex].goToFloor(floorNumber);
                const secondsToWait = Math.abs(floorNumber - ((this.buildingElevators[closestElevatorIndex].getCurrentPosition()) / 110)) / 2;  
                this.buildingFloors[this.buildingFloors.length - 1 - floorNumber].setTime(secondsToWait);
            }
            else {
                this.waitingFloors.push(floorNumber);
            }
        }
    }

    public elevatorIsAvailable(): void {
        if (this.waitingFloors.length > 0) {
            const nextFloor = this.waitingFloors.shift();
            if (nextFloor !== undefined){
                this.assignFloorToElevator(nextFloor);
            }
        }
    }

    public elevatorArrival(floorNumber: number): void {
        this.buildingFloors[this.buildingFloors.length - 1 - floorNumber].isWaiting = false;
        this.buildingFloors[this.buildingFloors.length - 1 - floorNumber].updateRender();
    }
}