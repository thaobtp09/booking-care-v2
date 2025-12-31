const repo = require('../repositories/doctor.repository');
const { publishDoctorCreated } = require('../rabbitmq/publisher');

const create = async (data) => {
  const doctor = await repo.create({
    name: data.name,
    specialty_id: data.specialty_id,
    facility_id: data.facility_id,
    description: data.description,
    user_id: data.user_id
  });

  console.log('Doctor created:', doctor.id);
  console.log('User id:', data.user_id);

  if (data.user_id) {
     console.log(' Publishing doctor.created event');
    try {
      await publishDoctorCreated({
        doctorId: doctor.id,
        userId: data.user_id,
        createdAt: new Date().toISOString()
      });
    } catch (err) {
      console.error('RABBITMQ PUBLISH FAILED:', err.message);
    }
  }

  return doctor;
};


const getAll = () => repo.findAll();

const getDetail = async (id) => {
  const data = await repo.findById(id);
  if (!data) throw new Error('NOT_FOUND');
  return data;
};

const update = async (id, data) => {
  const doctor = await repo.findById(id);
  if (!doctor) throw new Error('NOT_FOUND');

  //   so sánh user_id
  if (Object.prototype.hasOwnProperty.call(data, 'user_id')) {
    const incomingUserId =
      data.user_id === null ? null : Number(data.user_id);

    const currentUserId =
      doctor.user_id === null ? null : Number(doctor.user_id);

    if (incomingUserId !== currentUserId) {
      throw new Error('USER_ID_IMMUTABLE');
    }
  }

  await repo.updateById(id, data);
  return repo.findById(id);
};

const remove = async (id) => {
  await getDetail(id);
  return repo.deleteById(id);
};

module.exports = {
  create,
  getAll,
  getDetail,
  update,
  remove
};
