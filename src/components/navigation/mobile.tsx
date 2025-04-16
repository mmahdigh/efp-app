import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef } from 'react'

import { Search } from '../search'
import Logo from 'public/assets/efp-logo.svg'
import NavItems from './components/nav-items'
import WalletMenu from './components/wallet-menu'
import Integrations from './components/integrations'
import Notifications from './components/notifications'
import { useWindowSize } from '@uidotdev/usehooks'

let navScroll = 0
let navHomeScroll = 0
let navUserScroll = 0
let navLeaderboardScroll = 0

const Mobile: React.FC = () => {
  const pathname = usePathname()

  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!navRef.current) return

    navScroll = 0
    navHomeScroll = 0
    navUserScroll = 0
    navLeaderboardScroll = 0
    navRef.current.style.setProperty('top', '0px')

    const abortController = new AbortController()

    const handleScroll = (scroll: number, prevScroll: number) => {
      if (prevScroll - scroll > 0) {
        navRef.current?.style.setProperty('transition', 'all 0.21s linear')
        navRef.current?.style.setProperty('top', '0px')
        if (scroll < 16) navRef.current?.classList.remove('bg-neutral')
      } else {
        if (scroll > 84) {
          navRef.current?.style.setProperty('top', '-84px')
          navRef.current?.classList.add('bg-neutral')
        } else {
          navRef.current?.style.setProperty('transition', 'none')
          navRef.current?.style.setProperty('top', `-${scroll}px`)
          // navRef.current?.classList.remove('bg-neutral')
        }
      }
    }

    if (pathname === '/') {
      const homePage = document.getElementById('home-page')

      const handleHomeScroll = (e: Event) => {
        const scroll = (e.target as HTMLElement).scrollTop
        handleScroll(scroll, navHomeScroll)
        navHomeScroll = scroll
      }

      if (homePage) {
        homePage.addEventListener('scroll', handleHomeScroll, { signal: abortController.signal })
      }
    } else if (pathname === '/leaderboard') {
      const leaderboardPage = document.getElementById('leaderboard-page')

      const handleLeaderboardScroll = (e: Event) => {
        const scroll = (e.target as HTMLElement).scrollTop
        handleScroll(scroll, navLeaderboardScroll)
        navLeaderboardScroll = scroll
      }

      if (leaderboardPage) {
        leaderboardPage.addEventListener('scroll', handleLeaderboardScroll, { signal: abortController.signal })
      }
    } else if (pathname === '/swipe' || pathname === '/team' || pathname === '/integrations') {
      const handleWindowScroll = () => {
        const scroll = window.scrollY
        handleScroll(scroll, navScroll)
        navScroll = scroll
      }

      window.addEventListener('scroll', handleWindowScroll, { signal: abortController.signal })
    } else {
      const userPage = document.getElementById('user-page')

      const handleUserScroll = (e: Event) => {
        const scroll = (e.target as HTMLElement).scrollTop
        handleScroll(scroll, navUserScroll)
        navUserScroll = scroll
      }

      if (userPage) {
        userPage.addEventListener('scroll', handleUserScroll, { signal: abortController.signal })
      }
    }

    return () => abortController.abort()
  }, [navRef, pathname])

  const { width } = useWindowSize()
  if (width && width > 640) return null

  return (
    <>
      <div ref={navRef} className='fixed top-0 left-0 z-50 flex h-[76px] w-screen justify-between px-4 sm:hidden'>
        <div className='flex items-center gap-3'>
          <Link href='/' className='select-none' aria-label='Ethereum Follow Protocol'>
            <Logo className='w-7 translate-x-1 transition-transform select-none hover:scale-110 sm:w-8' />
          </Link>
          <Search />
        </div>
        <div className='flex items-center gap-3'>
          <Integrations />
          <Notifications />
          <WalletMenu />
        </div>
      </div>
      <nav className='bg-neutral shadow-large fixed bottom-0 left-0 z-50 flex w-full justify-center p-3 px-4 sm:hidden'>
        <NavItems />
      </nav>
    </>
  )
}

export default Mobile
