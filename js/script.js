import locationInfo from "../data/locationInfo.js"

document.addEventListener("DOMContentLoaded", (event) => {
    var root = document.createElement("div")
    root.id = "root"
    document.body.appendChild(root)
    var location = new Location(locationInfo.W1[3])
    document.body.style.width = window.outerWidth + "px"
    document.body.style.height = window.outerHeight + "px"
})