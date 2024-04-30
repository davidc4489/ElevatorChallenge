import Building from "./Building";
import { floorHeightConfig} from '../config.js';

export default class Elevator {
    private building!: Building;
    private elevatorNumber: number;
    public isMoving: boolean = false;
    public arrivalWaiting: number = 0;
    public movingTime: number = 0;
    public floorDestinationNumber: number | null = null;
    public isAvailable: boolean = true;

    constructor(elevatorNumber: number) {
        this.elevatorNumber = elevatorNumber;
    }

    public setBuilding(building: Building): void {
        this.building = building;
    }

    public render(): string {
        return `<img id="elevator${this.elevatorNumber}" src="../assets/elv.png" class="elevator" style="left: ${this.elevatorNumber * 90}px;" buildingNumberData="${this.building.buildingNumber}">`;
    }

    public async goToFloor(buildingNumber: number, floorNumber: number, movingTime: number): Promise<void> {

        // Check if the elevator is moving
        while (this.isMoving) {
            await new Promise(resolve => setTimeout(resolve, 500)); // Wait 500 ms before checking again
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
            // const elevator = document.getElementById(`elevator${this.elevatorNumber}`);
            const elevator = document.querySelector(`#elevator${this.elevatorNumber}[buildingNumberData="${this.building.buildingNumber}"]`) as HTMLElement | null;

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
                            // console.log("MovingTime : " + this.movingTime)
                        }

                        setTimeout(animate, interval);
                    } else {
                        elevator.style.bottom = `${newPosition}px`;
                        audio.play();
                        this.building.getElevatorsController().elevatorArrival(floorNumber);
                        const intervalId = setInterval(() => { // Démarrer le décompte seulement après l'arrivée
                            if (this.arrivalWaiting > 0) {
                                this.arrivalWaiting -= 0.5;
                                // console.log("ArrivalWaiting : ", this.arrivalWaiting);
                            } else {
                                // console.log("ArrivalWaiting : ", this.arrivalWaiting);
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
    
        // Function to Wait until arrivalWaiting is zero before moving the elevator
        const waitUntilArrivalWaitingZero = () => {
            if (this.arrivalWaiting === 0) {
                moveElevator();
            } else {
                setTimeout(waitUntilArrivalWaitingZero, 500);
            }
        };
    
        waitUntilArrivalWaitingZero();
    }

    public getCurrentPosition(): number {
        // const elevator = document.getElementById(`elevator${this.elevatorNumber}`);
        const elevator = document.querySelector(`#elevator${this.elevatorNumber}[buildingNumberData="${this.building.buildingNumber}"]`) as HTMLElement | null;
        if (elevator) {
            const currentPositionString = window.getComputedStyle(elevator).getPropertyValue('bottom');
            const currentPositionInt = parseInt(currentPositionString, 10);
            // Rounds the elevator position to the bottom of the floor it is on
            const currentPositionByFloor = currentPositionInt - (currentPositionInt % floorHeightConfig)
            return currentPositionByFloor;
        }
        return 0;
    }
}