/* eslint-disable no-unused-vars */
import React from "react";

function ArrayMethods() {
  let data = [
    { id: 1, name: "John", age: 5, city: "New York", address: { state: "KA" } },
    { id: 2, name: "Sarah", age: 50, city: "London", address: { state: "MH" } },
    {
      id: 2,
      name: "kiran",
      age: 588,
      city: "London",
      address: { state: "GJ" },
    },
    {
      id: 3,
      name: "kiran",
      age: 588,
      city: "London",
      address: { state: "GJ" },
    },
  ];

  let uniqueByName = data.reduce((acc, item) => {
    if (!acc.some((val, idx) => val.name == item.name)) {
      acc.push(item);
    }
    return acc;
  }, []);

  console.log(uniqueByName);

  let idLookup = data.reduce((map, item) => {
    map[item.id] = item;
    return map;
  }, {});
  // console.log(idLookup);

  let UpdateReduce = data?.reduce((acc, item) => {
    return acc + item.age;
  }, 0);

  let UpdateReduceArray = data?.reduce((acc, item) => {
    acc.push({
      ...item,
      name: item.name + " Reduces",
    });
    return acc;
  }, []);

  let UpdateReduceObj = data?.reduce((acc, item) => {
    acc[item.city] = item.city;
    acc[item.city] = item;

    return acc;
  }, {});

  // console.log(UpdateReduceObj, 'UpdateReduce')

  let updateMap = data?.map((item, idx) => {
    let temp = { ...item };
    delete temp.address;
    return {
      ...temp,
      country: "India",
      age: item.age + " years",
      state: item.address.state,
    };
  });

  let updateMapTwo = data?.map(({ address, ...rest }) => {
    return { ...rest, state: address.state };
  });

  // console.dir(updateMapTwo, "updateMap");

  let filterMethodByKey = data.filter((item, idx) => {
    return item.name !== "Mike";
  });

  let filterMethodByIndex = data.filter((item, idx) => {
    return Object.values(item).indexOf("Paris") == -1;
  });

  return <div>ArrayMethods</div>;
}

export default ArrayMethods;
