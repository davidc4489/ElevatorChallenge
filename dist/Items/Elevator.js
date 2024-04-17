import { floorHeightConfig } from '../config.js';
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
        return `<img id="elevator${this.elevatorNumber}" src="../assets/elv.png" class="elevator" style="left: ${this.elevatorNumber * 90}px;">`;
    }
    async goToFloor(floorNumber, movingTime) {
        while (this.isMoving) {
            await new Promise(resolve => setTimeout(resolve, 500)); // Attendre 500 ms avant de vérifier à nouveau
        }
        const moveElevator = () => {
            this.isMoving = true;
            this.arrivalWaiting = 2;
            this.movingTime = movingTime;
            this.floorDestinationNumber = floorNumber;
            this.isAvailable = false;
            const floorHeight = floorHeightConfig;
            const currentPosition = this.getCurrentPosition();
            const newPosition = Math.round(floorNumber * floorHeight);
            const elevator = document.getElementById(`elevator${this.elevatorNumber}`);
            if (elevator) {
                const duration = Math.abs(330 * (floorNumber - Math.round(currentPosition / floorHeightConfig)));
                const interval = 10;
                const steps = Math.ceil(duration / interval);
                const distance = newPosition - currentPosition;
                const stepDistance = distance / steps;
                let currentStep = 0;
                const audio = new Audio('../../assets/ding.mp3');
                let previousPosition = currentPosition;
                const animate = () => {
                    if (currentStep < steps) {
                        const nextPosition = currentPosition + stepDistance * currentStep;
                        elevator.style.bottom = `${nextPosition}px`;
                        currentStep++;
                        if (Math.abs(nextPosition - previousPosition) >= floorHeightConfig) {
                            // Décrémente this.movingTime de 0.5 à chaque tranche de 110 pixels parcourue
                            this.movingTime -= 0.5;
                            previousPosition = nextPosition; // Met à jour la position précédente
                            console.log("MovingTime : " + this.movingTime);
                        }
                        setTimeout(animate, interval);
                    }
                    else {
                        elevator.style.bottom = `${newPosition}px`;
                        audio.play();
                        this.building.getElevatorsController().elevatorArrival(floorNumber);
                        const intervalId = setInterval(() => {
                            if (this.arrivalWaiting > 0) {
                                this.arrivalWaiting -= 0.5;
                                console.log("ArrivalWaiting : ", this.arrivalWaiting);
                            }
                            else {
                                console.log("ArrivalWaiting : ", this.arrivalWaiting);
                                clearInterval(intervalId); // Arrêter la mise à jour lorsque les 2 secondes se sont écoulées
                            }
                        }, 500);
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
        // Attendre que arrivalWaiting soit à zéro avant de déplacer l'ascenseur
        const waitUntilArrivalWaitingZero = () => {
            if (this.arrivalWaiting === 0) {
                moveElevator();
            }
            else {
                setTimeout(waitUntilArrivalWaitingZero, 500);
            }
        };
        waitUntilArrivalWaitingZero();
    }
    getCurrentPosition() {
        const elevator = document.getElementById(`elevator${this.elevatorNumber}`);
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
