export class Car {
  constructor (data) {
    this.id = data.id || ''
    this.createdAt = data.createdAt
    this.description = data.description
    this.img = data.imgUrl
    this.make = data.make
    this.model = data.model
    this.price = data.price
    this.year = data.year
  }

  get CarCard() {
    return `
    <div class="col-md-4 mb-3">
      <div class="card">
        <img src="${this.img}" class="card-img-top car-img"
          alt="car">
        <div class="card-body">
          <div class="card-title fs-5">${this.make + ' ' + this.model}</div>
          <p>${this.description ? this.description : "It's a car"}</p>
          <div class="d-flex justify-content-between">
          <button class="btn ms-1 btn-danger" type="button" onclick="app.carsController.removeCar('${this.id}')">Delete Car!</button>
          <button data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn ms-1 btn-info" type="button" onclick="app.carsController.drawForm('${this.id}')">Edit Car!</button>
          </div>
          </div>
      </div>
    </div>
    `
  }

  static FormButton() {
    return `
    <button onclick="app.carsController.drawForm()" class="btn btn-success ms-3 mb-2" data-bs-toggle="modal"
      data-bs-target="#exampleModal">
      <i class="mdi mdi-plus"></i>
    </button>
    `
  }

  static CarForm(editable) {
    if (!editable.id) {
      editable = new Car({
        make: '',
        model: '',
        year: 0,
        price: 0,
        imgUrl: '',
        description: ''
      })  
    }

    return `
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form ${editable.id ? `onsubmit="app.carsController.editCar('${editable.id}')"` : 'onsubmit="app.carsController.createCar()"'}>
        <div class="modal-body">
          <div class="mb-3">
            <label for="make" class="form-label">make</label>
            <input required type="text" value="${editable.make}" class="form-control" id="make" placeholder="make..." name="make">
          </div>
          <div class="mb-3">
            <label for="model" class="form-label">model</label>
            <input required type="text" value="${editable.model}" class="form-control" id="model" placeholder="model..." name="model">
          </div>
          <div class="mb-3">
            <label for="year" class="form-label">year</label>
            <input required type="number" value="${editable.year}" class="form-control" id="year" placeholder="year..." name="year">
          </div>
          <div class="mb-3">
            <label for="img" class="form-label">img</label>
            <input required type="text" value="${editable.img}" class="form-control" id="img" placeholder="img..." name="imgUrl">
          </div>
          <div class="mb-3">
            <label for="price" class="form-label">price</label>
            <input required type="number" value="${editable.price}" class="form-control" id="price" placeholder="price..." name="price">
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">description</label>
            <textarea name="description" class="form-control" id="description" rows="3">
            ${editable.description}
            </textarea>
          </div>
          <div class="mb-3">
            <label for="exampleColorInput" class="form-label">Color picker</label>
            <input type="color" class="form-control value="${editable.color}" form-control-color" id="exampleColorInput"
              title="Choose your color" name="color">
          </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
    `
  }

}