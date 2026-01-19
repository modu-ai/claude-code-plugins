const app = require('./src/app');
const { getLocalIp } = require('./src/utils/getLocalIp');

const PORT = process.env.PORT || 4000;

const ip = getLocalIp();

app.listen(PORT, () => {
  console.log(`🚀 서버 실행 중!`);
  console.log(`👉 로컬 주소:   http://localhost:${PORT}`);
  console.log(`👉 네트워크 주소: http://${ip}:${PORT}`);
});
