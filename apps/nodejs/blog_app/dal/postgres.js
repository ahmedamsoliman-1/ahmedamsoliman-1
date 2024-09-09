const Blog = require('../models/postgres/blog');

module.exports = {
  getAllCovers: async () => {
    return await Blog.findAll();
  },
  getCoverById: async (id) => {
    return await Blog.findByPk(id);
  },
  createCover: async (data) => {
    return await Blog.create(data);
  },
  updateCover: async (id, data) => {
    return await Blog.update(data, { where: { id: id } });
  },
  deleteCover: async (id) => {
    return await Blog.destroy({ where: { id: id } });
  }
};
