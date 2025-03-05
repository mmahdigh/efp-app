'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import QRCodeModal from '#/components/qr-code-modal'
import type { ProfileTabType } from '#/types/common'
import { useUserInfo } from '../hooks/use-user-info'
import ListSettings from '#/components/list-settings'
import BlockedMuted from '#/components/blocked-muted'
import { useIsEditView } from '#/hooks/use-is-edit-view'
import { useUserScroll } from '../hooks/use-user-scroll'
import UserProfileCard from '#/components/user-profile-card'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import UserProfilePageTable from '#/components/profile-page-table'
import UserProfile from '#/components/user-profile'
import BackToTop from '#/components/buttons/back-to-top'
import TopEightActivity from './top-eight-activity'

interface UserInfoProps {
  user: string
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const searchParams = useSearchParams()
  const initialQrCodeModalOpen = searchParams.get('modal') === 'qr_code'
  const initialBlockedOpen = searchParams.get('modal') === 'block_mute_list'
  const initialListSettingsOpen = searchParams.get('modal') === 'list_settings'
  const defaultParam = (searchParams.get('tab') as ProfileTabType) ?? 'following'

  const [isSaving, setIsSaving] = useState(false)
  const [listSettingsOpen, setListSettingsOpen] = useState(initialListSettingsOpen)
  const [qrCodeModalOpen, setQrCodeModalOpen] = useState(initialQrCodeModalOpen)
  const [isBlockedMutedOpen, setIsBlockedMutedOpen] = useState(initialBlockedOpen)
  const [activeTab, setActiveTab] = useState<ProfileTabType>(defaultParam)

  const {
    stats,
    qrCode,
    profile,
    listNum,
    followers,
    following,
    toggleTag,
    userIsList,
    profileList,
    followerTags,
    followersSort,
    followingSort,
    followingTags,
    refetchProfile,
    statsIsLoading,
    qrCodeIsLoading,
    profileIsLoading,
    isEndOfFollowing,
    isEndOfFollowers,
    setFollowingSort,
    setFollowersSort,
    setFollowersSearch,
    setFollowingSearch,
    followersIsLoading,
    followingIsLoading,
    fetchMoreFollowers,
    fetchMoreFollowing,
    followingTagsFilter,
    followersTagsFilter,
    followerTagsLoading,
    followingTagsLoading,
    isFetchingMoreFollowers,
    isFetchingMoreFollowing,
    setFollowersTagsFilter,
    setFollowingTagsFilter,
  } = useUserInfo(user)
  const router = useRouter()
  const isMyProfile = useIsEditView()
  const { roles, selectedList } = useEFPProfile()
  const { tableRef, TopEightRef, containerRef } = useUserScroll()

  useEffect(() => {
    if (searchParams.get('tab')) {
      setActiveTab(searchParams.get('tab') as ProfileTabType)
      if (searchParams.get('tags') === 'top8') {
        setFollowersTagsFilter(['top8'])
      }
    }
  }, [searchParams])

  const tableProps = {
    followers: {
      isLoading: followersIsLoading,
      results: followers,
      allTags: followerTags?.tagCounts,
      tagsLoading: followerTagsLoading,
      selectedTags: followersTagsFilter,
      toggleSelectedTags: toggleTag,
      setSelectedTags: setFollowersTagsFilter,
      sort: followersSort,
      setSort: setFollowersSort,
      isEndOfResults: isEndOfFollowers,
      setSearchFilter: setFollowersSearch,
      isFetchingMore: isFetchingMoreFollowers,
      fetchMore: () => fetchMoreFollowers(),
      title: 'followers' as ProfileTabType,
      canEditTags: false,
    },
    following: {
      isLoading: followingIsLoading,
      results: following,
      allTags: followingTags?.tagCounts,
      tagsLoading: followingTagsLoading,
      selectedTags: followingTagsFilter,
      toggleSelectedTags: toggleTag,
      setSelectedTags: setFollowingTagsFilter,
      sort: followingSort,
      setSort: setFollowingSort,
      isEndOfResults: isEndOfFollowing,
      setSearchFilter: setFollowingSearch,
      isFetchingMore: isFetchingMoreFollowing,
      fetchMore: () => fetchMoreFollowing(),
      title: 'following' as ProfileTabType,
      canEditTags: isMyProfile && roles?.isManager,
    },
  }

