import { SolanaWeb3 } from '@solana/web3.js'

export interface Window {
	solana?: SolanaWeb3 & {
		isPhantom: boolean
		connect: () => Promise<void>
		disconnect: () => Promise<void>
		_handleConnect: () => Promise<void>
		on: (event: 'connect' | 'disconnect', handler: (args: any) => void) => void
	}
}
