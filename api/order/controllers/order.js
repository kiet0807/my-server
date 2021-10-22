module.exports = {
  async find(ctx) {
    const order = await strapi.services.order.find({
      user: ctx.state.user.id,
    });
    return order;
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const order = await strapi.services.order.findOne({
      id: id,
    });
    return order;
  },

  async create(ctx) {
    const { cart, name, phone, address, note } = ctx.request.body;
    if (!cart && !phone && !address) {
      return ctx.throw(400, "Please, specify products");
    }

    const newCart = await Promise.all(
      cart.map((x) =>
        strapi.services[`cart-item`].create({
          quantity: x.quantity,
          product: x.id,
        })
      )
    );
    const realTotal = newCart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const cartID = newCart.map((item) => item.id);

    const newOrder = await strapi.services.order.create({
      total: realTotal,
      cart: cartID,
      user: ctx.state.user.id,
      status: "unpaid",
      name: name,
      phone: phone,
      address: address,
      note: note,
    });

    return newOrder;
  },
};
