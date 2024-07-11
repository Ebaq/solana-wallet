'use client'

import { Connection, Keypair } from '@solana/web3.js'
import { useEffect, useState } from 'react'
import WalletInfo from '../components/WalletInfo'

const connection = new Connection('https://api.devnet.solana.com')

const WalletScreen = () => {
	const [wallet, setWallet] = useState<Keypair | null>(null)

	useEffect(() => {
		const storedWallet = localStorage.getItem('wallet')
		if (storedWallet) {
			setWallet(Keypair.fromSecretKey(new Uint8Array(JSON.parse(storedWallet))))
		}
	}, [])

	return (
		<div className='flex justify-center items-center h-full'>
			{wallet ? (
				<WalletInfo
					publicKey={wallet.publicKey.toString()}
					secretKey={wallet.secretKey.toString()}
				/>
			) : (
				<p className='text-xl font-medium text-center'>
					Для использования сервиса необходимо создать кошелек!
				</p>
			)}
		</div>
	)
}

export default WalletScreen
