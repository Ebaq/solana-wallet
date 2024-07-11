'use client'

import {
	Connection,
	Keypair,
	PublicKey,
	SystemProgram,
	Transaction,
} from '@solana/web3.js'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const connection = new Connection('https://api.devnet.solana.com')

const TransactionScreen = () => {
	const router = useRouter()
	const [amount, setAmount] = useState<number>(0)
	const [recipient, setRecipient] = useState<string>('')

	useEffect(() => {
		const storedWallet = localStorage.getItem('wallet')
		if (!storedWallet) {
			router.replace('/')
		}
	}, [])

	const sendTransaction = async () => {
		try {
			if (amount <= 0) {
				throw new Error('Некорректная сумма')
			}

			if (!recipient) {
				throw new Error('Необходим адрес получателя')
			}

			const wallet = Keypair.fromSecretKey(
				new Uint8Array(JSON.parse(localStorage.getItem('wallet')!))
			)

			const transaction = new Transaction().add(
				SystemProgram.transfer({
					fromPubkey: wallet.publicKey,
					toPubkey: new PublicKey(recipient),
					lamports: amount * 1000000000,
				})
			)

			if (typeof window !== 'undefined' && 'solana' in window) {
				const provider = window.solana as any

				if (provider.isPhantom) {
					transaction.feePayer = wallet.publicKey
					const recentBlockhash = await connection.getLatestBlockhash()
					transaction.recentBlockhash = recentBlockhash.blockhash

					const signed = await provider.signTransaction(transaction)
					const signature = await connection.sendRawTransaction(
						signed.serialize()
					)

					console.log('Transaction signature:', signature)
					setAmount(0)
					setRecipient('')
				}
			}
		} catch (error) {
			console.error('Ошибка при отправке транзакции:', error)
		}
	}

	return (
		<div className='flex flex-col items-center justify-center h-full gap-5'>
			<h2 className='text-xl font-bold'>Отправить SOL</h2>
			<div className='flex flex-col gap-2 w-full'>
				<input
					type='number'
					placeholder='Количество SOL'
					className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					value={amount}
					onChange={e => setAmount(parseFloat(e.target.value))}
				/>
				<input
					type='text'
					placeholder='Адрес получателя'
					className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					value={recipient}
					onChange={e => setRecipient(e.target.value)}
				/>
			</div>
			<button
				onClick={sendTransaction}
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
			>
				Отправить
			</button>
		</div>
	)
}

export default TransactionScreen
