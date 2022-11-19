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

const render_pos_display = (item) => {
  if (
    document.querySelectorAll("body > div > div.pos_display > p").length > 10
  ) {
    clear_orders();
  }
  let order = document.createElement("p");
  order.innerText = replace_(item) + ": " + menu[item].price;
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
};

const place_order = () => {
  clear_orders();
  add_ai_order();
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
  // return a number between 3 and 5
  // used for ai order's qty of items
  return Math.floor(Math.random() * 3) + 3;
};

const replace_ = (s) => s.split("_").join(" ");

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
};

const orders_are_equal = (ai_order, pos_input_order) => {
  ai_order = Object.keys[ai_order].sort();
  pos_input_order = Object.keys[pos_input_order].sort();

  if (ai_order.length !== pos_input_order.length) {
    return false;
  }
  for (let i = 0; i < ai_orders.length; i++) {
    if (ai_order[i] !== pos_input_order[i]) {
      return false;
    }
  }
  return true;
};

add_ai_order();
