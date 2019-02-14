import locInfo from "../data/locationsInfo.js"

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
    initGame() {
        this.addRoot()
        this.initLocations()
        this.locations[this.W][this.C].render()
        this.currLocation = this.locations[this.W][this.C]
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
                    this.addRoot()
                    console.log(this.locations[this.W][this.C])
                    this.locations[this.W][this.C].render()
                    this.currLocation = this.locations[this.W][this.C]
                }
            }
        })
    }
}

document.addEventListener("DOMContentLoaded", (event) => {
    game.initGame()
    game.addConsoleStatments()
})