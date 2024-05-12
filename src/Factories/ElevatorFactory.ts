import {Elevator, FastElevator, SlowElevator}  from '../Items/Elevator.js';

export default class ElevatorFactory {
    public createElevator(elevatorType: string, elevatorNumber: number): Elevator {
        switch(elevatorType) {
            case 'slow':
                return new SlowElevator(elevatorNumber);
            case 'fast':
                return new FastElevator(elevatorNumber);
            default:
                throw new Error(`Invalid elevator type: ${elevatorType}`);
        }
    }
}