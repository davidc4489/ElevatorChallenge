import Building from "./Building";

export default class Elevator {
    private building!: Building;
    private elevatorNumber: number;
    public isMoving: boolean = false;

    constructor(elevatorNumber: number) {
        this.elevatorNumber = elevatorNumber;
    }

    public setBuilding(building: Building): void {
        this.building = building;
    }

    public render(): string {
        return `<img id="elevator${this.elevatorNumber}" src="../assets/elv.png" class="elevator" style="left: ${this.elevatorNumber * 90}px;">`;
    }

    public goToFloor(floorNumber: number): void {
        if (this.isMoving) {
            return; 
        }

        this.isMoving = true;

        const floorHeight = 110; 
        const currentPosition = this.getCurrentPosition();
        const newPosition = Math.round(floorNumber * floorHeight);
        const elevator = document.getElementById(`elevator${this.elevatorNumber}`);
        if (elevator) {
            const duration = Math.abs(350 * (floorNumber - Math.round(currentPosition / 110)));
            const interval = 10; // Interval de mise à jour de la position de l'ascenseur (en millisecondes)
            const steps = Math.ceil(duration / interval);
            const distance = newPosition - currentPosition;
            const stepDistance = distance / steps;
            let currentStep = 0;
            const audio = new Audio('../../assets/ding.mp3');
    
            const animate = () => {
                if (currentStep < steps) {
                    const nextPosition = currentPosition + stepDistance * currentStep;
                    elevator.style.bottom = `${nextPosition}px`;
                    currentStep++;
                    setTimeout(animate, interval);
                } else {
                    elevator.style.bottom = `${newPosition}px`;
                    audio.play();
                    this.building.elevatorArrival(floorNumber);
                    setTimeout(() => {
                        this.isMoving = false;
                        this.building.elevatorIsAvailable();

                    }, 2000);
                }
            };
    
            animate();
        }
    }

    public getCurrentPosition(): number {
        const elevator = document.getElementById(`elevator${this.elevatorNumber}`);
        if (elevator) {
            const currentPositionString = window.getComputedStyle(elevator).getPropertyValue('bottom');
            return parseInt(currentPositionString, 10);
        }
        return 0;
    }
}