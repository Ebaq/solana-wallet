'use client'

import { Connection, Keypair } from '@solana/web3.js'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const connection = new Connection('https://api.devnet.solana.com')

const Header = () => {
	const [balance, setBalance] = useState<number>(0)
	const [walletExists, setWalletExists] = useState(false)
	const path = usePathname()

	useEffect(() => {
		const updateBalance = async () => {
			const storedWallet = localStorage.getItem('wallet')
			if (storedWallet) {
				const wallet = Keypair.fromSecretKey(
					new Uint8Array(JSON.parse(storedWallet))
				)
				const balance = await connection.getBalance(wallet.publicKey)
				setBalance(balance / 1000000000)
				setWalletExists(true)
			} else {
				setWalletExists(false)
			}
		}

		updateBalance()

		window.addEventListener('storage', updateBalance)
		return () => window.removeEventListener('storage', updateBalance)
	}, [])

	const createWallet = async () => {
		const newWallet = Keypair.generate()
		if (typeof window !== 'undefined') {
			localStorage.setItem(
				'wallet',
				JSON.stringify(Array.from(newWallet.secretKey))
			)
			window.location.reload()
		}
	}

	return (
		<header className='flex justify-between items-center p-4 bg-[#292929] h-[72px]'>
			{path == '/' ? (
				<Link href='/'>
					<h1 className='text-2xl font-bold cursor-pointer'>Solana Wallet</h1>
				</Link>
			) : (
				<Link
					href='/'
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all'
				>
					Назад
				</Link>
			)}

			<div>
				{walletExists && (
					<span className='text-white font-medium'>Баланс: {balance} SOL</span>
				)}

				{!walletExists && (
					<button
						onClick={createWallet}
						className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-all'
					>
						Создать кошелек
					</button>
				)}
			</div>
		</header>
	)
}

export default Header
