module.exports = {
  async create(ctx) {
    const userReal = await strapi.services.token.findOne({
      user: ctx.state.user.id,
    });
    if (userReal) {
      return userReal.user;
    } else {
      const userReal = await strapi.services.token.create({
        user: ctx.state.user.id,
      });
      return userReal.user;
    }
  },
};
