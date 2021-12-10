import { NextPage } from 'next'

const Container: NextPage = ({ children }) => {
  return (
    <div className="w-screen overflow-y-auto p-6" style={{ maxHeight: '80vh' }}>
      {children}
    </div>
  )
}

export default Container
