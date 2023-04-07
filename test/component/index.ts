import { component } from "../../src/index.js";

const divElement = document.createElement("div");
divElement.style.color = "blue";
divElement.style.border = "1px solid black";

component(divElement).haveStyle({
  color: "blue",
  border: "1px solid black",
});
