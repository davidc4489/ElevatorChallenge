import Floor from '../Items/Floor.js';

export default class FloorFactory {
    public createFloor(floorNumber: number): Floor {
        return new Floor(floorNumber);
    }
}