// Using the decorator pattern to add a priority property to an floor
export function floorWithPriority(floor, priority) {
    floor.priority = priority;
    floor.printPriority = () => {
        console.log(`The floor priority is ${floor.priority}`);
    };
    return floor;
}
