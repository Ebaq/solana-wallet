import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '../components/Header'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Solana Wallet',
	description: 'Simple Solana Wallet',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body
				className={`${inter.className} h-screen w-screen overflow-hidden flex flex-col`}
			>
				<Header />
				<main className='h-full px-12 flex items-center justify-center'>
					<div className='h-full w-full max-w-[500px]'>{children}</div>
				</main>
			</body>
		</html>
	)
}
