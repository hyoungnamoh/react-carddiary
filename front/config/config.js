//공용으로 사용할 axios base url
const backUrl = process.env.NODE_ENV === 'production' ? 'http://3.22.212.27' : 'http://localhost:3603';
// const backUrl = 'http://3.22.212.27';

export { backUrl };