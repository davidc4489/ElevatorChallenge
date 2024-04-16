import ElevatorsController from '../Items/ElevatorsController.js';
export default class ElevatorsControllerFactory {
    createElevatorsController(floors, elevators) {
        return new ElevatorsController(floors, elevators);
    }
}
