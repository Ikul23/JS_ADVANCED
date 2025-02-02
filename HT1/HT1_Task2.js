const restaurant = {
  chefs: new Map([
    ["Виктор", "Пицца"],
    ["Ольга", "Суши"],
    ["Дмитрий", "Десерты"]
  ]),

  
  dishes: new Map([
    ["Пицца 'Маргарита'", "Виктор"],
    ["Пицца 'Пепперони'", "Виктор"],
    ["Суши 'Филадельфия'", "Ольга"],
    ["Суши 'Калифорния'", "Ольга"],
    ["Тирамису", "Дмитрий"],
    ["Чизкейк", "Дмитрий"]
  ]),

  
  clients: new Map(),

  
  orders: new Map(),

  
  addClient(client) {
    this.clients.set(client.name, client);
  },

  
  addOrder(client, dishes) {
    if (!this.clients.has(client.name)) {
      this.addClient(client);
    }
    this.orders.set(client, dishes);
  },

  
  [Symbol.iterator]() {
    const ordersArray = Array.from(this.orders);
    let index = 0;

    return {
      next: () => {
        if (index < ordersArray.length) {
          const [client, clientDishes] = ordersArray[index++];
          return {
            value: { client, clientDishes },
            done: false
          };
        } else {
          return { done: true };
        }
      }
    };
  }
};


const alexey = { name: "Алексей" };
const maria = { name: "Мария" };
const irina = { name: "Ирина" };


restaurant.addOrder(alexey, ["Пицца 'Пепперони'", "Тирамису"]);
restaurant.addOrder(maria, ["Суши 'Калифорния'", "Пицца 'Маргарита'"]);
restaurant.addOrder(irina, ["Чизкейк"]);


for (const order of restaurant) {
  const { client, clientDishes } = order;
  console.log(`Клиент ${client.name} заказал:`);
  clientDishes.forEach(dish => {
    const chef = restaurant.dishes.get(dish);
    console.log(`- ${dish} (готовит: ${chef})`);
  });
}