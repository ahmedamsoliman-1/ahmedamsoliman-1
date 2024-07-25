
const getSampleDate = async function() {
  const random_user_api = 'https://randomuser.me/api/';
  const res = await fetch(random_user_api);
  const data = await res.json();
  const user = data.results[0];
  console.log(user);
  return user;
}

module.exports = {
  getSampleDate,
};
