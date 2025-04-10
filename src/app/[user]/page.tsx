import type { Metadata } from 'next'
import { isAddress, isHex } from 'viem'
import type { SearchParams } from 'next/dist/server/request/search-params'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { fetchProfileDetails, fetchProfileStats, isLinkValid } from 'ethereum-identity-kit/utils'

import { MINUTE } from '#/lib/constants'
import UserInfo from './components/user-info'
import { truncateAddress } from '#/lib/utilities'
import { fetchAccount } from '#/api/fetch-account'

interface Props {
  params: Promise<{ user: string }>
  searchParams: Promise<SearchParams>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const user = isAddress(params.user) ? params.user : params.user

  const searchParams = await props.searchParams
  const ssr = searchParams.ssr === 'false' ? false : true

  const truncatedUser = isAddress(params.user) ? (truncateAddress(params.user) as string) : params.user
  const isList = Number.isInteger(Number(user)) && !(isAddress(user) || isHex(user))

  const getAccount = async () => {
    try {
      if (ssr) {
        return await fetchAccount(user, isList ? Number(user) : undefined)
      }

      return null
    } catch (error) {
      return null
    }
  }

  const ensData = await getAccount()
  const ensName = ensData?.ens?.name
  const ensAvatar = ensData?.ens?.avatar
  const displayUser = ensName && ensName.length > 0 ? ensName : isList ? `List #${user}` : truncatedUser

  const avatarResponse = ensAvatar && isLinkValid(ensAvatar) ? await fetch(ensAvatar) : null

  const pageUrl = `https://efp.app/${user}`
  const ogImageUrl = `https://efp.app/og?user=${user}`

  return {
    metadataBase: new URL(pageUrl),
    title: `${displayUser}`,
    openGraph: {
      title: `${displayUser} | EFP`,
      siteName: `${displayUser} - EFP profile`,
      description: `${displayUser} - EFP profile`,
      url: pageUrl,
      images: [{ url: ogImageUrl }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${displayUser} | EFP`,
      description: `${displayUser} - EFP profile`,
      images: ogImageUrl,
    },
    icons: {
      icon: avatarResponse?.status === 200 ? ensAvatar : '/assets/favicon.ico', // replace with /assets/art/default-avatar.svg for a default avatar
    },
    appleWebApp: {
      capable: true,
      title: displayUser,
      startupImage: avatarResponse?.status === 200 ? ensAvatar : '/assets/apple-touch-icon.png', // replace with /assets/art/default-avatar.svg for a default avatar
    },
  }
}

const UserPage = async (props: Props) => {
  const { user } = await props.params
  const searchParams = await props.searchParams
  const ssr = searchParams.ssr === 'false' ? false : true

  const isList = Number.isInteger(Number(user)) && !(isAddress(user) || isHex(user))
  const listNum = isList ? Number(user) : undefined

  const queryClient = new QueryClient()

  // Skip prefetching if ssr is false
  if (ssr !== false) {
    await queryClient.prefetchQuery({
      queryKey: ['profile', user, false],
      queryFn: () => (user ? fetchProfileDetails(user as string, listNum) : null),
      staleTime: 3 * MINUTE,
    })

    await queryClient.prefetchQuery({
      queryKey: ['stats', user, false],
      queryFn: () => (user ? fetchProfileStats(user as string, listNum) : null),
      staleTime: 3 * MINUTE,
    })
  }

  return (
    <main className='h-screen w-full xl:overflow-hidden'>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UserInfo user={user} />
      </HydrationBoundary>
    </main>
  )
}

export default UserPage
