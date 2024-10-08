"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import useUser from "../hooks/useUser";
import TopEight from "#/components/top-eight";
import type { ProfileTabType } from "#/types/common";
import ListSettings from "#/components/list-settings";
import BlockedMuted from "#/components/blocked-muted";
import { useIsEditView } from "#/hooks/use-is-edit-view";
import UserProfileCard from "#/components/user-profile-card";
import { useEFPProfile } from "#/contexts/efp-profile-context";
import type { ProfileDetailsResponse } from "#/types/requests";
import UserProfilePageTable from "#/components/profile-page-table";

interface UserInfoProps {
  user: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const searchParams = useSearchParams();
  const initialBlockedOpen = searchParams.get("modal") === "blockmutelists";
  const defaultParam = (searchParams.get("tab") as ProfileTabType) ?? "following";

  const [isSaving, setIsSaving] = useState(false);
  const [listSettingsOpen, setListSettingsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ProfileTabType>(defaultParam);
  const [isBlockedMutedOpen, setIsBlockedMutedOpen] = useState(initialBlockedOpen);

  const router = useRouter();
  const pathname = usePathname();

  const isLoadPage = pathname === "/loading";

  const {
    roles,
    stats: profileStats,
    profile: profileProfile,
    selectedList,
    following: profileFollowing,
    followers: profileFollowers,
    toggleTag: profileToggleTag,
    followerTags: profileFollowerTags,
    followingSort: profileFollowingSort,
    followersSort: profileFollowersSort,
    followingTags: profileFollowingTags,
    isEndOfFollowers: profileIsEndOfFollowers,
    isEndOfFollowing: profileIsEndOfFollowing,
    statsIsLoading: profileStatsIsLoading,
    profileIsLoading: profileProfileIsLoading,
    setFollowersSort: profileSetFollowersSort,
    setFollowingSort: profileSetFollowingSort,
    setFollowersSearch: profileSetFollowersSearch,
    setFollowingSearch: profileSetFollowingSearch,
    followingIsLoading: profileFollowingIsLoading,
    followersIsLoading: profileFollowersIsLoading,
    fetchMoreFollowers: profileFetchMoreFollowers,
    fetchMoreFollowing: profileFetchMoreFollowing,
    followingTagsFilter: profileFollowingTagsFilter,
    followersTagsFilter: profileFollowersTagsFilter,
    followerTagsLoading: profileFollowerTagsLoading,
    followingTagsLoading: profileFollowingTagsLoading,
    setFollowingTagsFilter: profileSetFollowingTagsFilter,
    setFollowersTagsFilter: profileSetFollowersTagsFilter,
    isFetchingMoreFollowers: profileIsFetchingMoreFollowers,
    isFetchingMoreFollowing: profileIsFetchingMoreFollowing,
  } = useEFPProfile();

  const isMyProfile = useIsEditView();

  const {
    listNum,
    stats: userStats,
    profile: userProfile,
    followers: userFollowers,
    following: userFollowing,
    toggleTag: userToggleTag,
    userIsList,
    followerTags: userFollowerTags,
    followersSort: userFollowerSort,
    followingSort: userFollowingSort,
    followingTags: userFollowingTags,
    profileIsLoading: userProfileIsLoading,
    isEndOfFollowing: userIsEndOfFollowing,
    isEndOfFollowers: userIsEndOfFollowers,
    setFollowingSort: userSetFollowingSort,
    setFollowersSort: userSetFollowerSort,
    setFollowersSearch: userSetFollowersSearch,
    setFollowingSearch: userSetFollowingSearch,
    statsIsLoading: userStatsIsLoading,
    followersIsLoading: userFollowersIsLoading,
    followingIsLoading: userFollowingIsLoading,
    fetchMoreFollowers: userFetchMoreFollowers,
    fetchMoreFollowing: userFetchMoreFollowing,
    followingTagsFilter: userFollowingTagsFilter,
    followersTagsFilter: userFollowersTagsFilter,
    followerTagsLoading: userFollowerTagsLoading,
    followingTagsLoading: userFollowingTagsLoading,
    isFetchingMoreFollowers: userIsFetchingMoreFollowers,
    isFetchingMoreFollowing: userIsFetchingMoreFollowing,
    setFollowersTagsFilter: userSetFollowersTagsFilter,
    setFollowingTagsFilter: userSetFollowingTagsFilter,
  } = useUser(user);

  const stats = isMyProfile ? profileStats : userStats;
  const statsIsLoading = isLoadPage || (isMyProfile ? profileStatsIsLoading : userStatsIsLoading);
  const profile: ProfileDetailsResponse | null | undefined = isMyProfile
    ? profileProfile
    : userProfile;
  const profileIsLoading =
    isLoadPage || (isMyProfile ? profileProfileIsLoading : userProfileIsLoading);
  const following = isMyProfile ? profileFollowing : userFollowing;
  const followers = isMyProfile ? profileFollowers : userFollowers;
  const followingTags = isMyProfile ? profileFollowingTags : userFollowingTags;
  const followingTagsLoading =
    isLoadPage || (isMyProfile ? profileFollowingTagsLoading : userFollowingTagsLoading);
  const followingTagsFilter = isMyProfile ? profileFollowingTagsFilter : userFollowingTagsFilter;
  const followersTagsFilter = isMyProfile ? profileFollowersTagsFilter : userFollowersTagsFilter;
  const toggleTag = isMyProfile ? profileToggleTag : userToggleTag;
  const followersSort = isMyProfile ? profileFollowersSort : userFollowerSort;
  const followingSort = isMyProfile ? profileFollowingSort : userFollowingSort;
  const setFollowersSort = isMyProfile ? profileSetFollowersSort : userSetFollowerSort;
  const setFollowingSort = isMyProfile ? profileSetFollowingSort : userSetFollowingSort;
  const setFollowingSearch = isMyProfile ? profileSetFollowingSearch : userSetFollowingSearch;
  const setFollowersSearch = isMyProfile ? profileSetFollowersSearch : userSetFollowersSearch;
  const followingIsLoading =
    isLoadPage || (isMyProfile ? profileFollowingIsLoading : userFollowingIsLoading);
  const followersIsLoading =
    isLoadPage || (isMyProfile ? profileFollowersIsLoading : userFollowersIsLoading);
  const fetchMoreFollowers = isMyProfile ? profileFetchMoreFollowers : userFetchMoreFollowers;
  const fetchMoreFollowing = isMyProfile ? profileFetchMoreFollowing : userFetchMoreFollowing;
  const isEndOfFollowers = isMyProfile ? profileIsEndOfFollowers : userIsEndOfFollowers;
  const isEndOfFollowing = isMyProfile ? profileIsEndOfFollowing : userIsEndOfFollowing;
  const followerTagsLoading =
    isLoadPage || (isMyProfile ? profileFollowerTagsLoading : userFollowerTagsLoading);
  const followerTags = isMyProfile ? profileFollowerTags : userFollowerTags;
  const setFollowingTagsFilter = isMyProfile
    ? profileSetFollowingTagsFilter
    : userSetFollowingTagsFilter;
  const setFollowersTagsFilter = isMyProfile
    ? profileSetFollowersTagsFilter
    : userSetFollowersTagsFilter;
  const isFetchingMoreFollowers = isMyProfile
    ? profileIsFetchingMoreFollowers
    : userIsFetchingMoreFollowers;
  const isFetchingMoreFollowing = isMyProfile
    ? profileIsFetchingMoreFollowing
    : userIsFetchingMoreFollowing;

  const titleRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (titleRef.current && !!searchParams.get("tab")) {
      titleRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveTab(searchParams.get("tab") as ProfileTabType);
    }
  }, [searchParams]);

  const tableRef = useRef<HTMLDivElement>(null);
  const TopEightRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const ProfileCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (tableRef.current) {
        // Adjust the scroll position of the div
        tableRef.current.scrollTop += event.deltaY;
        tableRef.current.scrollLeft += event.deltaX;
      }

      if (containerRef.current) {
        // Adjust the scroll position of the div
        containerRef.current.scrollTop += event.deltaY;
        containerRef.current.scrollLeft += event.deltaX;
      }

      if (TopEightRef.current) {
        const topEightHeight = TopEightRef.current.scrollHeight;
        const topEightOverflow = window.innerHeight - topEightHeight - 160;
        TopEightRef.current.style.top = `${topEightOverflow >= 0 ? 0 : topEightOverflow}px`;
      }

      if (ProfileCardRef.current) {
        const profileCardHeight = ProfileCardRef.current.scrollHeight + 65;
        const profileCardOverflow = window.innerHeight - profileCardHeight - 100;
        ProfileCardRef.current.style.top = `${
          profileCardOverflow >= 0 ? 0 : profileCardOverflow
        }px`;
      }
    };

    // Attach the wheel event listener to the window
    window.addEventListener(
      "wheel",
      (e) => {
        handleWheel(e);
      },
      { passive: false }
    );

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("wheel", (e) => {
        handleWheel(e);
      });
    };
  }, []);

  const mobileActiveEl = {
    following: (
      <UserProfilePageTable
        setActiveTab={(tab) => setActiveTab(tab as ProfileTabType)}
        ref={tableRef}
        key={"following"}
        isLoading={followingIsLoading}
        results={following}
        allTags={followingTags?.tagCounts}
        tagsLoading={followingTagsLoading}
        selectedTags={followingTagsFilter}
        toggleSelectedTags={toggleTag}
        setSelectedTags={setFollowingTagsFilter}
        sort={followingSort}
        setSort={setFollowingSort}
        isEndOfResults={isEndOfFollowing}
        setSearchFilter={setFollowingSearch}
        isFetchingMore={isFetchingMoreFollowing}
        fetchMore={() => fetchMoreFollowing()}
        title="following"
        canEditTags={
          Number(userIsList ? listNum : profile?.primary_list) === selectedList && roles?.isManager
        }
        // customClass="border-t-0 rounded-t-none"
      />
    ),
    followers: (
      <UserProfilePageTable
        setActiveTab={(tab) => setActiveTab(tab as ProfileTabType)}
        ref={tableRef}
        key={"followers"}
        isLoading={followersIsLoading}
        results={followers}
        allTags={followerTags?.tagCounts}
        tagsLoading={followerTagsLoading}
        selectedTags={followersTagsFilter}
        setSelectedTags={setFollowersTagsFilter}
        toggleSelectedTags={toggleTag}
        sort={followersSort}
        setSort={setFollowersSort}
        setSearchFilter={setFollowersSearch}
        isEndOfResults={isEndOfFollowers}
        isFetchingMore={isFetchingMoreFollowers}
        fetchMore={() => fetchMoreFollowers()}
        title="followers"
        // customClass="border-t-0 rounded-t-none"
      />
    ),
  }[activeTab];

  return (
    <>
      {isBlockedMutedOpen && (
        <BlockedMuted
          user={user}
          list={userIsList ? listNum : undefined}
          onClose={() => {
            setIsBlockedMutedOpen(false);
            router.push(`/${user}`);
          }}
          isManager={
            Number(userIsList ? listNum : profile?.primary_list) === selectedList &&
            roles?.isManager
          }
        />
      )}
      {listSettingsOpen && profile && (userIsList ? listNum : profile.primary_list) && (
        <ListSettings
          // @ts-ignore
          selectedList={
            userIsList
              ? (listNum as number)
              : profile?.primary_list
              ? Number(profile?.primary_list)
              : undefined
          }
          isSaving={isSaving}
          profile={profile}
          setIsSaving={setIsSaving}
          onClose={() => setListSettingsOpen(false)}
        />
      )}
      {!isSaving && (
        <div
          className="flex relative h-screen pt-40 overflow-y-auto justify-center gap-4 w-full"
          ref={containerRef}
          // onScroll={(e) => {
          //   onScrollTopEight(e.currentTarget.scrollTop);
          //   onScrollProfileCard(e);
          //   console.log(e.currentTarget.scrollTop);
          // }}
        >
          <div
            ref={ProfileCardRef}
            className="sticky h-fit pb-4"
            style={{
              top: "0px",
            }}
          >
            <UserProfileCard
              profileList={
                userIsList
                  ? listNum
                  : profile?.primary_list
                  ? Number(profile?.primary_list)
                  : undefined
              }
              stats={stats}
              profile={profile}
              isLoading={profileIsLoading}
              isStatsLoading={statsIsLoading}
              showMoreOptions={true}
              openBlockModal={() => {
                setIsBlockedMutedOpen(true);
                router.push(`/${user}?modal=blockmutelists`);
              }}
              openListSettingsModal={() => setListSettingsOpen(true)}
            />
          </div>
          <div
            ref={titleRef}
            className="w-full xl:max-w-[800px] sticky top-0 h-fit"
            style={{
              scrollMarginTop: "100px",
            }}
          >
            {/* <div className="w-full top-0 xl:hidden sticky left-0 flex z-40 justify-between">
              {PROFILE_TABS.map((option) => (
                <button
                  key={option}
                  onClick={() => setActiveTab(option)}
                  className={cn(
                    "w-1/2 capitalize text-lg py-2 font-bold glass-selector border-[3px] border-grey rounded-t-xl",
                    activeTab === option ? "border-b-0" : "bg-grey/80 text-text/50"
                  )}
                >
                  {t(option)}
                </button>
              ))}
            </div> */}
            {mobileActiveEl}
          </div>
          <div
            ref={TopEightRef}
            className="sticky pb-4 h-fit"
            style={{
              top: "0px",
            }}
          >
            <TopEight user={user} isConnectedUserProfile={isMyProfile} />
          </div>
        </div>
      )}
    </>
  );
};

export default UserInfo;
