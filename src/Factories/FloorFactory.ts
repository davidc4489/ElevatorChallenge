import Floor from '../Items/Floor.js';
import Building from '../Items/Building.js';

export default class FloorFactory {
    public createFloor(floorNumber: number, buildingIndex: number): Floor {
        return new Floor(floorNumber, buildingIndex);
    }
}