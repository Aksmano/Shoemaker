class Location {
    constructor(location, startItems, items, nameToItemID, dependencies) {
        this.location = location
        this.root = document.getElementById("root")
        this.startItems = startItems
        this.itemsQuantity = 0
        this.currLocItems = []
        this.items = items
        this.nameToID = nameToItemID
        this.dependencies = dependencies
        this.locNumber = "L" + this.location.imgFile[0] + this.location.imgFile[1]
        this.OK = 0
        this.caps = 1
        this.backspace = 0
        this.sleepingDragon = ["You can't go that way... ", "The dragon sleeps in a cave!"]
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
        this.caret = document.createElement("div")
        this.caret.id = "caret"
        this.commandLine.onkeydown = (e) => {
            if (e.which == 20 && this.caps == 1) this.caps = 0
            else if (e.which == 20 && this.caps == 0) this.caps = 1
            if (e.which == 8) this.backspace = 1
            console.log(this.backspace)
        }
        this.commandLine.oninput = (e) => {
            this.caret.style.left = (((this.commandLine.value.length) * 15) + 163) + 'px'
            if (this.backspace == 0 || this.commandLine.value.length != 0)
                if (this.caps == 1) {
                    var letter = this.commandLine.value[this.commandLine.value.length - 1].toUpperCase()
                    var arr = []
                    arr = this.commandLine.value.split("")
                    arr.pop()
                    arr.push(letter)
                    this.commandLine.value = arr.join("")
                    console.log("to upper");
                }
                else if (this.caps == 0) {
                    var letter = this.commandLine.value[this.commandLine.value.length - 1].toLowerCase()
                    var arr = []
                    arr = this.commandLine.value.split("")
                    arr.pop()
                    arr.push(letter)
                    this.commandLine.value = arr.join("")
                    console.log("to lower");
                }
            this.backspace = 0
            console.log("DUBZGO " + this.caps)
        }
        this.cmdLabel.appendChild(this.commandLine)
        this.cmdLabel.appendChild(this.caret)
        this.container.appendChild(this.cmdLabel)

        this.compass = document.createElement("img")
        this.compass.id = "compass"
        this.compass.src = "img/directions/" + this.location.dirs.join("") + ".png"
        this.compass.alt = this.location.dirs.join("")

        console.log("location initialized");

    }

    gib(newItem) {
        this.equipment.innerText = "You are carrying " + newItem
        this.caret.style.left = (((this.commandLine.value.length) * 15) + 163) + 'px'
        if(newItem == "SHEEP") this.OK = 6
        console.log(this.OK)
        return this.items[this.nameToID[newItem]]
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

        // if (this.image.src == "42.gif" && this.OK < 7) {
        //     this.cmdLabel.innerText = this.sleepingDragon[0]
        //     var i = 1
        //     var x = setInterval(() => {
        //         var p = document.createElement("p")
        //         p.innerText = this.sleepingDragon[i]
        //         this.cmdLabel.appendChild(p)
        //         i++
        //         if (i == 2) {
        //             this.cmdLabel.innerText = "What now? "
        //             this.caret.style.left = (((this.commandLine.value.length) * 15) + 163) + 'px'
        //             this.cmdLabel.appendChild(this.commandLine)
        //             this.cmdLabel.appendChild(this.caret)
        //             this.commandLine.focus()
        //             console.log("power rangers")
        //             clearInterval(x)
        //         }
        //     }, 2000)
        // }

        console.log("location rendered")

    }

    directions() {
        return this.location.dirs
    }

    returnOK() {
        return this.OK
    }

    useItem(currItem, usedItem) {
        console.log("usedItem: " + usedItem)
        if (usedItem != currItem.name || currItem == 0) {
            this.labelStatement("You aren't carrying anything like that")
            currItem = currItem
            console.log("item not used");
            return currItem
        }
        else if (this.dependencies[this.nameToID[usedItem]].coords != this.locNumber) {
            this.labelStatement("Nothing happened")
            currItem = currItem
            console.log("item not used");
            return currItem
        }
        else {
            if (this.dependencies[this.nameToID[usedItem]].flag == 0) {
                if (this.dependencies[this.nameToID[usedItem]].OK == "OK") this.OK++
                if (usedItem == "SHEEP") {
                    this.currLocItems.push([])
                    this.currLocItems[this.currLocItems.length - 1].push(this.dependencies[this.nameToID[usedItem]].newItemId, this.items[this.dependencies[this.nameToID[usedItem]].newItemId])
                    console.log(this.currLocItems);
                    this.labelDragon(currItem, usedItem)
                    currItem = 0
                    setTimeout(() => {
                        this.changeText("eq", currItem)
                        this.changeText("obj", this.currLocItems)
                    }, 4000)
                    return currItem
                }
                else {
                    this.currLocItems.push([this.dependencies[this.nameToID[usedItem]].newItemId, this.items[this.dependencies[this.nameToID[usedItem]].newItemId]])
                    currItem = 0
                    this.labelStatement(this.dependencies[this.nameToID[usedItem]].statement)
                    this.changeText("eq", currItem)
                    this.changeText("obj", this.currLocItems)
                    console.log(this.OK);
                    if (this.OK == 6) {
                        this.labelStatement(this.dependencies["IOK"].statement)
                        currItem = this.items["I37"]
                        this.changeText("eq", currItem)
                        for (let i = 0; i < this.currLocItems.length; i++)
                            if (this.currLocItems[i][1].flag == 0) {
                                this.currLocItems.splice(i, 1)
                                i = -1
                            }
                        this.changeText("obj", this.currLocItems)
                        console.log("you get a sheep")
                    }
                }
                console.log("item used for milestone")
                return currItem
            }
            else if (this.dependencies[this.nameToID[usedItem]].statement.includes("(timeout)")) {
                currItem = this.items[this.dependencies[this.nameToID[usedItem]].newItemId]
                this.labelTimeout(currItem, usedItem)
                return currItem
            }
            else {
                this.labelStatement(this.dependencies[this.nameToID[usedItem]].statement)
                currItem = this.items[this.dependencies[this.nameToID[usedItem]].newItemId]
                this.changeText("eq", currItem)
                console.log("item used")
                return currItem
            }
        }
    }

    dropItem(currItem, dropped) {
        console.log(currItem)
        if (currItem == 0) this.labelStatement("You are not carrying anything")
        else if (this.itemsQuantity >= 3) this.labelStatement("You can't store any more here")
        else if (dropped != currItem.name) this.labelStatement("You are not carrying it")
        else {
            this.labelStatement("You are about to drop " + currItem.form)
            this.currLocItems.push([this.nameToID[dropped], currItem])
            this.itemsQuantity++
            currItem = 0
            console.log(this.currLocItems)
            this.changeText("eq", currItem)
            this.changeText("obj", this.currLocItems)
            console.log("item dropped")
            this.caret.style.left = (((this.commandLine.value.length) * 15) + 163) + 'px'
            return currItem
        }
        console.log("item not dropped")
        this.caret.style.left = (((this.commandLine.value.length) * 15) + 163) + 'px'
        return currItem
    }

    takeItem(currItem, newItem) {
        console.log(newItem)
        console.log(this.currLocItems)
        var i = 0
        for (i; i < this.currLocItems.length + 1; i++)
            if (i == this.currLocItems.length) {
                this.labelStatement("There isn't anything like that here")
                console.log("item not taken")
                return currItem
            }
            else if (newItem == this.currLocItems[i][1].name)
                break
        if (currItem != 0) this.labelStatement("You are carrying something")
        else if (!this.items[this.nameToID[newItem]].flag) this.labelStatement("You can't carry it")
        else {
            this.currLocItems.splice(i, 1)
            currItem = this.items[this.nameToID[newItem]]
            this.itemsQuantity--
            this.labelStatement("You are taking " + currItem.form)
            this.changeText("eq", currItem)
            this.changeText("obj", this.currLocItems)
            console.log("item taken")
            this.caret.style.left = (((this.commandLine.value.length) * 15) + 163) + 'px'
            return currItem
        }
        console.log("item not taken")
        this.caret.style.left = (((this.commandLine.value.length) * 15) + 163) + 'px'
        return currItem
    }

    containerStatement(statement) {
        this.container.innerText = statement
        console.log("container statement on")
        document.onkeydown = (e) => {
            this.container.innerText = ""
            this.container.appendChild(this.direction)
            this.container.appendChild(this.object)
            this.container.appendChild(this.equipment)
            this.container.appendChild(this.cmdLabel)
            this.commandLine.focus()
            console.log("container statement off")
        }
    }

    labelStatement(statement, pause) {
        if (pause === undefined)
            pause = 1500
        this.cmdLabel.innerText = statement
        console.log("label statement on")
        setTimeout(() => {
            this.cmdLabel.innerText = "What now? "
            this.caret.style.left = (((this.commandLine.value.length) * 15) + 163) + 'px'
            this.cmdLabel.appendChild(this.commandLine)
            this.cmdLabel.appendChild(this.caret)
            this.commandLine.focus()
            console.log("label statement off")
        }, pause)
        return
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
            console.log(object)
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

    labelTimeout(currItem, usedItem) {
        var sStatement = this.dependencies[this.nameToID[usedItem]].statement.split("(timeout)")
        this.cmdLabel.innerText = sStatement[0]
        var i = 1
        var x = setInterval(() => {
            var p = document.createElement("p")
            p.innerText = sStatement[i]
            this.cmdLabel.appendChild(p)
            i++
            if (i == sStatement.length + 1) {
                this.cmdLabel.innerText = "What now? "
                this.caret.style.left = (((this.commandLine.value.length) * 15) + 163) + 'px'
                this.cmdLabel.appendChild(this.commandLine)
                this.cmdLabel.appendChild(this.caret)
                this.commandLine.focus()
                this.changeText("eq", currItem)
                console.log(currItem);
                console.log("item used")
                console.log("Spade has been made/dragon has been slained")
                clearInterval(x)
            }
        }, 2000)
    }

    labelDragon(currItem, usedItem) {
        var sStatement = this.dependencies[this.nameToID[usedItem]].statement.split("(timeout)")
        console.log(sStatement);
        this.cmdLabel.innerText = sStatement[0]
        var i = 1
        var x = setInterval(() => {
            var p = document.createElement("p")
            p.innerText = sStatement[i]
            this.cmdLabel.appendChild(p)
            i++
            if (i == sStatement.length) {
                this.image.src = "img/locations/" + this.dependencies[this.nameToID[usedItem]].graphic
            }
            if (i == sStatement.length + 1) {
                clearInterval(x)
                this.cmdLabel.innerText = "What now? "
                this.caret.style.left = (((this.commandLine.value.length) * 15) + 163) + 'px'
                this.cmdLabel.appendChild(this.commandLine)
                this.cmdLabel.appendChild(this.caret)
                this.commandLine.focus()
                console.log(currItem);
                console.log("item used")
                console.log("Dragon has been slained")
            }
        }, 2000)
    }
}