const Blog = require('../models/mongo/blog');

module.exports = {
  getAllCovers: async () => {
    return await Blog.find({});
  },
  getCoverById: async (id) => {
    return await Blog.findById(id);
  },
  createCover: async (data) => {
    return await Blog.create(data);
  },
  updateCover: async (id, data) => {
    return await Blog.findByIdAndUpdate(id, data);
  },
  deleteCover: async (id) => {
    return await Blog.findByIdAndRemove(id);
  }
};
