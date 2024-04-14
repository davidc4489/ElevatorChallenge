import Elevator from '../Items/Elevator.js';

export default class ElevatorFactory {
    public createElevator(elevatorNumber: number): Elevator {
        return new Elevator(elevatorNumber);
    }
}