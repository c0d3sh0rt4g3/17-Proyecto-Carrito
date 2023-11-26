const titleTextBox = document.querySelector("#titulo")
const teacherTextBox = document.querySelector("#profesor")
const priceTextBox = document.querySelector("#precio")
const imgTextBox = document.querySelector("#imagen")
const addClientButton = document.querySelector("#submit-btn")
const courseObj ={
    titulo: "",
    profesor: "",
    precio: "",
    imagen: ""
}
const validate = (e) =>{
    if (e.target.id === "precio"){
        if (e.target.value.trim() === ""){
            console.log(courseObj)
            showError(`El campo ${e.target.id} es obligatorio`, e.target.parentElement)
            courseObj[e.target.id] = ""
        }else{
            console.log(courseObj)
            cleanseAlert(e.target.parentElement)
            courseObj[e.target.id] = parseInt(e.target.value)
        }
    }else if (e.target.value === ""){
        console.log(courseObj)
        showError(`El campo ${e.target.id} es obligatorio`, e.target.parentElement)
        courseObj[e.target.id] = ""
    }else {
        console.log(courseObj)
        cleanseAlert(e.target.parentElement)
        courseObj[e.target.id] = e.target.value
    }
    enableButton(addClientButton)
}

titleTextBox.addEventListener("blur", validate)
teacherTextBox.addEventListener("blur", validate)
priceTextBox.addEventListener("blur", validate)
imgTextBox.addEventListener("blur", validate)
addClientButton.addEventListener("click", (e) =>{
    e.preventDefault()
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith('courseListData='))
    let courseList = []
    if (cookieValue) {
      const jsonString = cookieValue.split('=')[1]
      courseList = JSON.parse(jsonString)
    }
    courseList.push(courseObj)
    const updatedCourseListString = JSON.stringify(courseList)
    document.cookie = `courseListData=${updatedCourseListString}; expires=Thu, 01 Jan 2030 00:00:00 UTC; path=/`
})
const showError = (errorMsg, reference) =>{
    cleanseAlert(reference)
    const error = document.createElement("P")
    error.textContent = errorMsg
    error.classList.add("error-message")
    reference.appendChild(error)
}

const cleanseAlert = (reference) =>{
    const alert = reference.querySelector(".error-message")
    if(alert){
        alert.remove()
    }
}
const enableButton = (addClientButton, qualified, value) =>{
    if (courseObj.title !== "" && courseObj.teacher !== "" && courseObj.price !== "" && courseObj.imgUrl !== ""){
        addClientButton.removeAttribute("disabled")
        console.log(courseObj)
    }else {
        addClientButton.setAttribute("disabled", value)
    }
}