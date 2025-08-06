let btn = document.getElementById("btn");
btn.addEventListener("click", () => {});

const obj = useState(0);

const { value, setState } = obj;

function sum() {
  let input1 = document.getElementById("input1");
  let input2 = document.getElementById("input2");
  const result = Number(input1.value) + Number(input2.value);
  setState(Math.random());
}

function reset() {
  setState(0);
}

function useState(value) {
  function setState(newValue) {
    let res = document.getElementById("result");
    res.innerText = newValue;

    return newValue;
  }
  return { value, setState };
}
