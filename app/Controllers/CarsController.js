import { appState } from "../AppState.js";
import { Car } from "../Models/Car.js";
import { carsService } from "../Services/CarsService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML } from "../Utils/Writer.js";


// NOTE CRUD METHODS
// ✅ CREATE || POST
// ✅ READ || GET
// ⬛ UPDATE || PUT
// ✅ DESTROY || DELETE


function _drawCars() {
  let template = ''
  appState.cars.forEach(c => template += c.CarCard)
  setHTML('listings', template)
  setHTML('modal-content', Car.CarForm({}))
  setHTML('form-button', Car.FormButton())
}

export class CarsController {
  constructor () {
    // this.getCars()
    appState.on('cars', _drawCars)
  }

  // ✅ READ || GET
  async getCars() {
    try {
      await carsService.getCars()
    } catch (error) {
      // NOTE don't just pop a toast, log the error as well!!
      Pop.error(error.message)
      console.error(error)
    }
  }

  // ✅ CREATE || POST
  async createCar() {
    try {
      window.event.preventDefault()
      const form = window.event.target
      const formData = getFormData(form)
      // NOTE make sure your form data is formatted correctly to work with your API!!!
      console.log(formData);
      await carsService.createCar(formData)
    } catch (error) {
      console.error(error)
      Pop.error(error.message)
    }
  }

  // ✅ DESTROY || DELETE
  async removeCar(carId) {
    try {
      if (await Pop.confirm()) {
        await carsService.removeCar(carId)
      }
    } catch (error) {
      console.error(error)
      Pop.error(error.message)
    }
  }

  drawForm(carId) {
    try {
      if (carId) {
        let car = appState.cars.find(car => car.id == carId)
        setHTML('modal-content', Car.CarForm(car))
      }
      else {
        setHTML('modal-content', Car.CarForm({}))
      }
    } catch (error) {
      console.error(error)
      Pop.error(error.message)
    }
  }

  async editCar(carId) {
    try {
      window.event.preventDefault()
      const form = window.event.target
      const formData = getFormData(form)
      console.log(formData);
      await carsService.editCar(formData, carId)
    } catch (error) {
      console.error(error)
      Pop.error(error.message)
    }
  }
}