import ElevatorsController from '../Items/ElevatorsController.js';
import Elevator from '../Items/Elevator.js';
import Floor from '../Items/Floor.js';

export default class ElevatorsControllerFactory {
    public createElevatorsController(floors: Floor[], elevators: Elevator[]): ElevatorsController {
        return new ElevatorsController(floors, elevators);
    }
}