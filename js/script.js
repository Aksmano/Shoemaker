import locInfo from "../data/locationsInfo.js"
import items from "../data/items.js"
import dependencies from "../data/dependencies.js"
import startItems from "../data/startItems.js"
import nameToItemID from "../data/nameToItemID.js"

var game = {
    root: "",
    locations: [],
    currLocation: "",
    currItem: ["", 0],
    destination: "You are going ",
    whereToGo: ["W", "WEST", "N", "NORTH", "S", "SOUTH", "E", "EAST"],
    W: 3,
    C: 3,
    addRoot() {
        this.root = document.createElement("div")
        this.root.id = "root"
        document.body.appendChild(this.root)
    },
    removeRoot() {
        var element = document.getElementById("root");
        element.parentNode.removeChild(element);
    },
    initLocations() {
        for (let i = 0; i < 6; i++) this.locations[i] = []
        for (let i = 0; i < 7; i++) this.locations[0].push(new Location(locInfo.W1[i], startItems, items, nameToItemID))
        for (let i = 0; i < 7; i++) this.locations[1].push(new Location(locInfo.W2[i], startItems, items, nameToItemID))
        for (let i = 0; i < 7; i++) this.locations[2].push(new Location(locInfo.W3[i], startItems, items, nameToItemID))
        for (let i = 0; i < 7; i++) this.locations[3].push(new Location(locInfo.W4[i], startItems, items, nameToItemID))
        for (let i = 0; i < 7; i++) i >= 3 ? this.locations[4].push(new Location(locInfo.W5[i - 3], startItems, items, nameToItemID)) : this.locations[4].push(0)
        for (let i = 0; i < 7; i++) i >= 3 ? this.locations[5].push(new Location(locInfo.W6[i - 3], startItems, items, nameToItemID)) : this.locations[5].push(0)
        console.log(this.locations);
    },
    addConsoleStatments() {
        document.getElementById("cmd").addEventListener("keypress", (event) => {
            if (event.which === 13) {
                var val = document.getElementById("cmd").value
                var valSplitted = val.split(" ")
                document.getElementById("cmd").value = ""
                console.log(val)
                console.log(valSplitted)
                if ((val == "W" || val == "WEST") && this.currLocation.directions().includes(val[0])) {
                    this.currLocation.labelStatment(this.destination + "west...")
                    setTimeout(() => {
                        this.C--
                        this.removeRoot()
                        this.initGame()
                    }, 1500)
                }
                else if ((val == "E" || val == "EAST") && this.currLocation.directions().includes(val[0])) {
                    this.currLocation.labelStatment(this.destination + "east...")
                    setTimeout(() => {
                        this.C++
                        this.removeRoot()
                        this.initGame()
                    }, 1500)
                }
                else if ((val == "N" || val == "NORTH") && this.currLocation.directions().includes(val[0])) {
                    this.currLocation.labelStatment(this.destination + "north...")
                    setTimeout(() => {
                        this.W--
                        this.removeRoot()
                        this.initGame()
                    }, 1500)
                }
                else if ((val == "S" || val == "SOUTH") && this.currLocation.directions().includes(val[0])) {
                    this.currLocation.labelStatment(this.destination + "south...")
                    setTimeout(() => {
                        this.W++
                        this.removeRoot()
                        this.initGame()
                    }, 1500)
                }
                else if (val == "V" || val == "VOCABULARY") this.currLocation.containerStatment("NORTH or N, SOUTH or S\nWEST or W, EAST or E\nTAKE (object) or T (object)\nDROP (object) or D (object)\nUSE (object) or U (object)\nGOSSIPS or G, VOCABULARY or V\nPress any key")
                else if (val == "G" || val == "GOSSIPS") this.currLocation.containerStatment("The  woodcutter lost  his home key...\nThe butcher likes fruit... The cooper\nis greedy... Dratewka plans to make a\npoisoned  bait for the dragon...  The\ntavern owner is buying food  from the\npickers... Making a rag from a bag...\nPress any key")
                else if (valSplitted[0] == "D" || valSplitted[0] == "DROP") this.currItem = this.currLocation.dropItem(this.currItem)
                else if (valSplitted[0] == "T" || valSplitted[0] == "TAKE") this.currItem = this.currLocation.takeItem(this.currItem, valSplitted[1])
                else if (val == "LET ME DIE") this.currLocation.labelStatment("Life is beatiful <3")
                else if (val == "GRZEGORZ") this.currLocation.labelStatment("Brzeczyszczykiewicz?")
                else if (val == "OPEN THE DOOR HAL") this.currLocation.labelStatment("I think it's impossible Dave...")
                else if (val == "AKSMAN PIES") this.currLocation.labelStatment("Nie ladnie tak mowic Mati...")
                else if (val == "POP") this.currLocation.labelStatment("You can't pop it")
                else if (val == "AAAAA") this.currLocation.labelStatment("WHY ARE U RUNNIN'?")
                else if ((this.whereToGo.includes(val) && !(this.currLocation.directions().includes(val[0])))) this.currLocation.labelStatment("You can't go that way...")
                else if (val || val == event.which) this.currLocation.labelStatment("Try another word or V for vocabulary")
            }
        })
    },
    initGame() {
        this.addRoot()
        this.currLocation = this.locations[this.W][this.C]
        this.currLocation.render(this.currItem)
        this.addConsoleStatments()
    }
}

document.addEventListener("DOMContentLoaded", (event) => {
    game.initLocations()
    game.initGame()
})
