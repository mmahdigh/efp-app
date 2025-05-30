'use client'

import { useTheme } from 'next-themes'
import { useIsClient } from '@uidotdev/usehooks'
import { WagmiProvider, type State } from 'wagmi'
import { TransactionProvider } from 'ethereum-identity-kit'
import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import wagmiConfig from '#/lib/wagmi'
import { DAY, MINUTE } from '#/lib/constants'
import Navigation from '#/components/navigation'
import { SoundsProvider } from '#/contexts/sounds-context'
import TransactionModal from '#/components/transaction-modal'
import { EFPProfileProvider } from '#/contexts/efp-profile-context'
import { RecommendedProfilesProvider } from '#/contexts/recommended-profiles-context'
import { ThirdwebProvider } from 'thirdweb/react'

type ProviderProps = {
  children: React.ReactNode
  initialState?: State
}

const darkThemes = ['dark', 'halloween']

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { gcTime: 1 * DAY, staleTime: 5 * MINUTE },
  },
})

const Providers: React.FC<ProviderProps> = ({ children, initialState }) => {
  const isClient = useIsClient()
  const { resolvedTheme } = useTheme()

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig} initialState={initialState}>
        <RainbowKitProvider
          coolMode={false}
          theme={isClient && darkThemes.includes(resolvedTheme || 'dark') ? darkTheme() : undefined}
        >
          <ThirdwebProvider>
            <TransactionProvider batchTransactions={true}>
              <EFPProfileProvider>
                <SoundsProvider>
                  <RecommendedProfilesProvider>
                    <Navigation />
                    {children}
                    <TransactionModal />
                    <div id='modal-root' />
                  </RecommendedProfilesProvider>
                </SoundsProvider>
              </EFPProfileProvider>
            </TransactionProvider>
          </ThirdwebProvider>
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  )
}

export default Providers
