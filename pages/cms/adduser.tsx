import useSWR from 'swr'
import Link from 'next/link'
import Header from '../../components/Nav'
import Container from '../../components/Container'
import router from 'next/router'
import toast from 'react-hot-toast'
import { FormEvent, useState } from 'react'

const fetcher = (url: string) => fetch(url).then((r) => r.json())
export default function Index () {
  const { data, error } = useSWR('/api/@me', fetcher)
  const [groups, setGroups] = useState([{ group_id: '', group_name: '' }])
  const [passwd, setPasswd] = useState('')
  const [group, setGroup] = useState('')
  const [name, setName] = useState('')
  const [type, setType] = useState(0)

  if (error) return <div>error</div>
  if (!data) return <div>loading...</div>
  if (!data.success) router.push('/login')
  if (!data.user.user_type) router.push('/')

  async function handleGroup () {
    const res = await fetch('/api/cms/group', { method: 'GET' }).then((r) => r.json())
    if (!res.success) toast.error(res.error)
    if (res.group.length < 1) toast.error('No group found')

    setGroups(res.group)
    toast.success('Group loaded')
  }

  async function handleSubmit (e: FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/cms/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, passwd, group, type })
    }).then((r) => r.json())

    console.log(res)
    if (!res.success) toast.error(res.error)
    if (res.success) toast.success('User created, ID: ' + res.data.user_id)
  }
  return (
    <div>
      <Header title={'학생 추가'} />
      <Container>
      <div className="mt-32 w-full items-center justify-center">
          <form className='mb-32 w-full text-center sm:px-28 px-0' onSubmit={handleSubmit}>
            <div className="flex mb-4 justify-between items-center">
              <label className="block text-xl text-gray-70 font-bold mb-2" htmlFor='hangmok'>학생명:</label>
              <input onChange={(e) => setName(e.target.value)} className='h-10 w-9/12 bg-gray-100 focus:bg-gray-200 px-3 rounded-lg' placeholder='학생명을 입력해주세요'/>
            </div>
            <div className="flex mb-4 justify-between items-center">
              <label className="block text-xl text-gray-70 font-bold mb-2" htmlFor='hangmok'>타입:</label>
              <select className='h-10 w-9/12 bg-gray-100 focus:bg-gray-200 px-3 rounded-lg' onChange={(e: any) => setType(e.target.value)}>
                <option value={0}>학생</option>
                <option value={1}>교사</option>
              </select>
            </div>
            <div className="flex mb-4 justify-between items-center">
              <label className="block text-xl text-gray-70 font-bold mb-2" htmlFor='hangmok'>그룹:</label>
              <select className='h-10 w-9/12 bg-gray-100 focus:bg-gray-200 px-3 rounded-lg' onClick={handleGroup}>
                {groups.map((g) => (
                  <option key={g.group_id} value={g.group_id} onClick={(e) => setGroup(g.group_id)}>{g.group_name}</option>
                ))}
              </select>
            </div>
            <div className="flex mb-4 justify-between items-center">
              <label className="block text-xl text-gray-70 font-bold mb-2" htmlFor='hangmok'>비밀번호:</label>
              <input onChange={(e) => setPasswd(e.target.value)} className='h-10 w-9/12 bg-gray-100 focus:bg-gray-200 px-3 rounded-lg' type='password' />
            </div>
            <div className="inline-flex w-full gap-3">
              <button className="bg-accent1 text-white p-3 w-8/12 rounded-lg" type="submit">유저 생성</button>
              <Link href="/" passHref><button className="bg-accent1 text-white p-3 w-8/12 rounded-lg">취소</button></Link>
            </div>
          </form>
        </div>
      </Container>
    </div>
  )
}
