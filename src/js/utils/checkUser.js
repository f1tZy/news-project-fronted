/* eslint linebreak-style: ["error", "windows"] */

export default function checkUser(header, mainApi) {
  if (localStorage.getItem('jwt')) {
    mainApi.getUserData()
      .then((data) => {
        header.render({ userName: data.data.name });
      })
      .catch(() => {
        header.render({});
      });
  } else {
    header.render({});
  }
}
