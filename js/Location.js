class Location {
    constructor(location, startItems, items, nameToItemID) {
        this.location = location
        this.root = document.getElementById("root")
        this.startItems = startItems
        this.itemsQuantity = 0
        this.currLocItems = []
        this.items = items
        this.nameToID = nameToItemID
        this.locNumber = "L" + this.location.imgFile[0] + this.location.imgFile[1]
        // this.flag = 0
        // this.currItem = currItem
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
        this.image.id = "view"
        this.image.src = "img/locations/" + this.location.imgFile
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
        // console.log(this.itemId)
        for (let i = 0; i < this.startItems.length; i++)
            if (this.startItems[i].includes(this.locNumber)) {
                this.currLocItems.pop()
                this.currLocItems[0] = []
                this.currLocItems[0].push(this.startItems[i][1])
                this.currLocItems[0].push(this.items[this.startItems[i][1]])
                this.itemsQuantity++
            }
        if (this.currLocItems.length != 0) this.object.innerText = "You see " + this.currLocItems[0][1].form
        else this.object.innerText = "You see nothing"
        this.container.appendChild(this.object)

        this.equipment = document.createElement("p")
        this.equipment.id = "eq"
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

        this.compass = document.createElement("img")
        this.compass.id = "compass"
        this.compass.src = "img/directions/" + this.location.dirs.join("") + ".png"
        this.compass.alt = this.location.dirs.join("")

        console.log("location initialized");

    }

    render(currItem) {
        this.root = document.getElementById("root")
        this.root.appendChild(this.place)
        this.root.appendChild(this.image)
        if (currItem != 0) this.equipment.innerText = "You are carrying " + currItem.form
        else this.equipment.innerText = "You are carrying nothing"
        this.root.appendChild(this.container)
        this.root.appendChild(this.compass)

        document.onload = this.commandLine.focus()
        document.onblur = this.commandLine.focus()
        document.addEventListener("click", () => { this.commandLine.focus() })
        console.log(this.currLocItems);

        console.log("location rendered")

    }

    directions() {
        return this.location.dirs
    }

    dropItem(currItem, dropped) {
        console.log(currItem)
        if (currItem == 0) this.labelStatment("You are not carrying anything")
        else if (this.itemsQuantity >= 3) this.labelStatment("You can't store any more here")
        else if (dropped != currItem.name) this.labelStatment("You are not carrying it")
        else {
            this.labelStatment("You are about to drop " + currItem.form)
            this.currLocItems.push([])
            this.currLocItems[this.itemsQuantity].push(this.nameToID[dropped])
            this.currLocItems[this.itemsQuantity].push(currItem)
            this.itemsQuantity++
            currItem = 0
            console.log(this.currLocItems)
            this.changeText("eq", currItem)
            this.changeText("obj", this.currLocItems)
            console.log("item dropped")
            return currItem
        }
        console.log("item not dropped")
        return currItem
    }

    takeItem(currItem, newItem) {
        console.log(newItem)
        console.log(this.currLocItems)
        var i = 0
        for (i; i < this.itemsQuantity + 1; i++)
            if (i == this.itemsQuantity) {
                this.labelStatment("There isn't anything like that here")
                console.log("item not taken")
                return currItem
            }
            else if (newItem == this.currLocItems[i][1].name)
                break
        if (currItem != 0) this.labelStatment("You are carrying something")
        else if (!this.items[this.nameToID[newItem]].flag) this.labelStatment("You can't carry it")
        else {
            this.currLocItems.splice(i, i + 1)
            currItem = this.items[this.nameToID[newItem]]
            this.itemsQuantity--
            this.labelStatment("You are taking " + currItem.form)
            this.changeText("eq", currItem)
            this.changeText("obj", this.currLocItems)
            console.log("item taken")
            return currItem
        }
        console.log("item not taken")
        return currItem
    }

    containerStatment(statment) {
        this.container.innerText = statment
        console.log("container statment on")
        document.onkeydown = (e) => {
            this.container.innerText = ""
            this.container.appendChild(this.direction)
            this.container.appendChild(this.object)
            this.container.appendChild(this.equipment)
            this.container.appendChild(this.cmdLabel)
            this.commandLine.focus()
            console.log("container statment off")
        }
    }

    labelStatment(statment) {
        this.cmdLabel.innerText = statment
        console.log("label statment on")
        setTimeout(() => {
            this.cmdLabel.innerText = "What now? "
            this.cmdLabel.appendChild(this.commandLine)
            this.commandLine.focus()
            console.log("label statment off")
        }, 1500)
    }

    changeText(id, object) {
        var string = ""
        if (id == "obj") {
            for (let i = 0; i < object.length; i++) {
                string += object[i][1].form
                if (i < object.length - 1)
                    string += ", "
            }
            console.log(string)
            console.log("SS" + object)
            if (string != "") document.getElementById(id).innerText = "You see " + string
            else document.getElementById(id).innerText = "You see nothing"
        }
        else if (id == "eq") {
            if (object != 0)
                string = object.form
            if (string != "") document.getElementById(id).innerText = "You are carrying " + string
            else document.getElementById(id).innerText = "You are carrying nothing"
        }
    }
}