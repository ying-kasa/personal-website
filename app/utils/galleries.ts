export interface GalleryPhoto {
  src: string
  title: string
  description?: string
}

export interface GalleryAlbum {
  slug: string
  title: string
  description: string
  cover: string
  photos: GalleryPhoto[]
}

/**
 * V1 相册数据在这里维护：
 * 1. 照片文件放进 public/gallery/ 目录（JPG/PNG/WebP 均可，建议单张 500KB 以内）
 * 2. 在下面对应的相簿里加一行 { src: '/gallery/文件名', title: '照片标题' }
 * 3. 新建相簿则复制一个 album 对象，slug 用于组成 /gallery/slug 访问地址
 */
export const galleryAlbums: GalleryAlbum[] = [
  {
    slug: 'city',
    title: '城市漫步',
    description: '街头巷尾的光影与霓虹。',
    cover: '/gallery/city-1.svg',
    photos: [
      { src: '/gallery/city-1.svg', title: '华灯初上', description: '示例照片，替换成你自己的作品' },
      { src: '/gallery/city-2.svg', title: '天桥暮色' },
      { src: '/gallery/city-3.svg', title: '雨后街道' },
      { src: '/gallery/city-4.svg', title: '写字楼光影' },
      { src: '/gallery/city-5.svg', title: '夜班公交' },
    ],
  },
  {
    slug: 'nature',
    title: '自然风光',
    description: '山川湖海，四季流转。',
    cover: '/gallery/nature-1.svg',
    photos: [
      { src: '/gallery/nature-1.svg', title: '晨雾山谷' },
      { src: '/gallery/nature-2.svg', title: '湖面倒影' },
      { src: '/gallery/nature-3.svg', title: '层峦叠嶂' },
      { src: '/gallery/nature-4.svg', title: '海边日落' },
      { src: '/gallery/nature-5.svg', title: '林间小径' },
    ],
  },
  {
    slug: 'daily',
    title: '日常碎片',
    description: '生活里值得记录的瞬间。',
    cover: '/gallery/daily-1.svg',
    photos: [
      { src: '/gallery/daily-1.svg', title: '清晨咖啡' },
      { src: '/gallery/daily-2.svg', title: '书桌一角' },
      { src: '/gallery/daily-3.svg', title: '路边的猫' },
      { src: '/gallery/daily-4.svg', title: '周末晚餐' },
    ],
  },
]
