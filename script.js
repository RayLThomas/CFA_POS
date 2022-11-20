const body = document.getElementsByTagName('body')[0];
const pos = document.getElementsByClassName("pos_display")[0];
const ai_order_block = document.getElementsByClassName("ai_order")[0];
const dine_btn = document.getElementById("dine_in_btn");
const carry_btn = document.getElementById("carry_out_btn)");
const cancel_btn = document.getElementById("cancel_order_btn");

const menu = {
  brownie: {
    price: "$2",
    imageName: "brownie.png",
  },
  milk_shake: {
    price: "$5",
    imageName: "milkshake.png",
  },
  ice_dream: {
    price: "$3",
    imageName: "icedream.png",
  },
  apple_juice: {
    price: "$2",
    imageName: "apple-juice.png",
  },
  milk: {
    price: "$2",
    imageName: "milk.png",
  },
  lemonade: {
    price: "$4",
    imageName: "brownie.png",
  },
  coke: {
    price: "$2",
    imageName: "coke.png",
  },
  water: {
    price: "$2",
    imageName: "water.png",
  },
  fries: {
    price: "$4",
    imageName: "Fries.png",
  },
  chicken_noodle_soup: {
    price: "$5",
    imageName: "Chicken-Noodle-Soup.png",
  },
  strips: {
    price: "$6",
    imageName: "strips.png",
  },
  nuggets: {
    price: "$5",
    imageName: "nuggets.png",
  },
  sandwich: {
    price: "$6",
    imageName: "Sandwich.png",
  },
};

let _inputed_Order = [];

const replace_with_space = (s) => s.split("_").join(" ");
const replace_ = (s) => s.split("_").join("");
const replace_hyphen = (s) => s.split("-").join("");

// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
  // if the other array is a falsy value, return
  if (!array)
      return false;
  // if the argument is the same array, we can be sure the contents are same as well
  if(array === this)
      return true;
  // compare lengths - can save a lot of time 
  if (this.length != array.length)
      return false;

  for (var i = 0, l=this.length; i < l; i++) {
      // Check if we have nested arrays
      if (this[i] instanceof Array && array[i] instanceof Array) {
          // recurse into the nested arrays
          if (!this[i].equals(array[i]))
              return false;       
      }           
      else if (this[i] != array[i]) { 
          // Warning - two different object instances will never be equal: {x:20} != {x:20}
          return false;   
      }           
  }       
  return true;
}

const tryAgain = () => {
  body.classList.add("tryAgainAnimation");
  setTimeout(() => {
    body.classList.remove("tryAgainAnimation");
  }, "500");  
}
const perfect = () => {
  body.classList.add("perfectAnimation");
  setTimeout(() => {
    body.classList.remove("perfectAnimation");
  }, "500");  
}

const render_pos_display = (item) => {
  if (
    document.querySelectorAll("body > div > div.pos_display > p").length > 10
  ) {
    clear_orders();
  }
  let order = document.createElement("p");
  order.innerText = replace_with_space(item) + ": " + menu[item].price;
  pos.appendChild(order);
};

const animatePressed = (element) => {
  element.classList.add("pressedAnimation");
  setTimeout(() => {
    element.classList.remove("pressedAnimation");
  }, "100");  
}

const addItem = (item) => {
  render_pos_display(item);
  _inputed_Order.push(item);
};

const ai_order_to_array = (order_obj) => {
  let returnArr = [];
  for (item of order_obj) returnArr.push(replace_hyphen(item.imageName).slice(0, -4).toLowerCase());
  return returnArr;
}

const place_order = () => {
  clear_orders();
  let ai_order = ai_order_to_array(_ai_order);
  let inputed_Order = [];
  console.log("ai_order is: ", ai_order);
  for (item of _inputed_Order) inputed_Order.push(replace_(item));
  orders_are_equal(ai_order, inputed_Order) ? perfect() : tryAgain();
  _inputed_Order = [];
  _ai_order = add_ai_order();
};

const clear_orders = () => {
  while (pos.firstChild) {
    pos.removeChild(pos.firstChild);
  }
};

const create_ai_order = (num) => {
  let i = 0;
  let random_ai_order = [];
  do {
    random_ai_order.push(getRandomItem());
    i++;
  } while (i < num);
  return random_ai_order;
};

const get_random_int = () => {
  // return a number between 3 and 5 for ai order's qty of items
  return Math.floor(Math.random() * 3) + 3;
};

const getRandomItem = () => {
  const keys = Object.keys(menu);
  let randomKey = keys[Math.floor(Math.random() * keys.length)];
  return menu[randomKey];
};

const make_imgs = (ai_order) => {
  let img_src_arr = [];
  ai_order.forEach((item) => {
    img_src_arr.push(item.imageName);
  });
  return img_src_arr;
};

//application start
const add_ai_order = () => {
  // clear ai orders on screen
  while (ai_order_block.firstChild) {
    ai_order_block.removeChild(ai_order_block.firstChild);
  }
  // create order object
  let order = create_ai_order(get_random_int());
  console.log(order);
  // create arr of order img sources
  //ex: ['coke.png', 'brownie.png', 'nuggets.png']
  let imgs = make_imgs(order);

  // loop through imgs sources and for each one, make an img element and
  // append to ai_order_block.
  imgs.forEach((img_src) => {
    let image = document.createElement("img");
    image.setAttribute("src", `images\\${img_src}`);
    ai_order_block.appendChild(image);
  });

  return order;

};

const orders_are_equal = (ai_order, pos_input_order) => {
  console.log(ai_order, pos_input_order);
  return (ai_order.equals(pos_input_order));
};

let _ai_order = add_ai_order();
