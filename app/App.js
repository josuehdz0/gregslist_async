import { CarsController } from "./Controllers/CarsController.js";
import { HousesController } from "./Controllers/HousesController.js";
import { ValuesController } from "./Controllers/ValuesController.js";

class App {
  carsController = new CarsController()
  housesController = new HousesController()
}

window["app"] = new App();
