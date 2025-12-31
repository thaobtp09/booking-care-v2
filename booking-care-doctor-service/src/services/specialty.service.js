const repo = require('../repositories/specialty.repository');

const getAll = () => repo.findAll();

const getDetail = async (id) => {
  const data = await repo.findById(id);
  if (!data) throw new Error('NOT_FOUND');
  return data;
};

const create = (data) => repo.create(data);

const update = async (id, data) => {
  await getDetail(id);
  await repo.updateById(id, data);
  return getDetail(id);
};

const remove = async (id) => {
  await getDetail(id);
  return repo.deleteById(id);
};

module.exports = {
  getAll,
  getDetail,
  create,
  update,
  remove
};
