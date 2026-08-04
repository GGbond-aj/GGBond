export type HikingRoute = {
  slug: string;
  name: string;
  region: string;
  distance: string;
  duration: string;
  difficulty: string;
  season: string;
  image: string;
  summary: string;
  highlights: string[];
  tips: string[];
};

const imageBase = `${import.meta.env.BASE_URL}images/routes/`;

export const hikingRoutes: HikingRoute[] = [
  { slug: 'tiger-leaping-gorge', name: '虎跳峡高路', region: '云南 · 丽江 / 香格里拉', distance: '约 22 km', duration: '2–3 天', difficulty: '中等', season: '3–5 月、9–11 月', image: `${imageBase}route-1.jpg`, summary: '沿金沙江峡谷上方的高路行走，在玉龙雪山与哈巴雪山之间感受极具张力的山河尺度。', highlights: ['二十八道拐的山脊视野', '金沙江大峡谷', '雪山与纳西村落'], tips: ['连续爬升较多，预留充分体力', '雨季注意落石和湿滑路段', '建议提前安排沿线住宿'] },
  { slug: 'yubeng', name: '雨崩徒步', region: '云南 · 梅里雪山', distance: '约 45 km', duration: '4–6 天', difficulty: '困难', season: '5–6 月、9–10 月', image: `${imageBase}route-2.jpg`, summary: '走进梅里雪山脚下的隐秘村落，冰湖、神瀑、森林与雪峰共同构成高原徒步的经典篇章。', highlights: ['神瀑与冰湖支线', '梅里雪山日照金山', '藏地村落风光'], tips: ['高海拔路线，请循序适应', '准备保暖、防晒和雨具', '尊重当地宗教与生态规则'] },
  { slug: 'wugong-mountain', name: '武功山金顶', region: '江西 · 萍乡', distance: '约 23 km', duration: '2–3 天', difficulty: '中等', season: '5–6 月、9–10 月', image: `${imageBase}route-3.jpg`, summary: '万亩高山草甸从山脊一直铺向云端，天气晴好时，连绵起伏的金色草坡充满治愈感。', highlights: ['高山草甸连绵山脊', '云海日出', '星空营地'], tips: ['山顶温差明显', '周末客流较大，建议错峰', '营地露营需遵守管理规定'] },
  { slug: 'wuyi-mountain', name: '武夷山大王峰', region: '福建 · 南平', distance: '约 14 km', duration: '1–2 天', difficulty: '入门', season: '3–5 月、10–11 月', image: `${imageBase}route-4.jpg`, summary: '丹霞岩壁、九曲溪与茶园雾气相伴，适合第一次体验山水徒步的旅行者。', highlights: ['九曲溪山水画卷', '丹霞岩峰', '茶香与晨雾'], tips: ['石阶湿润时需防滑', '轻装即可完成主线', '保护景区内植被'] },
  { slug: 'kanas', name: '喀纳斯三湾', region: '新疆 · 阿勒泰', distance: '约 18 km', duration: '1–2 天', difficulty: '入门', season: '6–9 月、9 月下旬', image: `${imageBase}route-5.jpg`, summary: '湖泊、河湾、白桦林与远山交错，秋季层林尽染，是北疆最具代表性的轻徒步目的地。', highlights: ['神仙湾、月亮湾、卧龙湾', '白桦林秋色', '高山湖泊'], tips: ['昼夜温差大', '秋季需提前预约交通与住宿', '严禁离开规定步道'] },
  { slug: 'emei-mountain', name: '峨眉山金顶', region: '四川 · 乐山', distance: '约 30 km', duration: '2 天', difficulty: '中等', season: '4–6 月、9–11 月', image: `${imageBase}route-6.jpg`, summary: '从森林到云海，沿途海拔与植被不断切换，抵达金顶时可远眺群山与佛光。', highlights: ['金顶云海', '峨眉冷杉林', '日出与霞光'], tips: ['山路台阶多，建议使用登山杖', '关注索道运行信息', '不要投喂野生动物'] },
  { slug: 'shennongjia', name: '神农架大九湖', region: '湖北 · 神农架', distance: '约 16 km', duration: '1–2 天', difficulty: '入门', season: '5–10 月', image: `${imageBase}route-7.jpg`, summary: '湿地晨雾、原始森林和高山草甸组成了清凉的华中秘境，适合慢速观察自然。', highlights: ['高山湿地晨雾', '原始森林步道', '丰富的动植物观察'], tips: ['早晚湿冷，带好外层衣物', '不采摘、不惊扰野生动物', '请按景区开放线路行走'] },
  { slug: 'qinling', name: '秦岭太白山', region: '陕西 · 宝鸡', distance: '约 35 km', duration: '3–4 天', difficulty: '困难', season: '6–9 月', image: `${imageBase}route-8.jpg`, summary: '从森林线一路向高山草甸推进，秦岭主脊的辽阔与多变天气，是对耐力和规划能力的考验。', highlights: ['大爷海高山湖泊', '秦岭主脊草甸', '垂直植被带'], tips: ['高海拔和强风天气需谨慎', '结伴出行并准备离线轨迹', '关注保护区进山规定'] },
  { slug: 'siguniang', name: '四姑娘山长坪沟', region: '四川 · 阿坝', distance: '约 24 km', duration: '2–3 天', difficulty: '中等', season: '5–6 月、9–10 月', image: `${imageBase}route-9.jpg`, summary: '雪山、溪流、杉林与草甸在山谷中层层展开，是川西高原徒步的经典入门线。', highlights: ['幺妹峰远景', '高山峡谷草甸', '雪山倒影'], tips: ['提前适应海拔', '高原紫外线强，做好防护', '不建议单独进入偏远支线'] },
  { slug: 'great-wall', name: '箭扣长城', region: '北京 · 怀柔', distance: '约 12 km', duration: '1 天', difficulty: '困难', season: '4–5 月、9–11 月', image: `${imageBase}route-10.jpg`, summary: '长城蜿蜒于险峻山脊，野趣浓郁但部分路段陡峭破损，需要充分评估自身能力。', highlights: ['山脊长城曲线', '鹰飞倒仰视野', '日出与秋色'], tips: ['部分段落风险高，量力而行', '切勿攀爬封闭或危险段', '携带充足饮水与头灯'] },
];

export const getHikingRoute = (slug: string) => hikingRoutes.find((route) => route.slug === slug);
