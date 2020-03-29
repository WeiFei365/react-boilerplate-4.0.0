export function userToken() {
  // return UTS.fetchGet('/user/token')
  //   .catch(UTS.func)
  //   .then(UTS.userParser);
  return new Promise(resolve => {
    UTS.sleep(() => resolve({ id: 1, token: '***' }));
  });
}
