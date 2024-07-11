'use client'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'

interface WalletInfoProps {
	publicKey: string
	secretKey: string
}

const WalletInfo: FC<WalletInfoProps> = ({ publicKey, secretKey }) => {
	const [showSecret, setShowSecret] = useState<boolean>(false)
	const [isCopied, setIsCopied] = useState<boolean>(false)
	const router = useRouter()

	return (
		<div className='flex flex-col w-full gap-16'>
			<div className='flex flex-col gap-4 w-full'>
				<div className='flex flex-col gap-4'>
					<div className='flex flex-col gap-4'>
						<span className='font-bold'>Адрес:</span>
						<div
							onClick={() => {
								navigator.clipboard.writeText(publicKey)
								setIsCopied(true)
								setTimeout(() => {
									setIsCopied(false)
								}, 600)
							}}
							className={`text-wrap break-words border-[1px] border-white rounded-xl p-4 cursor-pointer ${
								isCopied && 'bg-white'
							} transition-all duration-200 relative`}
						>
							<span
								className={`${
									isCopied ? 'opacity-0' : 'opacity-100'
								} transition-all duration-200`}
							>
								{publicKey}
							</span>
							<span
								className={`absolute left-1/2 top-1/2 text-black ${
									isCopied ? 'opacity-100' : 'opacity-0'
								} -translate-x-1/2 -translate-y-1/2 transition-all duration-200`}
							>
								Скопировано!
							</span>
						</div>
						<button
							onClick={() => {
								navigator.clipboard.writeText(publicKey)
								setIsCopied(true)
								setTimeout(() => {
									setIsCopied(false)
								}, 600)
							}}
							className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition-all w-fit'
						>
							Копировать
						</button>
					</div>
					<div className='flex flex-col gap-2'>
						<span className='font-bold'>Приватный ключ:</span>
						{showSecret ? (
							<span className='text-wrap break-words'>{secretKey}</span>
						) : (
							<span>********************</span>
						)}
					</div>
				</div>
				<div className='flex flex-col gap-4 sm:flex-row'>
					<button
						onClick={() => setShowSecret(!showSecret)}
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all w-full sm:w-[50%]'
					>
						{showSecret ? 'Скрыть' : 'Показать'}
					</button>
					{showSecret && (
						<button
							onClick={() => {
								navigator.clipboard.writeText(secretKey)
							}}
							className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition-all w-full sm:w-[50%]'
						>
							Копировать
						</button>
					)}
				</div>
			</div>
			<button
				className='bg-[#7bc095] hover:bg-[#6ba782] text-black font-bold py-2 px-4 rounded transition-all w-full'
				onClick={() => {
					router.push('/transaction')
				}}
			>
				Перевести SOL
			</button>
		</div>
	)
}

export default WalletInfo
