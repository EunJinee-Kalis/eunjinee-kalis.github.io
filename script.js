// 시계
function updateClock() {
  const now = new Date();
  document.getElementById('clock').textContent = now.toLocaleString('ko-KR', {
    month: 'long', day: 'numeric', weekday: 'short', hour: '2-digit', minute: '2-digit'
  });
}
updateClock();
setInterval(updateClock, 30000);

// 구글 검색 버튼
const form = document.querySelector('.search');
const input = form.querySelector('input');
document.getElementById('search-btn').addEventListener('click', () => {
  if (input.value.trim()) form.submit();
});
document.getElementById('lucky-btn').addEventListener('click', () => {
  const q = input.value.trim();
  window.open('https://www.google.com/search?btnI=1&q=' + encodeURIComponent(q), '_blank');
});

// 오늘의 날씨 (Open-Meteo 무료 API, 키 필요 없음)
const CITIES = [
  { id: 'weather-seoul', lat: 37.5665, lon: 126.9780 },
  { id: 'weather-jeju', lat: 33.4996, lon: 126.5312 }
];

function weatherInfo(code) {
  if (code === 0) return ['☀️', '맑음'];
  if (code <= 2) return ['🌤️', '구름 조금'];
  if (code === 3) return ['☁️', '흐림'];
  if (code <= 48) return ['🌫️', '안개'];
  if (code <= 57) return ['🌦️', '이슬비'];
  if (code <= 67) return ['🌧️', '비'];
  if (code <= 77) return ['❄️', '눈'];
  if (code <= 82) return ['🌧️', '소나기'];
  if (code <= 86) return ['🌨️', '소낙눈'];
  return ['⛈️', '뇌우'];
}

CITIES.forEach(async (c) => {
  const card = document.getElementById(c.id);
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${c.lat}&longitude=${c.lon}` +
      '&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FSeoul';
    const res = await fetch(url);
    const data = await res.json();
    const [icon, desc] = weatherInfo(data.current.weather_code);
    card.querySelector('.icon').textContent = icon;
    card.querySelector('.temp').textContent = Math.round(data.current.temperature_2m) + '°';
    card.querySelector('.desc').textContent =
      `${desc} · 최고 ${Math.round(data.daily.temperature_2m_max[0])}° / 최저 ${Math.round(data.daily.temperature_2m_min[0])}°`;
  } catch (e) {
    card.querySelector('.icon').textContent = '⚠️';
    card.querySelector('.desc').textContent = '날씨를 불러오지 못했습니다';
  }
});

// 명언
const QUOTES = [
  ['천 리 길도 한 걸음부터.', '노자'],
  ['배우고 때때로 익히면 또한 기쁘지 아니한가.', '공자'],
  ['오늘 할 수 있는 일에 전력을 다하라. 그러면 내일에는 한 걸음 더 진보한다.', '아이작 뉴턴'],
  ['성공은 매일 반복한 작은 노력들의 합이다.', '로버트 콜리어'],
  ['미래를 예측하는 가장 좋은 방법은 미래를 창조하는 것이다.', '피터 드러커'],
  ['늦었다고 생각할 때가 가장 빠른 때이다.', '속담'],
  ['배움에는 끝이 없다.', '속담'],
  ['시작이 반이다.', '아리스토텔레스']
];
let lastIndex = -1;
function showQuote() {
  let i;
  do { i = Math.floor(Math.random() * QUOTES.length); } while (i === lastIndex);
  lastIndex = i;
  document.getElementById('quote-text').textContent = '“' + QUOTES[i][0] + '”';
  document.getElementById('quote-author').textContent = '— ' + QUOTES[i][1];
}
showQuote();
document.getElementById('quote-btn').addEventListener('click', showQuote);
