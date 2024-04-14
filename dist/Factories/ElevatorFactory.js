import Elevator from '../Items/Elevator.js';
export default class ElevatorFactory {
    createElevator(elevatorNumber) {
        return new Elevator(elevatorNumber);
    }
}
