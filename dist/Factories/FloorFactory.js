import Floor from '../Items/Floor.js';
export default class FloorFactory {
    createFloor(floorNumber, buildingIndex) {
        return new Floor(floorNumber, buildingIndex);
    }
}
