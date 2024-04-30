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

