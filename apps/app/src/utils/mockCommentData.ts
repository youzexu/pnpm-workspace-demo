// utils/mockCommentData.ts
export interface CommentItem {
  id: number
  userName: string
  avatar: string
  content: string
  location: string
  likes: number
  isLiked: boolean
  createdAt: string
}

// 用户头像池
const AVATARS = [
  'https://randomuser.me/api/portraits/men/1.jpg',
  'https://randomuser.me/api/portraits/men/2.jpg',
  'https://randomuser.me/api/portraits/men/3.jpg',
  'https://randomuser.me/api/portraits/women/1.jpg',
  'https://randomuser.me/api/portraits/women/2.jpg',
  'https://randomuser.me/api/portraits/women/3.jpg'
]

// 用户名池
const USER_NAMES = [
  '瓜迪奥拉',
  '九哥',
  'YY',
  '园艺小达人',
  '盆景大师',
  '多肉控',
  '兰花仙子',
  '绿植爱好者',
  'YAYA1245',
  '知芽君'
]

// 评论内容池
const COMMENT_CONTENTS = [
  '还是更喜欢你那棵系鱼川还是更喜欢你那棵系鱼川',
  '玩树不玩松 到老一场空哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
  '不冲突，喜欢的东西可以有很多不冲突～',
  '说得太对了！深有同感',
  '这个观点很有意思，学习了',
  '感谢分享，受益匪浅',
  '美得很！',
  '太漂亮了，我也想拥有一棵',
  '养护得真好，求指教',
  '学习了，谢谢分享'
]

// 地点池
const LOCATIONS = ['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '西安']

// 随机数生成
const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const randomItem = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)]
}

// 生成单条评论
const generateMockComment = (id: number, daysAgo?: number): CommentItem => {
  let createdAt: string
  if (daysAgo !== undefined) {
    const date = new Date()
    date.setDate(date.getDate() - daysAgo)
    createdAt = date.toISOString()
  } else {
    // 随机生成几天前到现在的评论
    const days = random(0, 30)
    const date = new Date()
    date.setDate(date.getDate() - days)
    createdAt = date.toISOString()
  }

  return {
    id,
    userName: randomItem(USER_NAMES),
    avatar: randomItem(AVATARS),
    content: randomItem(COMMENT_CONTENTS),
    location: randomItem(LOCATIONS),
    likes: random(0, 50000),
    isLiked: false,
    createdAt
  }
}

// 生成评论列表
export const generateMockComments = (count: number, startId: number = 1): CommentItem[] => {
  return Array.from({ length: count }, (_, i) => generateMockComment(startId + i))
}

// 模拟获取评论 API
export const fetchMockComments = async (
  page: number = 1,
  pageSize: number = 10,
  delay: number = 300
): Promise<{
  code: number
  message: string
  data: {
    list: CommentItem[]
    total: number
    page: number
    pageSize: number
    hasMore: boolean
  }
}> => {
  await new Promise(resolve => setTimeout(resolve, delay))

  const startId = (page - 1) * pageSize + 1
  const list = generateMockComments(pageSize, startId)
  const total = 35 // 模拟总共35条评论

  return {
    code: 200,
    message: 'success',
    data: {
      list,
      total,
      page,
      pageSize,
      hasMore: page * pageSize < total
    }
  }
}
