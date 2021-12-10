import router from 'next/router'
import Header from '../components/Nav'
import { toast } from 'react-hot-toast'
import { FormEvent, useState } from 'react'
import Container from '../components/Container'

export default function Index () {
  const [id, setId] = useState('')
  const [passwd, setPw] = useState('')

  async function onSubmit (e: FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, passwd })
    })
    if (!res) return toast.error('서버 오류가 발생했습니다.')

    const response = await res.json()
    if (!response.success) return toast.error(response.error)
    toast.success('로그인 성공, 리다이렉트중')
    router.push('/')
  }

  return (
    <div>
      <Header title={'로그인'} />
      <Container>
        <div className="w-full items-center justify-center text-center">
          <h1 className="text-3xl font-bold">로그인</h1>
          <form onSubmit={onSubmit}>
            <input value={id} onChange={(e: any) => setId(e.target.value)} className="w-11/12 sm:W-8/12 p-2 bg-gray-200 font-semibold rounded-lg mt-6" required placeholder='아이디를 입력하세요'/>
            <input value={passwd} onChange={(e: any) => setPw(e.target.value)} className="w-11/12 sm:W-8/12 p-2 bg-gray-200 font-semibold rounded-lg mt-3" required placeholder='비밀번호를 입력하세요' type='password'/>
            <button className='w-11/12 sm:W-8/12 p-3 font-semibold bg-accent1 text-white hover:bg-blue-800 rounded-lg text-xl mt-2' type="submit">로그인</button>
          </form>
        </div>
      </Container>
    </div>
  )
}
