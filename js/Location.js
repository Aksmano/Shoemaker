class Location {
    constructor(location, startItems, items) {
        this.location = location
        this.root = document.getElementById("root")
        this.startItems = startItems
        this.items = items
        // this.flag = 0
        this.item = ""
        this.init()
    }

    init() {
        this.container = document.createElement("div")
        this.container.id = "container"
        this.container.style.lineHeight = "25px"

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
        this.container.appendChild(this.direction)

        this.object = document.createElement("p")
        this.object.id = "obj"
        this.currObj = "nothing"
        this.itemId = "L" + this.location.imgFile[0] + this.location.imgFile[1]
        console.log(this.itemId)
        for (let i = 0; i < this.startItems.length; i++)
            if (this.startItems[i].includes(this.itemId)) this.currObj = this.items[this.startItems[i][1]].form
        this.object.innerText = "You see " + this.currObj
        this.container.appendChild(this.object)

        this.equipment = document.createElement("p")
        this.equipment.id = "eq"
        this.equipment.innerText = "You are carrying "
        this.container.appendChild(this.equipment)

        this.cmdLabel = document.createElement("label")
        this.cmdLabel.id = "cmdLabel"
        this.cmdLabel.innerText = "What now? "
        this.commandLine = document.createElement("input")
        this.commandLine.id = "cmd"
        this.commandLine.type = "text"
        this.commandLine.maxLength = 20
        this.commandLine.addEventListener("input", () => { this.commandLine.value = this.commandLine.value.toUpperCase() })
        this.cmdLabel.appendChild(this.commandLine)
        this.container.appendChild(this.cmdLabel)

        console.log("done");

    }

    render() {
        this.root = document.getElementById("root")
        this.root.appendChild(this.place)
        this.root.appendChild(this.image)
        this.root.appendChild(this.container)
        document.onload = this.commandLine.focus()
        document.addEventListener("click", () => { this.commandLine.focus() })
    }

    directions() {
        return this.location.dirs
    }

    vocabulary() {
        this.container.innerText = "NORTH or N, SOUTH or S\nWEST or W, EAST or E\nTAKE (object) or T (object)\nDROP (object) or D (object)\nUSE (object) or U (object)\nGOSSIPS or G, VOCABULARY or V\nPress any key"
        document.onkeydown = (e) => {
            this.container.innerText = ""
            this.container.appendChild(this.direction)
            this.container.appendChild(this.object)
            this.container.appendChild(this.equipment)
            this.container.appendChild(this.cmdLabel)
            this.commandLine.focus()
            document.onkeyup = () => { document.onkeydown = () => { } }
        }
    }

    gossips() {
        this.container.innerText = "The  woodcutter lost  his home key...\nThe butcher likes fruit... The cooper\nis greedy... Dratewka plans to make a\npoisoned  bait for the dragon...  The\ntavern owner is buying food  from the\npickers... Making a rag from a bag...\nPress any key"
        document.onkeydown = (e) => {
            this.container.innerText = ""
            this.container.appendChild(this.direction)
            this.container.appendChild(this.object)
            this.container.appendChild(this.equipment)
            this.container.appendChild(this.cmdLabel)
            this.commandLine.focus()
            document.onkeyup = () => { document.onkeydown = () => { } }
        }
    }
}