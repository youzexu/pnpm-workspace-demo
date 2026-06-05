import { useRouter } from 'vue-router'

// 用户数据接口
export interface UserItem {
  id: number
  name: string
  avatar: string
  bio: string
  isFollowed: boolean
  followStatus: '关注' | '已关注' | '互相关注'
  notesCount: number
  collectionsCount: number
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
  height: number
}

export const useNavigation = () => {
  const router = useRouter()

  // 跳转到图片详情页
  const goToPictureDetail = (item: FeedItem) => {
    router.push({
      path: `/picture/${item.id}`,
      query: {
        data: encodeURIComponent(JSON.stringify(item))
      }
    })
  }

  // 跳转到用户详情页
  const goToUserDetail = (user: UserItem) => {
    router.push({
      path: `/user/${user.id}`,
      query: {
        userData: encodeURIComponent(JSON.stringify(user))
      }
    })
  }

  // 返回上一页
  const goBack = () => {
    router.back()
  }

  return {
    goToPictureDetail,
    goToUserDetail,
    goBack
  }
}
