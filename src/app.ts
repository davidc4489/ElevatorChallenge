import ElevatorAppFactory from './Factories/ElevatorAppFactory.js';
import { numFloors, numElevators, numBuildings } from './config.js';

const elevatorAppFactory = new ElevatorAppFactory();
const elevatorApp = elevatorAppFactory.createElevatorApp(numBuildings, numFloors, numElevators);

const buildingsContainer = document.getElementById('buildings');

if (buildingsContainer) {
    for (let i = 0; i < elevatorApp.buildings.length; i++) {
        const building = elevatorApp.buildings[i];
        const buildingElement = document.createElement('div');
        buildingElement.classList.add('building');
        
        buildingElement.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            if (target.classList.contains('floor-button')) {
                const floorNumberAttribute = target.getAttribute('floorNumberData');
                if (floorNumberAttribute !== null) {
                    const floorNumber = parseInt(floorNumberAttribute);
                    if (!isNaN(floorNumber)) {
                        console.log(`Clicked on floor ${floorNumber} in building ${i + 1}`);
                        elevatorApp.assignFloorToElevator(i, floorNumber);
                        console.log("index: ", i)
                    }
                }
            }
        });
        buildingElement.innerHTML = building.renderBuilding(numFloors);
        buildingsContainer.appendChild(buildingElement);
    }
}