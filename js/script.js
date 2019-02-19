import locInfo from "../data/locationsInfo.js"
import items from "../data/items.js"
import dependencies from "../data/dependencies.js"
import startItems from "../data/startItems.js"

var game = {
    root: "",
    locations: [],
    currLocation: "",
    destination: "You are going ",
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
        for (let i = 0; i < 7; i++) this.locations[0].push(new Location(locInfo.W1[i], startItems, items))
        for (let i = 0; i < 7; i++) this.locations[1].push(new Location(locInfo.W2[i], startItems, items))
        for (let i = 0; i < 7; i++) this.locations[2].push(new Location(locInfo.W3[i], startItems, items))
        for (let i = 0; i < 7; i++) this.locations[3].push(new Location(locInfo.W4[i], startItems, items))
        for (let i = 0; i < 7; i++) i >= 3 ? this.locations[4].push(new Location(locInfo.W5[i - 3], startItems, items)) : this.locations[4].push(0)
        for (let i = 0; i < 7; i++) i >= 3 ? this.locations[5].push(new Location(locInfo.W6[i - 3], startItems, items)) : this.locations[5].push(0)
        console.log(this.locations);
    },
    addConsoleStatments() {
        document.getElementById("cmd").addEventListener("keydown", (event) => {
            if (event.which === 13) {
                var val = document.getElementById("cmd").value
                document.getElementById("cmd").value = ""
                console.log(val)
                if ((val == "W" || val == "WEST") && this.currLocation.directions().includes(val[0])) {
                    this.C--
                    this.removeRoot()
                    this.initGame()
                    this.currLocation.labelStatment(this.destination + "west...")
                }
                else if ((val == "E" || val == "EAST") && this.currLocation.directions().includes(val[0])) {
                    this.C++
                    this.removeRoot()
                    this.initGame()
                    this.currLocation.labelStatment(this.destination + "east...")
                }
                else if ((val == "N" || val == "NORTH") && this.currLocation.directions().includes(val[0])) {
                    this.W--
                    this.removeRoot()
                    this.initGame()
                    this.currLocation.labelStatment(this.destination + "north...")
                }
                else if ((val == "S" || val == "SOUTH") && this.currLocation.directions().includes(val[0])) {
                    this.W++
                    this.removeRoot()
                    this.initGame()
                    this.currLocation.labelStatment(this.destination + "south...")
                }
                else if (!((val == "E" || val == "EAST") && this.currLocation.directions().includes(val[0]))
                    || !((val == "W" || val == "WEST") && this.currLocation.directions().includes(val[0]))
                    || !((val == "N" || val == "NORTH") && this.currLocation.directions().includes(val[0]))
                    || !((val == "S" || val == "SOUTH") && this.currLocation.directions().includes(val[0])))
                    this.currLocation.labelStatment("You can't go that way...")
                
                else if (val == "V" || val == "VOCABULARY") this.currLocation.containerStatment("NORTH or N, SOUTH or S\nWEST or W, EAST or E\nTAKE (object) or T (object)\nDROP (object) or D (object)\nUSE (object) or U (object)\nGOSSIPS or G, VOCABULARY or V\nPress any key")
                else if (val == "G" || val == "GOSSIPS") this.currLocation.containerStatment("The  woodcutter lost  his home key...\nThe butcher likes fruit... The cooper\nis greedy... Dratewka plans to make a\npoisoned  bait for the dragon...  The\ntavern owner is buying food  from the\npickers... Making a rag from a bag...\nPress any key")
                else if (val == "LET ME DIE") this.currLocation.labelStatment("Life is beatiful <3")
                else if (val == "GRZEGORZ") this.currLocation.labelStatment("Brzeczyszczykiewicz?")
                else if (val == "OPEN THE DOOR HAL") this.currLocation.labelStatment("I think it's impossible Dave...")
                else if (val == "AKSMAN PIES") this.currLocation.labelStatment("Nie ladnie tak mowic Mati...")
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
})

                // Switch do komend

                // switch (val) {
                //     case ("W" || "WEST") && this.currLocation.directions().includes(val[0]):
                //         this.C--
                //         this.removeRoot()
                //         this.initGame()
                //         this.currLocation.labelStatment(this.destination + "west...")
                //         break;
                //     case (val == "E" || val == "EAST") && this.currLocation.directions().includes(val[0]):
                //         this.C++
                //         this.removeRoot()
                //         this.initGame()
                //         this.currLocation.labelStatment(this.destination + "east...")
                //         break;
                //     case (val == "N" || val == "NORTH") && this.currLocation.directions().includes(val[0]):
                //         this.W--
                //         this.removeRoot()
                //         this.initGame()
                //         this.currLocation.labelStatment(this.destination + "north...")
                //         break;
                //     case (val == "S" || val == "SOUTH") && this.currLocation.directions().includes(val[0]):
                //         this.W++
                //         this.removeRoot()
                //         this.initGame()
                //         this.currLocation.labelStatment(this.destination + "south...")
                //         break;
                //     case val == "V" || val == "VOCABULARY":
                //         this.currLocation.containerStatment("NORTH or N, SOUTH or S\nWEST or W, EAST or E\nTAKE (object) or T (object)\nDROP (object) or D (object)\nUSE (object) or U (object)\nGOSSIPS or G, VOCABULARY or V\nPress any key")
                //         break;
                //     case val == "G" || val == "GOSSIPS":
                //         this.currLocation.containerStatment("The  woodcutter lost  his home key...\nThe butcher likes fruit... The cooper\nis greedy... Dratewka plans to make a\npoisoned  bait for the dragon...  The\ntavern owner is buying food  from the\npickers... Making a rag from a bag...\nPress any key")
                //         break;
                // }

                // else if (!(/*val == "W" || val == "WEST" || val == "E" || val == "EAST" || val == "N" || val == "NORTH" ||*/ val == "S" || val == "SOUTH") && this.currLocation.directions().includes(val[0])) this.currLocation.labelStatment("You can't go that way...")
