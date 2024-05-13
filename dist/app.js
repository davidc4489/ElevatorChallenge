import ElevatorAppFactory from './Factories/ElevatorAppFactory.js';
import { Configuration } from './Configuration/dynamicConfiguration.js';
const config = Configuration.getInstance();
const customConfigForm = document.getElementById('configForm');
const defaultConfigButton = document.getElementById('defaultConfigButton');
if (customConfigForm && defaultConfigButton) {
    // Receiving user configuration
    customConfigForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const numBuildings = document.getElementById('numBuildings').value;
        const numFloors = document.getElementById('numFloors').value;
        const numElevators = document.getElementById('numElevators').value;
        config.setConfiguration(parseInt(numBuildings), parseInt(numFloors), parseInt(numElevators));
        renderElevatorApp();
    });
    // Initialization of the default configuration
    defaultConfigButton.addEventListener('click', () => {
        config.setDefaultConfiguration();
        renderElevatorApp();
    });
}
function renderElevatorApp() {
    const elevatorTypeElement = document.getElementById('elevatorType');
    const elevatorType = elevatorTypeElement.value;
    const elevatorAppFactory = new ElevatorAppFactory();
    const elevatorApp = elevatorAppFactory.createElevatorApp(config.numBuildings, config.numFloors, config.numElevators, elevatorType);
    const welcomePage = document.getElementById('welcomePage');
    const buildingsContainer = document.getElementById('buildings');
    if (welcomePage && buildingsContainer) {
        welcomePage.style.display = 'none'; // Hidding the welcome page
        // The loop iterates through each building in the elevatorApp, 
        //  creates an HTML element to graphically represent each building and associates events with it
        for (let i = 0; i < elevatorApp.getBuildings().length; i++) {
            const building = elevatorApp.getBuildings()[i];
            const buildingElement = document.createElement('div');
            buildingElement.classList.add('building');
            buildingElement.addEventListener('click', (event) => {
                const target = event.target;
                if (target.classList.contains('floor-button')) {
                    const floorNumberAttribute = target.getAttribute('floorNumberData');
                    // Get the floor number
                    const buildingIndexAttribute = parseInt(target.getAttribute('buildingIndexData'));
                    // Check the index of the building calling the elevator
                    if (floorNumberAttribute !== null && building.getBuildingNumber() == buildingIndexAttribute) {
                        const floorNumber = parseInt(floorNumberAttribute);
                        if (!isNaN(floorNumber)) {
                            elevatorApp.assignFloorToElevator(buildingIndexAttribute, floorNumber);
                        }
                    }
                }
            });
            buildingElement.innerHTML = building.renderBuilding(config.numFloors);
            buildingsContainer.appendChild(buildingElement);
        }
    }
}
