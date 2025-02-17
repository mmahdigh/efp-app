import type { Address } from 'viem'
import { useTranslation } from 'react-i18next'

import { cn } from '#/lib/utilities'
import EditModal from './components/edit-modal'
import LoadingCell from '../loaders/loading-cell'
import { useTopEight } from './hooks/use-top-eight'
import TopEightProfile from './components/top-eight-profile'
import Edit from 'public/assets/icons/ui/edit.svg'
import ArrowDown from 'public/assets/icons/ui/arrow-down.svg'
import type { UserProfilePageTableProps } from '../profile-page-table'

interface TopEightProps {
  user: Address | string
  isConnectedUserProfile?: boolean
  followingListProps: UserProfilePageTableProps
}

const TopEight: React.FC<TopEightProps> = ({ user, isConnectedUserProfile, followingListProps }) => {
  const {
    topEight,
    displayLimit,
    editModalOpen,
    setDisplayLimit,
    setEditModalOpen,
    topEightIsLoading,
    topEightIsRefetching,
  } = useTopEight(user)
  const { t } = useTranslation()

  const isTopEightLoading = topEightIsLoading || topEightIsRefetching
  const isTopEightEmpty = topEight.length === 0 && !isTopEightLoading

  return (
    <>
      {isConnectedUserProfile && editModalOpen && (
        <EditModal
          profiles={topEight || []}
          onClose={() => setEditModalOpen(false)}
          followingListProps={followingListProps}
        />
      )}
      <div className='flex w-full flex-col items-center justify-center gap-4 rounded-sm lg:w-80 lg:gap-4 xl:w-[602px]'>
        <div className='bg-neutral shadow-medium flex w-full items-center justify-between rounded-sm p-4'>
          <h3 className='text-xl font-bold'>{t('top eight title')}</h3>
          {isConnectedUserProfile && (
            <button onClick={() => setEditModalOpen(true)} className='transition-all hover:scale-110'>
              <Edit className='h-5 w-5' />
            </button>
          )}
        </div>
        {isTopEightEmpty && (
          <p className='bg-neutral shadow-medium w-full rounded-sm py-20 text-center text-lg font-medium italic'>
            {t('no top eight')}
          </p>
        )}
        <div className='flex w-full flex-wrap items-start justify-start gap-2 transition-none'>
          {!isTopEightLoading &&
            topEight.slice(0, displayLimit).map((profile, index) => <TopEightProfile profile={profile} key={index} />)}
          {new Array(isTopEightLoading ? displayLimit : 0).fill(0).map((_, index) => (
            <div
              key={index}
              className='bg-neutral shadow-small flex w-28 flex-col items-center gap-2 px-0 py-4 lg:w-[128px] xl:w-36'
            >
              <LoadingCell className='h-[50px] w-[50px] rounded-full' />
              <LoadingCell className='h-7 w-24 rounded-sm' />
              <LoadingCell className='h-9 w-[110px] rounded-sm xl:h-10 xl:w-[120px]' />
            </div>
          ))}
        </div>
        {topEight.length > displayLimit && (
          <div
            className='text-text/80 flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm border-[3px] p-2 text-2xl font-semibold lg:hidden'
            onClick={() => setDisplayLimit(displayLimit >= 8 ? 2 : 8)}
          >
            <ArrowDown className={cn('transition-transform', displayLimit >= 8 && 'rotate-180')} />
          </div>
        )}
      </div>
    </>
  )
}

export default TopEight
