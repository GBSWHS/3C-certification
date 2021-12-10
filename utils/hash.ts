import { SHA3 } from 'sha3'
const hash = new SHA3(512)

const hashString = (str: string) => {
  hash.reset()
  hash.update(str)
  return hash.digest('hex')
}

export default hashString
