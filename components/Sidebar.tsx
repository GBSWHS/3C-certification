import style from '../styles/sidebar.module.css'

export default function Sidebar () {
  return (
    <nav id="sidebar" className={style.sidebar}>
      <ul className="p-10">
        <li className="pb-3 font-bold text-2xl">카테고리</li>
        <li className="my-4 p-3 cursor-pointer rounded-lg bg-accent1">#3C인증제</li>
        <li className="my-4 p-3 cursor-pointer rounded-lg bg-accent1">#문화역량</li>
        <li className="my-4 p-3 cursor-pointer rounded-lg bg-accent1">#기초역량</li>
        <li className="my-4 p-3 cursor-pointer rounded-lg bg-accent1">#도전역량</li>
        <li className="my-4 p-3 cursor-pointer rounded-lg bg-accent1">#봉사역량</li>
        <li className="my-4 p-3 cursor-pointer rounded-lg bg-accent1">#공동체역량</li>
        <li className="my-4 p-3 cursor-pointer rounded-lg bg-accent1">#실무역량</li>
      </ul>
    </nav>
  )
}
