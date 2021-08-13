import dynamic from 'next/dynamic'
import Topbar from '../../components/Topbar'
import Link from 'next/link'
import 'suneditor/dist/css/suneditor.min.css'
import useSWR from 'swr'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import Head from '../../components/Head'
import { faArrowRight, faPenAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SetOptions from 'suneditor-react/dist/types/SetOptions'

const fetcher = (url: string) => fetch(url).then((res) => res.json())
const SunEditor = dynamic(() => import('suneditor-react'), {
  ssr: false
})

const TagList = ['문화역량', '기초역량', '봉사역량', '공동체역량', '실무역량']

const sunEditorOptions: SetOptions = {
  buttonList: [
    ['undo', 'redo', 'font', 'fontSize', 'formatBlock'],
    ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'removeFormat'],
    ['fontColor', 'hiliteColor', 'outdent', 'indent', 'align', 'horizontalRule', 'list', 'table'],
    ['link', 'image', 'video', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print']
  ],
  placeholder: '이곳을 눌러 작성을 시작하세요'
}

export default function NoticeEdit () {
  const router = useRouter()
  const [errorr, setError] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tag, setTag] = useState('')

  const id = router.query.id
  const { data, error } = useSWR('/api/lists?id=' + id, fetcher)
  if (!data) return <div>로딩중...</div>
  if (error) return <div>오류: {error}</div>
  if (!data.success) return <div>게시글을 찾을 수 없음</div>
  if (!title && !content) {
    setContent(data.posts.content)
    setTitle(data.posts.title)
    setTag(data.posts.tag)
  }
  console.log(data)
  async function onSubmit (ev: FormEvent) {
    ev.preventDefault()
    if (title.length < 5) return alert('제목은 5자 이상이여야 합니다.')
    if (content.length < 10) return alert('내용은 10자 이상이여야 합니다.')

    const res = await fetch('/api/lists', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title, content, tag, id
      })
    }).then((res) => res.json())

    if (!res.success) {
      setError(res.message)
      return
    }

    alert('성공적으로 글이 수정되었습니다.')
    router.push('/post/' + res.id)
  }

  return (
    <div className="w-screen">
      <Head subtitle="3C인증서 수정" />
      <Topbar />
      <div className="inline-block w-full align-top p-10">
        <div className="text-center">
          <h1 className="text-center text-4xl border-b-2 font-bold inline-block cursor-default p-2"><FontAwesomeIcon icon={faPenAlt}/> 3C인증서 수정</h1>
        </div>

        {errorr
          ? <div className="text-center m-3"><span className="text-red-500 px-5 py-3 bg-red-50 inline-block rounded-lg">{errorr}</span></div>
          : <></>}

        <div className="flex justify-center">
          <form onSubmit={onSubmit} className="mt-5 container">
            <input autoFocus type="text" defaultValue={data.posts.title} required className="mb-3 w-full border-2 p-3 focus:border-blue-300" maxLength={30} onChange={(ev) => setTitle(ev.target.value)} placeholder="이곳을 눌러 제목을 입력하세요"/>
            <SunEditor setOptions={sunEditorOptions} setDefaultStyle="font-family: 'Noto Sans CJK KR'; font-weight: 400;" defaultValue={data.posts.content} placeholder="이곳을 눌러 수정을 시작하세요" onChange={(v) => setContent(v)} height='400px' lang="ko"/>
            <div className="flex gap-3 flex-wrap mt-3">
              <select className="text-white bg-green-400 hover:bg-green-500 hover:text-white py-2 px-5 font-bold cursor-pointer">
                <option>{tag}</option>
                { TagList.map((m, i) => m === tag ? <></> : <option key={i} onClick={() => setTag(m)}>{m}</option>)}
              </select>
              <button type="submit" className="text-white bg-blue-400 hover:bg-blue-500 hover:text-white py-2 px-5 font-bold cursor-pointer"><FontAwesomeIcon icon={faPenAlt}/> 수정</button>
              <Link href="/" passHref><span className="text-gray-400 border-2 hover:border-0 hover:bg-gray-400 hover:text-white py-2 px-5 font-bold cursor-pointer"><FontAwesomeIcon icon={faArrowRight} /> 돌아가기</span></Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
