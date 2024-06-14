import type { Address } from '#/lib/types.ts'
import { baseSepolia, optimismSepolia } from 'viem/chains'

export const coreEfpContracts: {
  EFPAccountMetadata: Address
  EFPListRegistry: Address
  EFPListRecords: Address
  EFPListMinter: Address
} = {
  EFPAccountMetadata: process.env['NEXT_PUBLIC_EFP_ACCOUNT_METADATA'] as Address,
  EFPListRegistry: process.env['NEXT_PUBLIC_EFP_LIST_REGISTRY'] as Address,
  EFPListRecords: process.env['NEXT_PUBLIC_EFP_LIST_RECORDS'] as Address,
  EFPListMinter: process.env['NEXT_PUBLIC_EFP_LIST_MINTER'] as Address
}

export const ListRecordContracts: Record<number, Address> = {
  [baseSepolia.id]: process.env['NEXT_PUBLIC_EFP_LIST_RECORDS'] as Address,
  [optimismSepolia.id]: process.env['NEXT_PUBLIC_EFP_LIST_RECORDS_OP_SEPOLIA'] as Address
}
