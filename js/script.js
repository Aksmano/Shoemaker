import locInfo from "../data/locationsInfo.js"
import items from "../data/items.js"
import dependencies from "../data/dependencies.js"

var game = {
    root: "",
    locations: [],
    currLocation: "",
    W: 3,
    C: 6,
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
        for (let i = 0; i < 7; i++) this.locations[0].push(new Location(locInfo.W1[i]))
        for (let i = 0; i < 7; i++) this.locations[1].push(new Location(locInfo.W2[i]))
        for (let i = 0; i < 7; i++) this.locations[2].push(new Location(locInfo.W3[i]))
        for (let i = 0; i < 7; i++) this.locations[3].push(new Location(locInfo.W4[i]))
        for (let i = 0; i < 7; i++) i >= 3 ? this.locations[4].push(new Location(locInfo.W5[i - 3])) : this.locations[4].push(0)
        for (let i = 0; i < 7; i++) i >= 3 ? this.locations[5].push(new Location(locInfo.W6[i - 3])) : this.locations[5].push(0)
        console.log(this.locations);
    },
    addConsoleStatments() {
        document.getElementById("cmd").addEventListener("keypress", (event) => {
            if (event.which === 13) {
                var val = document.getElementById("cmd").value
                document.getElementById("cmd").value = ""
                console.log(val)
                if ((val == "W" || val == "WEST") && this.currLocation.directions().includes(val[0])) {
                    this.C--
                    this.removeRoot()
                    this.initGame()
                }
                else if ((val == "E" || val == "EAST") && this.currLocation.directions().includes(val[0])) {
                    this.C++
                    this.removeRoot()
                    this.initGame()
                }
                else if ((val == "N" || val == "NORTH") && this.currLocation.directions().includes(val[0])) {
                    this.W--
                    this.removeRoot()
                    this.initGame()
                }
                else if ((val == "S" || val == "SOUTH") && this.currLocation.directions().includes(val[0])) {
                    this.W++
                    this.removeRoot()
                    this.initGame()
                }
            }
        })
    },
    initGame() {
        this.addRoot()
        this.currLocation = this.locations[this.W][this.C]
        this.currLocation.render()
        this.addConsoleStatments()
    }
}

document.addEventListener("DOMContentLoaded", (event) => {
    game.initLocations()
    game.initGame()
    // document.getElementById("cmd").addEventListener("keypress", (event) => {
    //     if (event.which === 13) {
    //         var val = document.getElementById("cmd").value
    //         document.getElementById("cmd").value = ""
    //         console.log(val)
    //         if ((val == "W" || val == "WEST") && game.currLocation.directions().includes(val[0])) {
    //             game.C--
    //             game.removeRoot()
    //             game.addRoot()
    //             console.log(game.locations[game.W][game.C])
    //             game.locations[game.W][game.C].render()
    //             game.currLocation = game.locations[game.W][game.C]
    //         }
    //     }
    // })
})