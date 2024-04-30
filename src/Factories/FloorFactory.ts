import Floor from '../Items/Floor.js';

export default class FloorFactory {
    public createFloor(floorNumber: number, buildingIndex: number): Floor {
        return new Floor(floorNumber, buildingIndex);
    }
}