  const activeTableProps = tableProps[activeTab]

  useEffect(() => {
    const userPage = document.getElementById('user-page')
    if (userPage && userPage.scrollTop > (window.innerWidth > 1024 ? 300 : 750)) {
      userPage.scrollTo({ top: window.innerWidth > 1024 ? 300 : 750, behavior: 'instant' })
    }
  }, [activeTab, followersTagsFilter, followingTagsFilter, followersSort, followingSort])

  return (
    <>
      {qrCodeModalOpen && (
        <QRCodeModal
          onClose={() => {
            setQrCodeModalOpen(false)
            router.push(`/${user}`)
          }}
          isLoading={qrCodeIsLoading || !profile}
          qrCode={qrCode}
        />
      )}
      {isBlockedMutedOpen && (
        <BlockedMuted
          user={user}
          list={userIsList ? listNum : undefined}
          onClose={() => {
            setIsBlockedMutedOpen(false)
            router.push(`/${user}`)
          }}
          isManager={profileList === selectedList && roles?.isManager}
        />
      )}
      {listSettingsOpen && profile && profileList && (
        <ListSettings
          selectedList={profileList}
          isSaving={isSaving}
          profile={profile}
          setIsSaving={setIsSaving}
          onClose={() => {
            setListSettingsOpen(false)
            router.push(`/${user}`)
          }}
        />
      )}
      {!isSaving && (
        <div
          id='user-page'
          className='relative flex h-screen w-full flex-col gap-4 overflow-y-auto px-0 pb-32 sm:pr-0 sm:pb-8 sm:pl-[70px] lg:gap-0 2xl:pl-20'
          ref={containerRef}
        >
          <div className='mt-20 w-full sm:mt-0'>
            <Suspense>
              <UserProfileCard
                className='flex w-full md:hidden'
                profileList={profileList}
                stats={stats}
                profile={profile}
                refetchProfile={refetchProfile}
                isLoading={profileIsLoading}
                isStatsLoading={statsIsLoading}
                showMoreOptions={true}
                openBlockModal={() => {
                  setIsBlockedMutedOpen(true)
                  router.push(`/${user}?modal=block_mute_list&ssr=false`)
                }}
                openQrCodeModal={() => setQrCodeModalOpen(true)}
                openListSettingsModal={() => setListSettingsOpen(true)}
              />
              <UserProfile
                isMyProfile={isMyProfile}
                profileList={profileList}
                stats={stats}
                profile={profile}
                refetchProfile={refetchProfile}
                isLoading={profileIsLoading}
                isStatsLoading={statsIsLoading}
                openBlockModal={() => {
                  setIsBlockedMutedOpen(true)
                  router.push(`/${user}?modal=block_mute_list&ssr=false`)
                }}
                openQrCodeModal={() => setQrCodeModalOpen(true)}
                openListSettingsModal={() => setListSettingsOpen(true)}
              />
            </Suspense>
          </div>
          <div className='flex flex-col-reverse gap-4 px-4 md:-mt-28 lg:-mt-24 lg:flex-row xl:px-8'>
            <div className='h-fit w-full'>
              <UserProfilePageTable
                setActiveTab={(tab) => setActiveTab(tab as ProfileTabType)}
                ref={tableRef}
                {...activeTableProps}
              />
            </div>
            <div ref={TopEightRef} className='top-0 h-fit pb-4 lg:sticky'>
              <TopEightActivity
                user={user}
                isConnectedUserProfile={isMyProfile}
                followingListProps={tableProps.following}
              />
            </div>
          </div>
        </div>
      )}
      <BackToTop />
    </>
  )
}

export default UserInfo
