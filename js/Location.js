class Location {
    constructor(location) {
        this.location = location
        this.root = document.getElementById("root")
        this.init()
    }

    init() {
        this.place = document.createElement("p")
        this.place.id = "place"
        this.place.innerText = this.location.info

        this.image = document.createElement("img")
        this.image.src = "img/" + this.location.imgFile
        this.image.alt = this.location.imgFile
        this.image.style.backgroundColor = this.location.backg
        this.image.height = 200
        this.image.width = 320

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

        this.object = document.createElement("p")
        this.object.id = "obj"
        this.object.innerText = "You see "

        this.equipment = document.createElement("p")
        this.equipment.id = "eq"
        this.equipment.innerText = "You are carrying "

        this.cmdLabel = document.createElement("label")
        this.cmdLabel.id = "cmdLabel"
        this.cmdLabel.innerText = "What now? "
        this.commandLine = document.createElement("input")
        this.commandLine.id = "cmd"
        this.commandLine.type = "text"
        this.commandLine.maxLength = 20
        this.commandLine.addEventListener("input", () => { this.commandLine.value = this.commandLine.value.toUpperCase() })
        this.cmdLabel.appendChild(this.commandLine)
        console.log("done");

    }

    render() {
        this.root = document.getElementById("root")
        this.root.appendChild(this.place)
        this.root.appendChild(this.image)
        this.root.appendChild(this.direction)
        this.root.appendChild(this.object)
        this.root.appendChild(this.equipment)
        this.root.appendChild(this.cmdLabel)
        document.onload = this.commandLine.focus()
        document.addEventListener("click", () => { this.commandLine.focus() })
    }

    directions(){
        return this.location.dirs
    }
}