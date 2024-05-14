import Floor from "../Items/Floor";

// Using the decorator pattern to add a priority property to an floor
export function floorWithPriority(floor: any, priority: boolean): Floor {
    floor.priority = priority;

    floor.printPriority = () => {
        console.log(`The floor priority is ${floor.priority}`)
    }

    return floor
}