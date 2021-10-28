module.exports = {
  async create(ctx) {
    const userReal = await strapi.services.profile.findOne({
      user: ctx.state.user.id,
    });
    if (userReal) {
      return userReal.user;
    } else {
      const userReal = await strapi.services.profile.create({
        user: ctx.state.user.id,
      });
      return userReal.user;
    }
  },
};
