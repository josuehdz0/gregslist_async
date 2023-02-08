import { appState } from "../AppState.js";
import { House } from "../Models/House.js";

import { housesService } from "../Services/HousesService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML } from "../Utils/Writer.js";

function _drawHouses(){
  let template= ''
  appState.houses.forEach(h => template +=h.HouseCard)
  setHTML('listings',template)
  // setHTML('modal-content',House.HouseForm({}))
  // setHTML('form-button',House.FromButton())
}

export class HousesController{
  constructor(){
    console.log('House controller works?');
    appState.on('houses',_drawHouses)
  }

  async getHouses(){
    try {
      await housesService.getHouses()
    } catch (error) {
      Pop.error(error.message)
      console.error(error);
    }
  }

  async createHouse(){
    try {
      const form = window.event?.target
      const formData = getFormData(form)
      console.log(formData);
      await housesService.createHouse(formData)
    } catch (error) {
      console.error(error);
      Pop.error(error.message)
    }

  }

  async removeHouse(houseId){
    try {
      if(await Pop.confirm()){
        await housesService.removeHouse(houseId)
      }
    } catch (error) {
      console.error(error)
      Pop.error(error.message)
      
    }
  }
}