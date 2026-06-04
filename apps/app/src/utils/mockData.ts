// 类型定义
export interface Author {
  id: number
  name: string
  avatar: string
}

export interface FeedItem {
  id: number
  image: string
  title: string
  description: string // 新增：长简介
  author: Author
  likes: number
  comments: number
  collections: number
  growthRecords: number
  isLiked: boolean
  isCollected: boolean
  createdAt: string
  height: number
}

export interface PageResult {
  code: number
  message: string
  data: {
    list: FeedItem[]
    total: number
    page: number
    pageSize: number
    hasMore: boolean
  }
}

// 配置
const IMAGE_CONFIG = {
  width: 176,
  height: [200, 250, 225, 275] as number[],
  categories: ['nature', 'tech', 'people', 'animals', 'art']
}

const TITLES: string[] = [
  '五针松生长记录',
  '五针松养护技巧',
  '五针松盆景欣赏',
  '精品盆景欣赏',
  '盆景造型艺术',
  '盆景养护指南',
  '多肉植物养护',
  '多肉品种大全',
  '多肉繁殖方法',
  '兰花品种大全',
  '兰花栽培技巧',
  '兰花鉴赏'
]

// 新增：长简介库
const DESCRIPTIONS: string[] = [
  '五针松是盆景中的经典品种，树姿优美，针叶翠绿。养护时需要注意控制浇水，避免积水烂根。春季可适当施肥，促进生长。修剪时要保持层次感，展现自然之美。',
  '盆景造型讲究"虽由人作，宛自天开"。通过修剪、蟠扎等技法，将自然景观浓缩于方寸之间。每一盆盆景都是独特的艺术品，需要耐心和时间的打磨。',
  '多肉植物养护要点：光照充足、通风良好、浇水见干见湿。夏季注意遮阴降温，冬季需移入室内。多肉品种繁多，形态各异，是新手入门的绝佳选择。',
  '兰花被誉为"花中君子"，姿态高雅，香气清幽。养护兰花需要注意植料选择、温湿度控制和病虫害防治。定期换盆、分株可以保持兰花旺盛的生命力。',
  '盆景艺术起源于中国，已有上千年的历史。它不仅是一种园艺技艺，更是一种精神寄托。通过盆景创作，可以修身养性，感悟自然之道。',
  '这颗盆景树龄已超过十年，经过精心培育，树形优美，枝干遒劲。适合摆放在客厅、书房，为居室增添一份自然气息和文化底蕴。',
  '盆栽植物的养护需要根据季节变化调整管理措施。春季是生长旺季，需增加光照和施肥；夏季要注意遮阴降温；秋冬则要控制浇水，帮助植物休眠。',
  '盆景修剪是造型的关键步骤。通过疏剪、短截、摘心等手法，可以控制树形，促进分枝，使盆景更加丰满美观。修剪工具要保持锋利，切口要平滑。',
  '浇水的原则是"不干不浇，浇则浇透"。不同植物对水分的需求不同，要根据土壤湿度、季节变化和植物状态灵活掌握。夏季可在早晚浇水，避免中午高温时段。',
  '盆景的病虫害防治要以预防为主。保持通风良好、光照充足，定期检查叶片背面和枝干，发现病虫害及时处理。可使用生物防治或低毒农药，注意安全间隔期。',
  '这盆作品的造型灵感来源于黄山迎客松，枝干苍劲有力，树冠层次分明。经过多年的精心培育，已初具规模，是收藏和欣赏的佳品。',
  '盆景需要定期换盆，一般每隔2-3年换一次。换盆时要去除部分旧土，修剪腐烂根系，添加新的培养土。换盆后要放在阴凉处缓苗一周左右。'
]

const AVATARS: string[] = [
  'https://randomuser.me/api/portraits/men/1.jpg',
  'https://randomuser.me/api/portraits/women/2.jpg',
  'https://randomuser.me/api/portraits/men/3.jpg'
]

// 工具函数
const random = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const randomItem = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)]
}

// 生成单条模拟数据
export const generateMockItem = (id: number): FeedItem => {
  const height = randomItem(IMAGE_CONFIG.height)
  return {
    id,
    image: `https://picsum.photos/${IMAGE_CONFIG.width}/${height}?random=${id}`,
    title: randomItem(TITLES),
    description: randomItem(DESCRIPTIONS), // 新增：随机选择长简介
    author: {
      id: random(1, 100),
      name: `用户${random(1000, 9999)}`,
      avatar: randomItem(AVATARS)
    },
    likes: random(100, 50000),
    comments: random(10, 500),
    collections: random(50, 5000),
    growthRecords: random(1, 50),
    isLiked: false,
    isCollected: false,
    createdAt: new Date(Date.now() - random(0, 30) * 24 * 60 * 60 * 1000).toISOString(),
    height
  }
}

// 批量生成
export const generateMockList = (count: number, startId: number = 1): FeedItem[] => {
  return Array.from({ length: count }, (_, i) => generateMockItem(startId + i))
}

// 分页获取（模拟 API）
export const fetchMockData = async (
  page: number,
  pageSize: number = 10,
  delay: number = 500
): Promise<PageResult> => {
  await new Promise(resolve => setTimeout(resolve, delay))

  const startId = (page - 1) * pageSize + 1
  const data = generateMockList(pageSize, startId)

  return {
    code: 200,
    message: 'success',
    data: {
      list: data,
      total: 100,
      page,
      pageSize,
      hasMore: page * pageSize < 100
    }
  }
}

// 根据关键词搜索内容
export const searchMockData = async (
  keyword: string,
  page: number = 1,
  pageSize: number = 10,
  delay: number = 300
): Promise<PageResult> => {
  await new Promise(resolve => setTimeout(resolve, delay))

  // 模拟搜索：筛选包含关键词的标题或简介
  const filteredItems = TITLES.filter(
    (title, index) =>
      title.toLowerCase().includes(keyword.toLowerCase()) ||
      DESCRIPTIONS[index]?.toLowerCase().includes(keyword.toLowerCase())
  )

  if (filteredItems.length === 0) {
    return {
      code: 200,
      message: 'success',
      data: {
        list: [],
        total: 0,
        page,
        pageSize,
        hasMore: false
      }
    }
  }

  // 生成搜索结果
  const startId = (page - 1) * pageSize + 1
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const pageTitles = filteredItems.slice(startIndex, endIndex)

  const list = pageTitles.map((title, index) => {
    const descIndex = TITLES.findIndex(t => t === title)
    return {
      id: startId + index,
      image: `https://picsum.photos/${IMAGE_CONFIG.width}/${randomItem(IMAGE_CONFIG.height)}?random=${startId + index}`,
      title: title,
      description: DESCRIPTIONS[descIndex >= 0 ? descIndex : random(0, DESCRIPTIONS.length - 1)],
      author: {
        id: random(1, 100),
        name: `用户${random(1000, 9999)}`,
        avatar: randomItem(AVATARS)
      },
      likes: random(100, 50000),
      comments: random(10, 500),
      collections: random(50, 5000),
      growthRecords: random(1, 50),
      isLiked: false,
      isCollected: false,
      createdAt: new Date(Date.now() - random(0, 30) * 24 * 60 * 60 * 1000).toISOString(),
      height: randomItem(IMAGE_CONFIG.height)
    }
  })

  return {
    code: 200,
    message: 'success',
    data: {
      list,
      total: filteredItems.length,
      page,
      pageSize,
      hasMore: page * pageSize < filteredItems.length
    }
  }
}