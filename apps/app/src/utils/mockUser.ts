// 用户数据结构
export type FollowStatus = '关注' | '已关注' | '互相关注'
export interface UserItem {
  id: number
  name: string
  avatar: string
  bio: string
  isFollowed: boolean
  followStatus: FollowStatus
  notesCount: number
  collectionsCount: number
}

// 更多头像
const AVATARS: string[] = [
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

// 用户名池
const USER_NAMES = [
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

// 简介池
const BIOS = [
  '热爱植物，分享生活',
  '盆景爱好者，欢迎交流',
  '多肉植物养护达人',
  '兰花收藏家',
  '庭院设计分享',
  '植物病虫害防治专家',
  '室内绿植推荐官',
  '花园改造日记',
  '这个人很懒，没有留下任何东西',
  '简介简介简介简介简介简介11111111111111111111111111111111',
  '资深园艺师，从业10年',
  '植物科普博主',
  '🌿 与植物为伴',
  '记录每一棵植物的成长'
]

// 随机数生成
const random = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const randomItem = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)]
}

// 生成单条用户数据
export const generateMockUser = (id: number): UserItem => {
  const isFollowed = Math.random() > 0.6
  // 删除未使用的 followStatuses
  // const followStatuses: ('关注' | '已关注' | '互相关注')[] = ['关注', '已关注', '互相关注']

  return {
    id,
    name: randomItem(USER_NAMES),
    avatar: randomItem(AVATARS),
    bio: randomItem(BIOS),
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

// 用户数据池（50个用户）
export const USERS: UserItem[] = generateMockUsers(100, 1)

// 搜索用户数据（删除重复声明，只保留一个）
export const searchUserData = async (
  keyword: string,
  page: number = 1,
  pageSize: number = 10,
  delay: number = 300
): Promise<{
  code: number
  message: string
  data: { list: UserItem[]; total: number; page: number; pageSize: number; hasMore: boolean }
}> => {
  await new Promise(resolve => setTimeout(resolve, delay))

  // 根据关键词筛选用户（名称或简介匹配）
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

  // 有关键词时，按匹配度排序（使用 const，因为不需要修改数组）
  if (keyword) {
    filteredUsers.sort((a, b) => {
      const aMatch = a.name.toLowerCase().includes(keyword.toLowerCase()) ? 2 : 1
      const bMatch = b.name.toLowerCase().includes(keyword.toLowerCase()) ? 2 : 1
      return bMatch - aMatch
    })
  }

  // 分页
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
  let newFollowStatus: '关注' | '已关注' | '互相关注' = '关注'

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
