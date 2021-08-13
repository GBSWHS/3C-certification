import moment from 'moment'
import Link from 'next/link'
import useSWR from 'swr'

interface PostsData {
  id: number
  title: string
  content: string
  createdAt: string
  author: string
  reason: string
  status: number
  tag: string
}
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Posts () {
  const { data, error } = useSWR('/api/lists', fetcher)

  if (!data) return <div>로딩중...</div>
  if (error) return <div>오류: {error}</div>
  if (!data.success) return <div>오류: {data.message}</div>

  return (
    <div className="mt-11 grid md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 gap-3">
      <Link href={'/post/write'} passHref>
        <div className="cursor-pointer rounded-sm border-2 bg-black text-white hover:border-blue-300 p-8 lg:h-64">
          <h1 className="text-2xl">게시글을 올리고</h1>
          <p>3C점수를 얻으세요!</p>
          <hr className="my-2" />
          <p>이곳을 클릭해 게시글 작성을 시작하세요!</p>
        </div>
      </Link>
      {data.posts.map((post: PostsData, i: number) => (
        <div key={i}>
          <Link href={'/post/' + post.id} passHref>
            <div className={(post.status === 2 ? 'bg-green-200' : post.status === 1 ? 'bg-red-200' : 'bg-yellow-200') + ' cursor-pointer rounded-sm border-2 hover:border-blue-300 p-8 lg:h-64'}>
              <h3 className="text-xl">{post.title.slice(0, 20)}{post.title.length > 20 ? '...' : ''}</h3>
              <p>게시자: {post.author}</p>
              <p>태그: {post.tag}</p>
              <p>상태: {post.status === 2 ? '승인됨' : post.status === 1 ? '거절됨' : '대기중'}</p>
              <p>등록일: {moment(post.createdAt).format('YYYY-MM-DD hh:mm')}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}
