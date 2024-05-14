import Floor from '../Items/Floor.js';

export default class FloorFactory {
    public createFloor(floorType: string, floorNumber: number, buildingIndex: number): Floor {
        switch(floorType) {
            case 'standard':
                return new Floor(floorNumber, buildingIndex);
            default:
                throw new Error(`Invalid floor type: ${floorType}`);
        }
    }
}