export const getOkrs = async () => {
  return await new Promise((resolve, reject) => {
    fetch('https://okrcentral.github.io/sample-okrs/db.json')
      .then(res => resolve(res.json()))
      .catch(error => reject(error));
  });
};
