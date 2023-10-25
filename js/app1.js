const addToCartButton = document.querySelectorAll(".button-primary")
const emptyCartButton = document.querySelector("#vaciar-carrito")
let tbody = document.querySelector("#lista-carrito tbody")

addToCartButton.forEach(addButton =>{
    addButton.addEventListener("click", () =>{
        const clickedElementId = addButton.getAttribute("data-id")
        const infoCard = document.querySelectorAll(".card")
        const courseChosen = infoCard[clickedElementId - 1]
        const courseData = chosenCourseData(courseChosen)

        addToCart(courseData)
    })
})

emptyCartButton.addEventListener("click", () =>{
    emptyCart()
})
const chosenCourseData = (courseChosen) => {
    const courseTitle = courseChosen.querySelector("h4").textContent
    const coursePrice = courseChosen.querySelector(".u-pull-right").textContent.split("€")[0]
    const courseImg = courseChosen.querySelector("img").getAttribute("src")

    return {title: courseTitle, price: coursePrice, img: courseImg}
}
const addToCart = (courseData) => {
    let courseExists = false
    const rows = tbody.querySelectorAll("tr")

    for (let i = 0; i < rows.length; i++) {
        let row = rows[i]
        let nameCell = row.cells[1]
        if (nameCell.textContent === courseData.title) {
            let priceCell = row.cells[2]
            let quantityCell = row.cells[3]

            let price = parseFloat(priceCell.textContent)
            let currentQuantity = parseInt(quantityCell.textContent)

            quantityCell.textContent = (currentQuantity + 1).toString()
            priceCell.textContent = (price + parseFloat(courseData.price))

            courseExists = true
            break
        }
    }
    if (!courseExists) {
        const newRow = tbody.insertRow()

        const imageCell = newRow.insertCell(0)
        const image = courseData.img
        imageCell.innerHTML = `<img alt="${image.split("/")[1]}" src="${image}" width="150px" height="100px">`

        const nameCell = newRow.insertCell(1)

        nameCell.textContent = courseData.title
        const priceCell = newRow.insertCell(2)
        priceCell.textContent = courseData.price

        const quantityCell = newRow.insertCell(3)
        quantityCell.textContent = "1"

        const deleteButtonCell = newRow.insertCell(4)
        const deleteButton = document.createElement('button')

        deleteButton.textContent = 'x'
        deleteButton.classList.add("borrar-curso")
        deleteButton.addEventListener('click', () => {
            newRow.remove()
        })
        deleteButtonCell.appendChild(deleteButton)

    }
}
const emptyCart = () => {
    // Faster than tbody.innerHTML = ""
    while (tbody.firstChild){
        tbody.firstChild.remove()
    }
}