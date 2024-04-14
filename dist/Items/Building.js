export default class Building {
    floors;
    elevators;
    waitingFloors = [];
    constructor() {
        this.floors = [];
        this.elevators = [];
    }
    addFloor(floor) {
        this.floors.push(floor);
    }
    addElevator(elevator) {
        elevator.setBuilding(this);
        this.elevators.push(elevator);
    }
    renderBuilding() {
        let buildingHTML = '<div class="building-container">';
        buildingHTML += '<div class="floors-container">';
        for (const floor of this.floors) {
            buildingHTML += floor.render();
        }
        buildingHTML += '</div>';
        buildingHTML += '<div class="elevators-container">';
        for (const elevator of this.elevators) {
            buildingHTML += elevator.render();
        }
        buildingHTML += '</div>';
        buildingHTML += '</div>';
        return buildingHTML;
    }
    assignFloorToElevator(floorNumber) {
        if (this.elevators.length > 0) {
            this.floors[this.floors.length - 1 - floorNumber].isWaiting = true;
            this.floors[this.floors.length - 1 - floorNumber].updateRender();
            let closestElevatorIndex = 0;
            let closestDistance = Infinity; // Initialiser à une valeur élevée
            for (let i = 0; i < this.elevators.length; i++) {
                const elevator = this.elevators[i];
                const elevatorPosition = elevator.getCurrentPosition();
                const distance = Math.abs(110 * floorNumber - elevatorPosition);
                if (!elevator.isMoving && distance < closestDistance) {
                    closestElevatorIndex = i;
                    closestDistance = distance;
                }
            }
            // Vérifiez si un ascenseur est disponible et non en mouvement
            if (closestDistance !== Infinity) {
                this.elevators[closestElevatorIndex].goToFloor(floorNumber);
                const secondsToWait = Math.abs(floorNumber - ((this.elevators[closestElevatorIndex].getCurrentPosition()) / 110)) / 2;
                this.floors[this.floors.length - 1 - floorNumber].setTime(secondsToWait);
            }
            else {
                this.waitingFloors.push(floorNumber);
            }
        }
    }
    elevatorIsAvailable() {
        if (this.waitingFloors.length > 0) {
            const nextFloor = this.waitingFloors.shift(); // Récupérer le prochain étage en attente dans la file d'attente
            if (nextFloor !== undefined) {
                this.assignFloorToElevator(nextFloor); // Attribuer cet étage à un ascenseur disponible
            }
        }
    }
    elevatorArrival(floorNumber) {
        this.floors[this.floors.length - 1 - floorNumber].isWaiting = false;
        this.floors[this.floors.length - 1 - floorNumber].updateRender();
    }
}
