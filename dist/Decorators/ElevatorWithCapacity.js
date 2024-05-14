// Using the decorator pattern to add a capacity property to an elevator
export function elevatorWithCapacity(elevator, capacity) {
    elevator.capacity = capacity;
    elevator.printCapacity = () => {
        console.log(`${elevator.capacity} people can use this elevator at the same time`);
    };
    return elevator;
}
