import { appState } from "../AppState.js"
import { House } from "../Models/House.js"
import { sandboxApi } from "./AxiosService.js"

class HousesService{
  async createHouse(formData) {
    const res = await sandboxApi.post('/houses',formData)
    console.log('[create house]', res.data);
    let actualHouse = new House(res.data)
    appState.houses.push(actualHouse)
    appState.emit('houses')
  }
  async getHouses() {
    const res = await sandboxApi.get('/houses')
    console.log('[get houses]', res.data)
    appState.houses = res.data.map(house => new House(house))
    console.log(appState.cars);
  }
  

}
export const housesService = new HousesService