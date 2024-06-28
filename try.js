const data = [
  {
    _id: { $oid: "667e9f0f0d08c6787bc62359" },
    title: "aff",
    checked: false,
    __v: { $numberInt: "0" },
  },
  {
    _id: { $oid: "667ea3f455545e0ba52b1d17" },
    title: "hello",
    checked: false,
    __v: { $numberInt: "0" },
  },
];

data.forEach((title) => {
  console.log(title.title);
});
