                                                Project architecture : 

The main object of the application (the elevator App) contains one or more buildings.

Each of these buildings has floors, elevators and a controller which manages the calls and movements of the elevators 
    from this building to the floors of this building.

To allow interaction between the controller and the floors and elevators of the same building, 
    each controller receives the references of these floors and elevators

                                                Explanation of the algorithm :

First step : creation of the elevatorApp from the configuration file. 
    The elevatorAppFactory calls the buildingFactory which itself calls the elevatorFactory, the floorFactory and the elevatorControllerFactory. 
    Once created, each new object is associated with its container object (the buildings as elements of the elevatorApp, 
        the floors, the elevators and the controller of each building as elements of this building)


Second step: recover and send data with the eventListener. 
    Each floor has a button which contains information on its building and on the floor itself. 
    When a button is clicked, the main application which contains the elevatorApp object retrieves this information using an eventListener 
        and calls the elevatorApp function which is responsible for sending it to the appropriate controller.

Third step : main algorithm : calculation of the minimum time and allocation of the elevator to the floor
    The elevatorApp sends the number of the calling floor to the elevatorsController of the building on that floor.
    The elevatorsController calculates which elevator to send:
        - For each elevator in this building, it calculates its position.
        - If the elevator is not currently moving to another floor, it calculates the distance between the elevator position
           and that of the floor by multiplying the number of floors to travel by the time configured for each floor.
        - If the elevator is currently moving, the calculation is done by adding the travel time remaining for the elevator 
           (which is contained and updated in the elevator object) and the travel time between the calling floor 
            and the floor to which the elevator is moving (which is also contained in the elevator object).
        - If the time obtained for an elevator is shorter than that stored so far in a variable, 
            we update this variable with this elevator and this duration so as to finish the loop with the minimum time.
        - We update the waiting time of the floor (for its timer).
        - If the elevator is currently available, we call the elevator, 
            otherwise we place the floor and the elevator in a waiting list which will be checked each time an elevator becomes available, 
            and if it is the elevator with the minimum duration for this floor, it will then be sent to this floor