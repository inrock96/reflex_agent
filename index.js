// MIT License
// Copyright (c) 2020 Luis Espino

let states = [
  { location: "A", left: "DIRTY", right: "DIRTY", counter: 0 },
  { location: "A", left: "CLEAN", right: "DIRTY", counter: 0 },
  { location: "A", left: "DIRTY", right: "CLEAN", counter: 0 },
  { location: "A", left: "CLEAN", right: "CLEAN", counter: 0 },
  { location: "B", left: "DIRTY", right: "DIRTY", counter: 0 },
  { location: "B", left: "CLEAN", right: "DIRTY", counter: 0 },
  { location: "B", left: "DIRTY", right: "CLEAN", counter: 0 },
  { location: "B", left: "CLEAN", right: "CLEAN", counter: 0 },
]

function reflex_agent(location, state) {
  if (state == "DIRTY") return "CLEAN";
  else if (location == "A") return "RIGHT";
  else if (location == "B") return "LEFT";
}

function test(currentState) {

  let newStates = states.map(state => {
    if (state.location === currentState[0] && state.left === currentState[1] && state.right === currentState[2]) {
      state.counter = state.counter + 1
    }
    return state
  })
  states = [...newStates]
  showStates(newStates)


  let location = currentState[0];
  let state = currentState[0] == "A" ? currentState[1] : currentState[2];
  let action_result = reflex_agent(location, state);
  document.getElementById("log").innerHTML += "<br>Location: ".concat(location).concat(" | Action: ").concat(action_result);

  if (currentState[1] == "CLEAN" && currentState[2] == "CLEAN") {

    currentState = [currentState[0], createState(), createState()]
    if (currentState[1] == "CLEAN" && currentState[2] == "CLEAN"){
      currentState[0]=currentState[0]=="A"?"B":"A"
    }
    setTimeout(function () { test(currentState); }, 500);
    
  } else {

    if (action_result == "CLEAN") {
      if (location == "A") currentState[1] = "CLEAN";
      else if (location == "B") currentState[2] = "CLEAN";
    }

    else if (action_result == "RIGHT") currentState[0] = "B";
    else if (action_result == "LEFT") currentState[0] = "A";

    if (verifyStates(states)) {
      setTimeout(function () { test(currentState); }, 500);
    }
  }
}



function verifyStates(states) {
  const verdaderos = states.map(state=>{
    return state.counter>=2
  })
  let contador=0;
  verdaderos.forEach(element => {
    if(element)
      contador++
  });
  if(contador>=8){
    return false
  }
  return true
  
}

function showStates(states) {
  const stateList = document.getElementById("states")
  stateList.innerHTML = ''
  states.forEach(state => {
    stateList.innerHTML += `<h3>Location: ${state.location} |${state.left}|${state.right}| ${state.counter}</h3>`
  });
}

function createState() {
  const left = Math.floor(Math.random() * 3) === 2 ? "DIRTY" : "CLEAN"
  return left
}

let currentState = ["A", "DIRTY", "DIRTY"];


test(currentState);