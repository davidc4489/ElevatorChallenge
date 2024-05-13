import Building from "./Building";
import { floorHeightConfig, arrivalWaitingTimeInSeconds, arrivalSong, secondsPerFloorFastElevator, secondsPerFloorSlowElevator} from '../Configuration/staticConfiguration.js';

export class Elevator {
    private building!: Building;
    private elevatorNumber: number;
    protected velocity: number = secondsPerFloorSlowElevator;
    private arrivalWaiting: number = 0;
    private movingTime: number = 0;
    private totalTime: number = 0;
    private floorDestinationNumber: number | null = null;
    private lastFloorDestination: number = 0;
    private isAvailable: boolean = true;

    constructor(elevatorNumber: number) {
        this.elevatorNumber = elevatorNumber;
    }

    public setBuilding(building: Building): void {
        this.building = building;
    }

    public getVelocity(): number {
        return this.velocity;
    }

    public getTotalTime(): number {
        return this.totalTime;
    }

    public setTotalTime(newTotalTime: number): void {
        this.totalTime = newTotalTime;
    }

    public getLastFloorDestination(): number {
        return this.lastFloorDestination;
    }

    public getIsAvailable(): boolean {
        return this.isAvailable;
    }

    public setLastFloorDestination(newLastFloorDestination: number): void {
        this.lastFloorDestination = newLastFloorDestination;
    }

    public render(): string {
        // The elevator contains information about its building
        return `<img id="elevator${this.elevatorNumber}" src="../assets/elv.png" class="elevator" style="left: ${this.elevatorNumber * 90}px;" buildingNumberData="${this.building.getBuildingNumber()}">`;
    }

    public async goToFloor(buildingNumber: number, floorNumber: number, movingTime: number): Promise<void> {
    
        const moveElevator = () => {
            // Update the elevator data
            this.arrivalWaiting = arrivalWaitingTimeInSeconds;
            this.movingTime = movingTime; 
            this.floorDestinationNumber = floorNumber;
            this.isAvailable = false;
    
            const floorHeight = floorHeightConfig; 
            const currentPosition = this.getCurrentPosition();
            const newPosition = Math.round(floorNumber * floorHeight);

            // Keep the elevator to move
            const elevator = document.querySelector(`#elevator${this.elevatorNumber}[buildingNumberData="${this.building.getBuildingNumber()}"]`) as HTMLElement | null;

            if (elevator) {
                const velocity = Math.round((this.velocity * 1000) / 1.5)
                // Calculate the duration of the animation : the animation time for a floor multiplied by the number of floors
                const duration = Math.abs(velocity * (floorNumber - Math.round(currentPosition / floorHeightConfig)));

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
                            this.totalTime -= 0.5;
                            previousPosition = nextPosition; // Update the previous position
                        }

                        // Activate the animation after the defined time interval between each animation
                        setTimeout(animate, interval);
                    } else {
                        elevator.style.bottom = `${newPosition}px`;
                        audio.play();
                        // Update the elevator state
                        this.building.getElevatorsController().elevatorArrival(floorNumber);

                        const arrivalTime = Date.now();
                        let lastUpdateTime = arrivalTime;

                        const updateWaitingTime = () => {
                            const currentTime = Date.now();
                            const elapsedTime = currentTime - lastUpdateTime;
                            lastUpdateTime = currentTime;

                            if (this.arrivalWaiting > 0) {
                                // Update wait time based on time since last update
                                this.arrivalWaiting -= elapsedTime / 1000; // Convert milliseconds to seconds
                                this.totalTime -= elapsedTime / 1000; // Update the total time

                                this.arrivalWaiting = Math.round(this.arrivalWaiting * 2) / 2;
                                this.totalTime = Math.round(this.totalTime * 2) / 2;

                                if (this.arrivalWaiting < 0) {
                                    this.arrivalWaiting = 0; // Ensures that wait time does not become negative
                                }
                            }

                            if (this.arrivalWaiting > 0) {
                                // Continue to update the wait time until it runs out
                                setTimeout(updateWaitingTime, 500);
                            }
                        };

                        updateWaitingTime();

                        // Update the elevator data
                        this.totalTime -= 0.5;
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
            } else {
                setTimeout(waitUntilArrivalWaitingZero, 500);
            }
        };
    
        waitUntilArrivalWaitingZero();
    }

    public getCurrentPosition(): number {
        // Keep the elevator to move
        const elevator = document.querySelector(`#elevator${this.elevatorNumber}[buildingNumberData="${this.building.getBuildingNumber()}"]`) as HTMLElement | null;
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

export class FastElevator extends Elevator {
    constructor(elevatorNumber : number) {
        super(elevatorNumber);
        this.velocity = secondsPerFloorFastElevator; 

    }
}

export class SlowElevator extends Elevator {
    constructor(elevatorNumber : number) {
        super(elevatorNumber);
        this.velocity = secondsPerFloorSlowElevator;
    }
}