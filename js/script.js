import locInfo from "../data/locationsInfo.js";
import items from "../data/items.js";
import dependencies from "../data/dependencies.js";
import startItems from "../data/startItems.js";
import nameToItemID from "../data/nameToItemID.js";

var game = {
  root: "",
  locations: [],
  currLocation: "",
  currItem: 0, // Zamiana na obiekt przy posiadaniu przedmiotu
  destination: "You are going ",
  whereToGo: ["W", "WEST", "N", "NORTH", "S", "SOUTH", "E", "EAST"],
  sleepingDragon: ["You can't go that way... ", "The dragon sleeps in a cave!"],
  caps: 1,
  W: 3,
  C: 6,
  addRoot() {
    this.root = document.createElement("div");
    this.root.id = "root";
    document.body.appendChild(this.root);
  },
  removeRoot() {
    var element = document.getElementById("root");
    element.parentNode.removeChild(element);
  },
  splitValue(val) {
    var valSplitted = val.split(" ");
    var command = valSplitted[0];
    delete valSplitted[0];
    var instructions = valSplitted.join(" ");
    valSplitted = instructions.split("");
    delete valSplitted[0];
    instructions = valSplitted.join("");
    valSplitted = [];
    valSplitted.push(command);
    valSplitted.push(instructions);
    return valSplitted;
  },
  introImage(img, src) {
    img.src = "img/" + src;
    img.className = "endImg";
    return img;
  },
  intro() {
    var dratewka = document.createElement("div");
    var dratewkaImg = document.createElement("img");
    var descA = document.createElement("div");
    var descAImg = document.createElement("img");
    var descB = document.createElement("div");
    var descBImg = document.createElement("img");
    var audio = document.createElement("audio");

    audio.src = "audio/hejnal.wav";
    audio.id = "audio";
    audio.loop = true;
    audio.autoplay = true;
    audio.volume = 0.3;
    document.body.appendChild(audio);

    descB.className = "endDiv";
    descB.appendChild(this.introImage(descBImg, "desc_b.jpg"));
    document.body.appendChild(descB);

    descA.className = "endDiv";
    descA.appendChild(this.introImage(descAImg, "desc_a.jpg"));
    document.body.appendChild(descA);

    dratewka.className = "endDiv";
    dratewka.appendChild(this.introImage(dratewkaImg, "dratewka.jpg"));
    document.body.appendChild(dratewka);
  },
  initLocations() {
    for (let i = 0; i < 6; i++) this.locations[i] = [];
    for (let i = 0; i < 7; i++)
      this.locations[0].push(
        new Location(
          locInfo.W1[i],
          startItems,
          items,
          nameToItemID,
          dependencies
        )
      );
    for (let i = 0; i < 7; i++)
      this.locations[1].push(
        new Location(
          locInfo.W2[i],
          startItems,
          items,
          nameToItemID,
          dependencies
        )
      );
    for (let i = 0; i < 7; i++)
      this.locations[2].push(
        new Location(
          locInfo.W3[i],
          startItems,
          items,
          nameToItemID,
          dependencies
        )
      );
    for (let i = 0; i < 7; i++)
      this.locations[3].push(
        new Location(
          locInfo.W4[i],
          startItems,
          items,
          nameToItemID,
          dependencies
        )
      );
    for (let i = 0; i < 7; i++)
      i >= 3
        ? this.locations[4].push(
            new Location(
              locInfo.W5[i - 3],
              startItems,
              items,
              nameToItemID,
              dependencies
            )
          )
        : this.locations[4].push(0);
    for (let i = 0; i < 7; i++)
      i >= 3
        ? this.locations[5].push(
            new Location(
              locInfo.W6[i - 3],
              startItems,
              items,
              nameToItemID,
              dependencies
            )
          )
        : this.locations[5].push(0);
    console.log(this.locations);
  },
  travelTo(direction, d, p) {
    if (p == "++" && d == "C") this.C++;
    else if (p == "--" && d == "C") this.C--;
    else if (p == "++" && d == "W") this.W++;
    else if (p == "--" && d == "W") this.W--;
    if (
      (this.W + 1).toString() + (this.C + 1).toString() + ".gif" == "41.gif" &&
      this.locations[3][2].returnOK() < 7
    ) {
      this.C++;
      var cmd = document.getElementById("cmd");
      var caret = document.getElementById("caret");
      document.getElementById("cmdLabel").innerText = this.sleepingDragon[0];
      setTimeout(() => {
        var p = document.createElement("p");
        p.innerText = this.sleepingDragon[1];
        document.getElementById("cmdLabel").appendChild(p);
      }, 2000);
      setTimeout(() => {
        document.getElementById("cmdLabel").innerText = "What now? ";
        document.getElementById("cmdLabel").appendChild(cmd);
        document.getElementById("cmdLabel").appendChild(caret);
        document.getElementById("cmd").focus();
        document.getElementById("caret").style.left = "163px";
      }, 4000);
      return;
    } else {
      this.currLocation.labelStatement(this.destination + direction, 1000);
    }
    console.log(this.currItem);
    setTimeout(() => {
      this.removeRoot();
      this.initLocation();
    }, 1000);
  },
  teleportTo(where) {
    this.currLocation.labelStatement(this.destination + where, 1000);
    this.W = parseInt(where[0]) - 1;
    this.C = parseInt(where[1]) - 1;
    setTimeout(() => {
      this.removeRoot();
      this.initLocation();
    }, 1000);
  },
  addConsoleStatements() {
    document.getElementById("cmd").addEventListener("keypress", event => {
      if (event.which == 13) {
        var val = document.getElementById("cmd").value;
        var valSplitted = this.splitValue(val);
        document.getElementById("cmd").value = "";
        console.log(val);

        console.log(valSplitted);
        if (
          (valSplitted[0] == "W" || valSplitted[0] == "WEST") &&
          this.currLocation.directions().includes(val[0])
        )
          this.travelTo("west...", "C", "--");
        else if (
          (valSplitted[0] == "E" || valSplitted[0] == "EAST") &&
          this.currLocation.directions().includes(val[0])
        )
          this.travelTo("east...", "C", "++");
        else if (
          (valSplitted[0] == "N" || valSplitted[0] == "NORTH") &&
          this.currLocation.directions().includes(val[0])
        )
          this.travelTo("north...", "W", "--");
        else if (
          (valSplitted[0] == "S" || valSplitted[0] == "SOUTH") &&
          this.currLocation.directions().includes(val[0])
        )
          this.travelTo("south...", "W", "++");
        else if (valSplitted[0] == "V" || valSplitted[0] == "VOCABULARY")
          this.currLocation.containerStatement(
            "NORTH or N, SOUTH or S\nWEST or W, EAST or E\nTAKE (object) or T (object)\nDROP (object) or D (object)\nUSE (object) or U (object)\nGOSSIPS or G, VOCABULARY or V\nPress any key"
          );
        else if (valSplitted[0] == "G" || valSplitted[0] == "GOSSIPS")
          this.currLocation.containerStatement(
            "The  woodcutter lost  his home key...\nThe butcher likes fruit... The cooper\nis greedy... Dratewka plans to make a\npoisoned  bait for the dragon...  The\ntavern owner is buying food  from the\npickers... Making a rag from a bag...\nPress any key"
          );
        else if (valSplitted[0] == "D" || valSplitted[0] == "DROP")
          this.currItem = this.currLocation.dropItem(
            this.currItem,
            valSplitted[1]
          );
        else if (valSplitted[0] == "T" || valSplitted[0] == "TAKE")
          this.currItem = this.currLocation.takeItem(
            this.currItem,
            valSplitted[1]
          );
        else if (valSplitted[0] == "U" || valSplitted[0] == "USE") {
          this.currItem = this.currLocation.useItem(
            this.currItem,
            valSplitted[1]
          );
          console.log(this.currItem);
        } else if (valSplitted[0] == "GIB")
          this.currItem = this.currLocation.gib(valSplitted[1]);
        else if (valSplitted[0] == "TP") this.teleportTo(valSplitted[1]);
        else if (val == "LET ME DIE")
          this.currLocation.labelStatement("Life is beatiful <3", 1500);
        else if (val == "GRZEGORZ")
          this.currLocation.labelStatement("Brzeczyszczykiewicz?", 1500);
        else if (val == "OPEN THE DOOR HAL")
          this.currLocation.labelStatement(
            "I think it's impossible Dave...",
            2500
          );
        else if (val == "AKSMAN PIES")
          this.currLocation.labelStatement(
            "Nie ladnie tak mowic Mati...",
            2500
          );
        else if (val == "POP")
          this.currLocation.labelStatement("You can't pop it", 1500);
        else if (val == "AAAAA")
          this.currLocation.labelStatement("WHY ARE U RUNNIN'?", 1500);
        else if (
          this.whereToGo.includes(valSplitted[0]) &&
          !this.currLocation.directions().includes(val[0])
        )
          this.currLocation.labelStatement("You can't go that way...");
        else if (val || val == event.which)
          this.currLocation.labelStatement(
            "Try another word or V for vocabulary"
          );
      }
    });
    document.getElementById("cmd").addEventListener("keydown", e => {
      if (e.which == 9) {
        console.log("don't push tab lad lmao");
        e.preventDefault();
        document.getElementById("cmd").focus();
      }
    });
  },
  initLocation() {
    console.log(this.currItem);
    this.addRoot();
    this.currLocation = this.locations[this.W][this.C];
    this.currLocation.render(this.currItem);
    this.addConsoleStatements();
  }
};

document.addEventListener("DOMContentLoaded", event => {
  game.initLocations();
  game.intro();
  var k = 0;
  document.onkeypress = () => {
    console.log("Onkeypress");
    if (document.body.lastChild) {
      k++;
      if (k == 1) document.body.removeChild(document.getElementById("audio"));
      document.body.removeChild(document.body.lastChild);
      if (k == 3) {
        game.initLocation();
        setTimeout(() => {
          document.getElementById("cmd").value = "";
          document.getElementById("caret").style.left = "163px";
        }, 1);
        document.onkeypress = () => {};
      }
    }
  };
});
