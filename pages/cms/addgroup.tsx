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
  const [per, setPer] = useState(0)
  const [name, setName] = useState('')
  const [owner, setOwner] = useState(0)
  const [users, setUsers] = useState([{ user_id: 0, user_name: '', user_type: 0 }])

  if (error) return <div>error</div>
  if (!data) return <div>loading...</div>
  if (!data.success) router.push('/login')
  if (!data.user.user_type) router.push('/')

  async function handleUser () {
    const res = await fetch('/api/cms/user', { method: 'GET' }).then((r) => r.json())
    if (!res.success) return toast.error('Error')
    if (res.user.length < 1) return toast.error('No users')

    setUsers(res.user)
  }

  async function handleSubmit (e: FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/cms/group', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, per, owner })
    }).then((r) => r.json())

    console.log(res)
    if (!res.success) toast.error(res.error)
    if (res.success) toast.success('Group created')
  }
  return (
    <div>
      <Header title={'학생 추가'} />
      <Container>
      <div className="mt-32 w-full items-center justify-center">
          <form className='mb-32 w-full text-center sm:px-28 px-0' onSubmit={handleSubmit}>
            <div className="flex mb-4 justify-between items-center">
              <label className="block text-xl text-gray-70 font-bold mb-2" htmlFor='hangmok'>그룹명:</label>
              <input onChange={(e) => setName(e.target.value)} className='h-10 w-9/12 bg-gray-100 focus:bg-gray-200 px-3 rounded-lg' placeholder='그룹명 입력해주세요'/>
            </div>
            <div className="flex mb-4 justify-between items-center">
              <label className="block text-xl text-gray-70 font-bold mb-2" htmlFor='hangmok'>권한:</label>
              <input onChange={(e) => setPer(Number(e.target.value))} className='h-10 w-9/12 bg-gray-100 focus:bg-gray-200 px-3 rounded-lg' type="number" placeholder='권한을 입력해주세요'/>
            </div>
            <div className="flex mb-4 justify-between items-center">
              <label className="block text-xl text-gray-70 font-bold mb-2" htmlFor='hangmok'>소유자:</label>
              <select className='h-10 w-9/12 bg-gray-100 focus:bg-gray-200 px-3 rounded-lg' onClick={handleUser}>
                {users.map((g) => (
                  <option key={g.user_id} value={g.user_id} onClick={(e) => setOwner(g.user_id)}>{g.user_name}({g.user_type ? '교사' : '학생'})</option>
                ))}
              </select>
            </div>
            <div className="inline-flex w-full gap-3">
              <button className="bg-accent1 text-white p-3 w-8/12 rounded-lg" type="submit">그룹 생성</button>
              <Link href="/" passHref><button className="bg-accent1 text-white p-3 w-8/12 rounded-lg">취소</button></Link>
            </div>
          </form>
        </div>
      </Container>
    </div>
  )
}
