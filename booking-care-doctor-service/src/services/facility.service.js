const repo = require('../repositories/facility.repository');

const getAll = () => repo.findAll();

const getDetail = async (id) => {
  const facility = await repo.findById(id);
  if (!facility) throw new Error('NOT_FOUND');
  return facility;
};

const update = async (id, data) => {
  await getDetail(id);
  await repo.updateById(id, data);
  return getDetail(id);
};

const remove = async (id) => {
  await getDetail(id);
  return repo.deleteById(id);
};
const create = async (data) => {
  return repo.create(data);
};

module.exports = {
  getAll,
  getDetail,
  create,
  update,
  remove
};
