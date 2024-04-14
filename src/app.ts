import BuildingFactory from './Factories/BuildingFactory.js';
import { numFloors, numElevators, numBuildings } from './config.js';

const buildingFactory = new BuildingFactory();

const building = buildingFactory.createBuilding(numFloors, numElevators);

const buildingElement = document.getElementById('building');
if (buildingElement) {
    buildingElement.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('floor-button')) {
            const floorNumberAttribute = target.getAttribute('floorNumberData');
            if (floorNumberAttribute !== null) {
            const floorNumber = parseInt(floorNumberAttribute);
                if (floorNumber !== undefined) {
                    console.log(`Clicked on floor ${floorNumber}`);
                    building.assignFloorToElevator(floorNumber);
                }
            }
        }
    });
    buildingElement.innerHTML = building.renderBuilding();
}
