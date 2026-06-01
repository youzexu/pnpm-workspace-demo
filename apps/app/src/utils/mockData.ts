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
  // 五针松相关 (3条)
  '五针松生长记录',
  '五针松养护技巧',
  '五针松盆景欣赏',

  // 盆景相关 (3条)
  '精品盆景欣赏',
  '盆景造型艺术',
  '盆景养护指南',

  // 多肉相关 (3条)
  '多肉植物养护',
  '多肉品种大全',
  '多肉繁殖方法',

  // 兰花相关 (3条)
  '兰花品种大全',
  '兰花栽培技巧',
  '兰花鉴赏'
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

  // 模拟搜索：筛选包含关键词的标题
  const filteredTitles = TITLES.filter(title => title.toLowerCase().includes(keyword.toLowerCase()))

  // 🔥 关键修复：如果匹配结果太少，重复使用匹配到的标题来填充
  if (filteredTitles.length > 0 && filteredTitles.length < pageSize) {
    const original = [...filteredTitles]
    while (filteredTitles.length < pageSize) {
      filteredTitles.push(...original.slice(0, pageSize - filteredTitles.length))
    }
  }

  if (filteredTitles.length === 0) {
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
  const pageTitles = filteredTitles.slice(startIndex, endIndex)

  const list = pageTitles.map((title, index) => ({
    id: startId + index,
    image: `https://picsum.photos/${IMAGE_CONFIG.width}/${randomItem(IMAGE_CONFIG.height)}?random=${startId + index}`,
    title: title,
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
  }))

  return {
    code: 200,
    message: 'success',
    data: {
      list,
      total: filteredTitles.length,
      page,
      pageSize,
      hasMore: page * pageSize < filteredTitles.length
    }
  }
}