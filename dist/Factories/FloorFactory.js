import Floor from '../Items/Floor.js';
export default class FloorFactory {
    createFloor(floorType, floorNumber, buildingIndex) {
        switch (floorType) {
            case 'standard':
                return new Floor(floorNumber, buildingIndex);
            default:
                throw new Error(`Invalid floor type: ${floorType}`);
        }
    }
}
