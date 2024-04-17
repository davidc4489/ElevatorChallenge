import Elevator from './Elevator';
import Floor from './Floor';
import { floorHeightConfig, secondsPerFloor} from '../config.js';

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
            this.buildingFloors[this.buildingFloors.length - 1 - floorNumber].updateRender(); // The floor button turns green

            let closestElevatorIndex = 0;
            let minimalWaitingTime = Infinity;
        
            for (let i = 0; i < this.buildingElevators.length; i++) {
                const elevator = this.buildingElevators[i];
                const elevatorPosition = elevator.getCurrentPosition();

                let movingTime ;
                let totalWaitingTime ;

                if (elevator.movingTime > 0) {
                    movingTime = elevator.movingTime + (Math.abs(floorNumber - elevator.floorDestinationNumber!) * secondsPerFloor);
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
                this.buildingElevators[closestElevatorIndex].goToFloor(floorNumber, minimalWaitingTime);
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