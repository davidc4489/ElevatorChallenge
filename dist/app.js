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
            const target = event.target;
            if (target.classList.contains('floor-button')) {
                const floorNumberAttribute = target.getAttribute('floorNumberData');
                // Get the floor number
                const buildingIndexAttribute = parseInt(target.getAttribute('buildingIndexData'));
                console.log("floorNumberAttribute :", floorNumberAttribute);
                // Check the index of the building calling the elevator
                if (floorNumberAttribute !== null && building.buildingNumber == buildingIndexAttribute) {
                    console.log("buildingIndexData :", buildingIndexAttribute);
                    const floorNumber = parseInt(floorNumberAttribute);
                    if (!isNaN(floorNumber)) {
                        elevatorApp.assignFloorToElevator(buildingIndexAttribute, floorNumber);
                    }
                }
            }
        });
        buildingElement.innerHTML = building.renderBuilding(numFloors);
        buildingsContainer.appendChild(buildingElement);
    }
}
