// ==================== 类型定义 ====================

// 关注状态类型
export type FollowStatus = '关注' | '已关注' | '互相关注'

// 用户数据接口
export interface UserItem {
  id: number
  name: string
  avatar: string
  bio: string
  isFollowed: boolean
  followStatus: FollowStatus
  notesCount: number // 笔记/作品数
  collectionsCount: number // 被收藏数
}

// 瀑布流内容接口
export interface FeedItem {
  id: number
  image: string
  title: string
  description: string
  author: UserItem
  likes: number
  comments: number
  collections: number
  growthRecords: number
  isLiked: boolean
  isCollected: boolean
  createdAt: string
  height: number // 图片高度
  width: number // 图片宽度
  imageRatio: number // 宽高比
}

// 分页结果接口
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

// 用户分页结果接口
export interface UserPageResult {
  code: number
  message: string
  data: {
    list: UserItem[]
    total: number
    page: number
    pageSize: number
    hasMore: boolean
  }
}

// ==================== 配置 ====================

const IMAGE_CONFIG = {
  width: 176,
  height: [200, 250, 225, 275] as number[]
}

// 根据高度计算宽高比 
const getImageRatio = (height: number): number => {
  return IMAGE_CONFIG.width / height
}

// ==================== 内容数据池 ====================

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

// ==================== 用户数据池 ====================

const USER_AVATARS: string[] = [
  'https://randomuser.me/api/portraits/men/1.jpg',
  'https://randomuser.me/api/portraits/women/2.jpg',
  'https://randomuser.me/api/portraits/men/3.jpg',
  'https://randomuser.me/api/portraits/women/4.jpg',
  'https://randomuser.me/api/portraits/men/5.jpg',
  'https://randomuser.me/api/portraits/women/6.jpg',
  'https://randomuser.me/api/portraits/men/7.jpg',
  'https://randomuser.me/api/portraits/women/8.jpg',
  'https://randomuser.me/api/portraits/men/9.jpg',
  'https://randomuser.me/api/portraits/women/10.jpg'
]

const USER_NAMES: string[] = [
  '园艺小达人',
  '盆景大师',
  '多肉控',
  '兰花仙子',
  '绿植爱好者',
  '庭院设计师',
  '植物医生',
  '花艺师',
  '盆栽玩家',
  '自然摄影师',
  'YAYA1245',
  '九哥无敌',
  '知芽君',
  '绿手指',
  '花间集',
  '植觉',
  '园丁日记',
  '草木有心',
  '花花世界',
  '植物星球'
]

const USER_BIOS: string[] = [
  '热爱植物，分享生活',
  '盆景爱好者，欢迎交流',
  '多肉植物养护达人',
  '兰花收藏家',
  '庭院设计分享',
  '植物病虫害防治专家',
  '室内绿植推荐官',
  '花园改造日记',
  '这个人很懒，没有留下任何东西',
  '资深园艺师，从业10年',
  '植物科普博主',
  '🌿 与植物为伴',
  '记录每一棵植物的成长'
]

// ==================== 工具函数 ====================

const random = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const randomItem = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)]
}

// ==================== 用户数据生成 ====================

// 生成单条用户数据
export const generateMockUser = (id: number): UserItem => {
  const isFollowed = Math.random() > 0.6
  return {
    id,
    name: randomItem(USER_NAMES),
    avatar: randomItem(USER_AVATARS),
    bio: randomItem(USER_BIOS),
    isFollowed: isFollowed,
    followStatus: isFollowed ? randomItem(['已关注', '互相关注']) : '关注',
    notesCount: random(1, 50),
    collectionsCount: random(0, 5000)
  }
}

// 批量生成用户数据
export const generateMockUsers = (count: number, startId: number = 1): UserItem[] => {
  return Array.from({ length: count }, (_, i) => generateMockUser(startId + i))
}

// 用户数据池
export const USERS: UserItem[] = generateMockUsers(100, 1)

// ==================== 瀑布流内容数据生成 ====================

