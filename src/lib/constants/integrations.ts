import type { StaticImageData } from 'next/image'

import Payflow from 'public/assets/partners/payflow.jpeg'
import WebHash from 'public/assets/partners/webhash.jpeg'
import EthDotCd from 'public/assets/partners/ethdotcd.jpeg'
import Interface from 'public/assets/partners/interface.jpeg'
import LikeButton from 'public/assets/partners/likebutton.jpeg'

export const INTEGRATIONS = [
  {
    name: 'Interface',
    url: 'https://interface.social',
    logo: Interface
  },
  {
    name: 'LikeButton.eth',
    url: 'https://likebutton.eth.limo/',
    logo: LikeButton
  },
  {
    name: 'Webhash',
    url: 'https://webhash.com',
    logo: WebHash
  },
  {
    name: 'Payflow',
    url: 'https://payflow.me',
    logo: Payflow
  },
  {
    name: 'eth.cd',
    url: 'https://eth.cd',
    logo: EthDotCd
  }
] as {
  name: string
  url: string
  logo: string | StaticImageData
}[]
