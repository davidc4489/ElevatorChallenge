import { floorHeightConfig, arrivalWaitingTimeInSeconds, arrivalSong } from '../config.js';
export default class Elevator {
    building;
    elevatorNumber;
    isMoving = false;
    arrivalWaiting = 0;
    movingTime = 0;
    floorDestinationNumber = null;
    isAvailable = true;
    constructor(elevatorNumber) {
        this.elevatorNumber = elevatorNumber;
    }
    setBuilding(building) {
        this.building = building;
    }
    render() {
        // The elevator contains information about its building
        return `<img id="elevator${this.elevatorNumber}" src="../assets/elv.png" class="elevator" style="left: ${this.elevatorNumber * 90}px;" buildingNumberData="${this.building.buildingNumber}">`;
    }
    async goToFloor(buildingNumber, floorNumber, movingTime) {
        // Check if the elevator is moving
        while (this.isMoving) {
            await new Promise(resolve => setTimeout(resolve, 500)); // Wait 500 ms before checking again
        }
        const moveElevator = () => {
            // Update the elevator data
            this.isMoving = true;
            this.arrivalWaiting = arrivalWaitingTimeInSeconds;
            this.movingTime = movingTime;
            this.floorDestinationNumber = floorNumber;
            this.isAvailable = false;
            const floorHeight = floorHeightConfig;
            const currentPosition = this.getCurrentPosition();
            const newPosition = Math.round(floorNumber * floorHeight);
            // Keep the elevator to move
            const elevator = document.querySelector(`#elevator${this.elevatorNumber}[buildingNumberData="${this.building.buildingNumber}"]`);
            if (elevator) {
                // Calculate the duration of the animation : the animation time for a floor multiplied by the number of floors
                const duration = Math.abs(330 * (floorNumber - Math.round(currentPosition / floorHeightConfig)));
                //  Duration in milliseconds of the interval between each rendering of the elevator so that the animation is smooth
                const interval = 10;
                const steps = Math.ceil(duration / interval);
                const distance = newPosition - currentPosition;
                const stepDistance = distance / steps; // Calculation of the distance to move the elevator on each step
                let currentStep = 0;
                const audio = arrivalSong;
                let previousPosition = currentPosition;
                const animate = () => {
                    // If the number of movements necessary for the elevator to reach the calling floor has not yet been reached
                    if (currentStep < steps) {
                        const nextPosition = currentPosition + stepDistance * currentStep;
                        elevator.style.bottom = `${nextPosition}px`;
                        currentStep++;
                        if (Math.abs(nextPosition - previousPosition) >= floorHeightConfig) {
                            // Decrements this.movingTime by 0.5 for each 110 pixels moved
                            this.movingTime -= 0.5;
                            previousPosition = nextPosition; // Update the previous position
                            // console.log("MovingTime : " + this.movingTime)
                        }
                        // Activate the animation after the defined time interval between each animation
                        setTimeout(animate, interval);
                    }
                    else {
                        elevator.style.bottom = `${newPosition}px`;
                        audio.play();
                        // Update the elevator state
                        this.building.getElevatorsController().elevatorArrival(floorNumber);
                        const intervalId = setInterval(() => {
                            if (this.arrivalWaiting > 0) {
                                this.arrivalWaiting -= 0.5;
                                // console.log("ArrivalWaiting : ", this.arrivalWaiting);
                            }
                            else {
                                // console.log("ArrivalWaiting : ", this.arrivalWaiting);
                                clearInterval(intervalId); // Stop updating when arrivalWaitingTimeInSeconds have passed
                            }
                        }, 500);
                        // Update the elevator data
                        this.isMoving = false;
                        this.movingTime = 0;
                        this.floorDestinationNumber = null;
                        this.isAvailable = true;
                        this.building.getElevatorsController().elevatorIsAvailable(this.elevatorNumber);
                    }
                };
                animate();
            }
        };
        // Function to wait until arrivalWaiting is zero before moving the elevator
        const waitUntilArrivalWaitingZero = () => {
            if (this.arrivalWaiting <= 0) {
                moveElevator();
            }
            else {
                setTimeout(waitUntilArrivalWaitingZero, 500);
            }
        };
        waitUntilArrivalWaitingZero();
    }
    getCurrentPosition() {
        // Keep the elevator to move
        const elevator = document.querySelector(`#elevator${this.elevatorNumber}[buildingNumberData="${this.building.buildingNumber}"]`);
        if (elevator) {
            const currentPositionString = window.getComputedStyle(elevator).getPropertyValue('bottom');
            const currentPositionInt = parseInt(currentPositionString, 10);
            // Rounds the elevator position to the bottom of the floor it is on
            const currentPositionByFloor = currentPositionInt - (currentPositionInt % floorHeightConfig);
            return currentPositionByFloor;
        }
        return 0;
    }
}