// 生成单条内容数据（使用用户池中的作者）
export const generateMockItem = (id: number): FeedItem => {
  const height = randomItem(IMAGE_CONFIG.height)
  const randomUser = randomItem(USERS)

  return {
    id,
    image: `https://picsum.photos/${IMAGE_CONFIG.width}/${height}?random=${id}`,
    title: randomItem(TITLES),
    description: randomItem(DESCRIPTIONS),
    author: { ...randomUser }, // 展开所有属性
    likes: random(100, 50000),
    comments: random(10, 500),
    collections: random(50, 5000),
    growthRecords: random(1, 50),
    isLiked: false,
    isCollected: false,
    createdAt: new Date(Date.now() - random(0, 30) * 24 * 60 * 60 * 1000).toISOString(),
    height: height,
    width: IMAGE_CONFIG.width,
    imageRatio: getImageRatio(height) // 计算宽高比
  }
}

// 批量生成内容数据
export const generateMockList = (count: number, startId: number = 1): FeedItem[] => {
  return Array.from({ length: count }, (_, i) => generateMockItem(startId + i))
}

// ==================== API 函数 ====================

// 分页获取瀑布流数据
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

// 搜索内容
export const searchMockData = async (
  keyword: string,
  page: number = 1,
  pageSize: number = 10,
  delay: number = 300
): Promise<PageResult> => {
  await new Promise(resolve => setTimeout(resolve, delay))

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

  const startId = (page - 1) * pageSize + 1
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const pageTitles = filteredItems.slice(startIndex, endIndex)

  const list = pageTitles.map((title, index) => {
    const descIndex = TITLES.findIndex(t => t === title)
    const randomUser = randomItem(USERS)
    const height = randomItem(IMAGE_CONFIG.height)
    return {
      id: startId + index,
      image: `https://picsum.photos/${IMAGE_CONFIG.width}/${height}?random=${startId + index}`,
      title: title,
      description: DESCRIPTIONS[descIndex >= 0 ? descIndex : random(0, DESCRIPTIONS.length - 1)],
      author: { ...randomUser },
      likes: random(100, 50000),
      comments: random(10, 500),
      collections: random(50, 5000),
      growthRecords: random(1, 50),
      isLiked: false,
      isCollected: false,
      createdAt: new Date(Date.now() - random(0, 30) * 24 * 60 * 60 * 1000).toISOString(),
      height: height,
      width: IMAGE_CONFIG.width,
      imageRatio: getImageRatio(height)
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
// 搜索用户
export const searchUserData = async (
  keyword: string,
  page: number = 1,
  pageSize: number = 10,
  delay: number = 300
): Promise<UserPageResult> => {
  await new Promise(resolve => setTimeout(resolve, delay))

  const filteredUsers = USERS.filter(
    user =>
      user.name.toLowerCase().includes(keyword.toLowerCase()) ||
      user.bio.toLowerCase().includes(keyword.toLowerCase())
  )

  if (filteredUsers.length === 0 && keyword) {
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

  if (keyword) {
    filteredUsers.sort((a, b) => {
      const aMatch = a.name.toLowerCase().includes(keyword.toLowerCase()) ? 2 : 1
      const bMatch = b.name.toLowerCase().includes(keyword.toLowerCase()) ? 2 : 1
      return bMatch - aMatch
    })
  }

  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const pageUsers = filteredUsers.slice(startIndex, endIndex)

  return {
    code: 200,
    message: 'success',
    data: {
      list: pageUsers,
      total: filteredUsers.length,
      page,
      pageSize,
      hasMore: page * pageSize < filteredUsers.length
    }
  }
}

// 关注/取消关注
export const followUser = async (
  userId: number
): Promise<{
  code: number
  message: string
  data: {
    isFollowed: boolean
    followStatus: FollowStatus
  }
}> => {
  await new Promise(resolve => setTimeout(resolve, 300))

  const user = USERS.find(u => u.id === userId)
  if (!user) {
    return {
      code: 404,
      message: '用户不存在',
      data: { isFollowed: false, followStatus: '关注' }
    }
  }

  const newIsFollowed = !user.isFollowed
  let newFollowStatus: FollowStatus = '关注'

  if (newIsFollowed) {
    newFollowStatus = Math.random() > 0.7 ? '互相关注' : '已关注'
  }

  user.isFollowed = newIsFollowed
  user.followStatus = newFollowStatus

  return {
    code: 200,
    message: 'success',
    data: {
      isFollowed: newIsFollowed,
      followStatus: newFollowStatus
    }
  }
}

// ==================== 转换函数 ====================

// 根据用户ID获取用户信息
export const getUserById = (userId: number): UserItem | undefined => {
  return USERS.find(user => user.id === userId)
}
