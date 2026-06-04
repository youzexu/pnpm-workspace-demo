// composables/useNavigation.ts
import { useRouter } from 'vue-router'

// 定义 FeedItem 接口
interface FeedItem {
  id: number
  image: string
  title: string
  author: { id: number; name: string; avatar: string }
  likes: number
  collections: number
  growthRecords: number
  isLiked: boolean
  isCollected?: boolean
}

export const useNavigation = () => {
  const router = useRouter()

  // 跳转到图片详情页 - 传递完整数据
  const goToPictureDetail = (item: FeedItem) => {
    // 将数据序列化为 JSON 字符串传递
    router.push({
      path: `/picture/${item.id}`,
      query: {
        data: encodeURIComponent(JSON.stringify(item))
      }
    })
  }
  return {
    goToPictureDetail
  }
}
