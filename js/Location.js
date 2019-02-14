class Location {
    constructor(location) {
        this.location = location
        this.init()
    }

    init() {
        var root = document.getElementById("root")

        this.place = document.createElement("p")
        this.place.id = "place"
        this.place.innerText = this.location.info
        root.appendChild(this.place)

        this.image = document.createElement("img")
        this.image.src = "img/" + this.location.imgFile
        this.image.alt = this.location.imgFile
        this.image.style.backgroundColor = this.location.backg
        this.image.height = 200
        this.image.width = 320
        root.appendChild(this.image)

        this.gamerInfo = document.createElement("div")
        this.gamerInfo.id = "gInfo"

        this.direction = document.createElement("p")
        this.direction.id = "dirs"
        this.course = "You can go "
        for (let i = 0; i < this.location.dirs.length; i++) {
            if (this.location.dirs[i] == "W") this.course += "WEST"
            else if (this.location.dirs[i] == "N") this.course += "NORTH"
            else if (this.location.dirs[i] == "S") this.course += "SOUTH"
            else if (this.location.dirs[i] == "E") this.course += "EAST"
            if (i < this.location.dirs.length - 1) this.course += ", "
        }
        this.direction.innerText = this.course
        root.appendChild(this.direction)

        this.object = document.createElement("p")
        this.object.id = "object"
        this.object.innerText = "You see "
        root.appendChild(this.object)

        this.equipment = document.createElement("p")
        this.equipment.id = "eq"
        this.equipment.innerText = "You are carrying "
        root.appendChild(this.equipment)

        this.cmdLabel = document.createElement("label")
        this.cmdLabel.id = "cmdLabel"
        this.cmdLabel.innerText = "What now? "
        this.commandLine = document.createElement("input")
        this.commandLine.id = "cmd"
        this.commandLine.type = "text"
        this.cmdLabel.appendChild(this.commandLine)
        root.appendChild(this.cmdLabel)

        document.onload = this.commandLine.focus()
        document.addEventListener("click", () => { this.commandLine.focus() })

        // document.body.appendChild(root)
        // return document.getElementById("root")
    }
}