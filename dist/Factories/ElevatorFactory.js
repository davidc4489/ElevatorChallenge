import { FastElevator, SlowElevator } from '../Items/Elevator.js';
export default class ElevatorFactory {
    createElevator(elevatorType, elevatorNumber) {
        switch (elevatorType) {
            case 'slow':
                return new SlowElevator(elevatorNumber);
            case 'fast':
                return new FastElevator(elevatorNumber);
            default:
                throw new Error(`Invalid elevator type: ${elevatorType}`);
        }
    }
}
