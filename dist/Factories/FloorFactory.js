import Floor from '../Items/Floor.js';
export default class FloorFactory {
    createFloor(floorNumber) {
        return new Floor(floorNumber);
    }
}
