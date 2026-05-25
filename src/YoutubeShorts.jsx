import React from "react";

function YoutubeShorts() {
  "use strict";

  // ***********1*****************
  function one(a, b) {}

  //   console.log(one.length, "one"); // 2

  // ***********2*****************
  function two(a, b = 2, ...c) {}
  // if default value presents then it is not counted
  // also rest parameter is NOT counted
  //   console.log(two.length, "two"); // 1

  //***********3*****************
  const THREE = "HELLO";
  function three() {
    console.log(THREE, "THree");
    const THREE = "NEW VALUE";
  }

  //   console.log(three()); //cannot access before initail

  // ***********4*****************
  let fourTemp = 1;

  const four = ++fourTemp + fourTemp++;
  // pre first then post
  //   console.log(four, "four"); // 4

  // ***********5*****************
  const fiveOne = "Abhishek";
  const fiveTwo = "Amit";
  //   it checks from left to right returns final value
  //   console.log(fiveOne && fiveTwo, "FIVE"); //AMIT

  // ***********6*****************
  let sixA = 10;
  let sixB = sixA++;

  //   console.log(sixA, "AAA"); // 11
  //   console.log(sixB, "SIXBB"); // 10

  // ***********7*****************
  let seven = "JS";
  //   seven[1] = "QQ"; // ERR cannot assign to read only property
  //   seven[0]; prints J

  //   console.log(seven[1], "SEVEN");

  // ***********8*****************
  function eight(a = 2, b = 2) {
    // default is only set when arugument is undifned or not passing any value
    console.log(a + b); // 4 , a(null || "") will be 0
  }
  // eight( "" || null, 4);

  // ***********9*****************
  var nine = 1;
  function nine() {
    console.log("Hello");
  }
  //let gives already defines

  // console.log(nine, "nine");  // 1
  // console.log(nine(), "funciton"); // error Not a funtion(VAR)

  // ***********10*****************
  // <Magic user={user} />
  const user = {
    name: "Abhishek",
  };
  function Magic({ user }) {
    // user.name = "UPDATED vALUE"; //NO error this will update
    user = {}; // this will also work
    // but props.user = {} dont worl ready only error
    console.log(user, "userr");
    // return <div>{user.name}</div>; //Prints updated
  }

  // ***********11*****************

  const eleven = {
    name: "Hello",
    age: 23,
  };
  // console.log(Object.keys(eleven).length, "ele");
  // console.log(eleven.length, "len");

  // ***********12*****************
  const hello = "WORLD";

  const twelve = {
    ["hello"]: "one",
    [hello]: "Hello",
  };

  // PRINTS one
  console.log(twelve.hello, "twelve");

  return <div>Youtube</div>;
}

export default YoutubeShorts;
