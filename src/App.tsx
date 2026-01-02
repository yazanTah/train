import { clsx, type ClassValue } from "clsx"
import { AnimatePresence, motion } from "framer-motion"
import {
	CheckCircle,
	ChevronRight,
	Dumbbell,
	Flame,
	Target,
	TrendingUp,
	Trophy,
	User,
	Zap,
} from "lucide-react"
import { useState } from "react"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

type DailyGoalKey = "steps" | "neck" | "forearms" | "water"

interface UserStats {
	weight: number
	reps: number
	exp: number
	rank: string
	dailyGoals: Record<DailyGoalKey, boolean>
}

const App = () => {
	const [userStats, setUserStats] = useState<UserStats>({
		weight: 81,
		reps: 0,
		exp: 0,
		rank: "ASPIRANT",
		dailyGoals: {
			steps: false,
			neck: false,
			forearms: false,
			water: false,
		},
	})

	const [currentCycle, setCurrentCycle] = useState(0)
	const [isSyncing, setIsSyncing] = useState(false)
	const [completedExercises, setCompletedExercises] = useState<number[]>([])

	const protocol = [
		{
			title: "UPPER BODY: V-TAPER",
			desc: "Priority: Wide Lats & Boulder Shoulders",
			accent: "from-amber-500 to-orange-600",
			exercises: [
				{
					name: "Cluster Pull-ups",
					target: "2+1+1 (Total 10 reps)",
					logic: "Rest 10s between clusters",
				},
				{
					name: "Slow Negatives",
					target: "3 Sets x 5 Reps",
					logic: "5-second descent",
				},
				{
					name: "Pike Push-ups",
					target: "4 Sets x 10 Reps",
					logic: "Feet on chair for height",
				},
				{
					name: "Diamond Push-ups",
					target: "3 Sets x Max",
					logic: "Hands touch for triceps",
				},
			],
		},
		{
			title: "LOWER BODY: POWER",
			desc: "Priority: Explosive Quads & Agility",
			accent: "from-blue-500 to-indigo-600",
			exercises: [
				{
					name: "Bulgarian Split Squats",
					target: "4 Sets x 10/leg",
					logic: "One foot on chair/bed",
				},
				{
					name: "Jump Squats",
					target: "3 Sets x 12 Reps",
					logic: "Maximum vertical power",
				},
				{
					name: "Dragon Flags",
					target: "3 Sets x 5 Reps",
					logic: "Hold bed frame, keep body straight",
				},
				{
					name: "Calf Raises",
					target: "4 Sets x 20 Reps",
					logic: "Elevated on a step",
				},
			],
		},
		{
			title: "LOWER BODY: CORE & POSTURE",
			desc: "Priority: Ab Density & Spine Alignment",
			accent: "from-emerald-500 to-teal-600",
			exercises: [
				{
					name: "Wall Sits",
					target: "3 Sets x 60s",
					logic: "Keep back flat against wall",
				},
				{
					name: "Doorway Facepulls",
					target: "4 Sets x 15 Reps",
					logic: "Pull chest through door frame",
				},
				{
					name: "Leg Raises",
					target: "3 Sets x 15 Reps",
					logic: "Squeeze abs at bottom",
				},
				{
					name: "Wall Slides",
					target: "2 Min Total",
					logic: "Fixes 'Developer Hunch'",
				},
			],
		},
	]

	const handleComplete = () => {
		if (completedExercises.length < protocol[currentCycle].exercises.length) {
			setCompletedExercises(protocol[currentCycle].exercises.map((_, i) => i))
		}

		setIsSyncing(true)
		setTimeout(() => {
			setUserStats(prev => ({
				...prev,
				exp: prev.exp + 150,
				reps: prev.reps + 50,
			}))
			setCurrentCycle((currentCycle + 1) % 3)
			setCompletedExercises([])
			setIsSyncing(false)
		}, 1500)
	}

	const toggleExercise = (index: number) => {
		setCompletedExercises(prev =>
			prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index],
		)
	}

	const toggleGoal = (goal: DailyGoalKey) => {
		setUserStats(prev => ({
			...prev,
			dailyGoals: { ...prev.dailyGoals, [goal]: !prev.dailyGoals[goal] },
		}))
	}

	return (
		<div className="min-h-screen bg-stone-950 text-stone-200 font-sans selection:bg-amber-500/30">
			{/* Background Glow */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none">
				<div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-amber-500/10 blur-[120px] rounded-full" />
				<div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-orange-600/5 blur-[100px] rounded-full" />
			</div>

			<div className="relative z-10 max-w-lg mx-auto px-6 pt-8 pb-32">
				{/* Header */}
				<motion.header
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					className="flex justify-between items-center mb-10"
				>
					<div>
						<h1 className="text-4xl font-black italic tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-orange-600 uppercase leading-none">
							Übermensch
						</h1>
						<div className="flex items-center gap-2 mt-1">
							<span className="h-px w-4 bg-stone-700" />
							<p className="text-[10px] font-bold tracking-[0.4em] text-stone-500 uppercase">
								Protocol v2.1
							</p>
						</div>
					</div>
					<div className="bg-stone-900/50 backdrop-blur-md border border-stone-800/50 rounded-2xl p-3 text-right">
						<p className="text-[9px] font-bold text-stone-500 uppercase tracking-wider">
							Weight
						</p>
						<p className="text-xl font-black text-white leading-none">
							{userStats.weight}
							<span className="text-xs text-stone-500 ml-0.5">kg</span>
						</p>
					</div>
				</motion.header>

				<div className="space-y-8">
					{/* Rank Card */}
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.1 }}
						className="relative group"
					>
						<div className="absolute -inset-0.5 bg-linear-to-r from-amber-500/20 to-orange-600/20 rounded-4xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
						<div className="relative bg-stone-900 border border-stone-800/50 rounded-4xl p-8 overflow-hidden">
							<div className="absolute top-0 right-0 p-6 opacity-[0.03] -rotate-12 group-hover:rotate-0 transition-transform duration-700">
								<Trophy size={120} />
							</div>

							<div className="flex items-center gap-2 mb-2">
								<Zap size={14} className="text-amber-500 fill-amber-500" />
								<p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em]">
									Current Standing
								</p>
							</div>

							<h2 className="text-3xl font-black italic mb-6 tracking-tight">
								{userStats.rank}
							</h2>

							<div className="space-y-3">
								<div className="flex justify-between items-end">
									<p className="text-xs font-bold text-stone-400">
										Progress to Initiate
									</p>
									<p className="text-xs font-black text-white">
										{userStats.exp}{" "}
										<span className="text-stone-500 font-bold">/ 1000 EXP</span>
									</p>
								</div>
								<div className="w-full bg-stone-800/50 h-2.5 rounded-full overflow-hidden p-0.5 border border-stone-700/30">
									<motion.div
										initial={{ width: 0 }}
										animate={{ width: `${(userStats.exp / 1000) * 100}%` }}
										className="bg-linear-to-r from-amber-500 to-orange-600 h-full rounded-full shadow-[0_0_15px_rgba(245,158,11,0.4)]"
									/>
								</div>
							</div>
						</div>
					</motion.div>

					{/* Current Workout */}
					<div className="space-y-5">
						<div className="flex justify-between items-center px-2">
							<div className="flex items-center gap-2">
								<Target size={16} className="text-stone-500" />
								<h3 className="text-xs font-black uppercase tracking-widest text-stone-400">
									Today's Mission
								</h3>
							</div>
							<span className="text-[10px] bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full border border-amber-500/20 font-black tracking-tighter">
								CYCLE DAY {currentCycle + 1}
							</span>
						</div>

						<AnimatePresence mode="wait">
							<motion.div
								key={currentCycle}
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -20 }}
								className="bg-stone-900 border border-stone-800/50 rounded-4xl p-6 shadow-2xl"
							>
								<div className="mb-8">
									<h4 className="text-2xl font-black italic mb-1 tracking-tight">
										{protocol[currentCycle].title}
									</h4>
									<p className="text-xs text-stone-500 font-medium">
										{protocol[currentCycle].desc}
									</p>
								</div>

								<div className="space-y-5">
									{protocol[currentCycle].exercises.map((ex, i) => (
										<motion.div
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: i * 0.1 }}
											key={i}
											onClick={() => toggleExercise(i)}
											className={cn(
												"flex items-center gap-4 group cursor-pointer p-2 -mx-2 rounded-2xl transition-all duration-300",
												completedExercises.includes(i)
													? "bg-stone-800/30"
													: "hover:bg-stone-800/20",
											)}
										>
											<div
												className={cn(
													"w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 transition-all duration-500",
													completedExercises.includes(i)
														? "bg-amber-500 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
														: "bg-stone-800/50 border-stone-700/30 group-hover:border-amber-500/50",
												)}
											>
												{completedExercises.includes(i) ? (
													<CheckCircle size={18} className="text-black" />
												) : (
													<span className="text-xs font-black text-stone-400 group-hover:text-amber-500">
														0{i + 1}
													</span>
												)}
											</div>
											<div className="flex-1">
												<p
													className={cn(
														"text-sm font-bold uppercase tracking-wide transition-all duration-300",
														completedExercises.includes(i)
															? "text-stone-500 line-through"
															: "text-white",
													)}
												>
													{ex.name}
												</p>
												<div className="flex items-center gap-2 mt-0.5">
													<p className="text-[10px] text-stone-500 font-bold uppercase tracking-tighter">
														{ex.target}
													</p>
													<span className="w-1 h-1 rounded-full bg-stone-700" />
													<p className="text-[10px] text-amber-500/70 font-bold italic">
														{ex.logic}
													</p>
												</div>
											</div>
											<ChevronRight
												size={14}
												className={cn(
													"transition-colors",
													completedExercises.includes(i)
														? "text-stone-800"
														: "text-stone-700 group-hover:text-stone-500",
												)}
											/>
										</motion.div>
									))}
								</div>

								<button
									onClick={handleComplete}
									disabled={isSyncing}
									className="relative w-full mt-10 group overflow-hidden rounded-2xl"
								>
									<div
										className={cn(
											"absolute inset-0 bg-linear-to-r from-amber-500 to-orange-600 transition-transform duration-500 group-hover:scale-105",
											completedExercises.length ===
												protocol[currentCycle].exercises.length
												? "opacity-100"
												: "opacity-50",
										)}
									/>
									<div className="relative flex items-center justify-center gap-3 py-5 px-8 text-black font-black uppercase text-xs tracking-[0.2em]">
										{isSyncing ? (
											<motion.div
												animate={{ rotate: 360 }}
												transition={{
													repeat: Infinity,
													duration: 1,
													ease: "linear",
												}}
											>
												<Zap size={16} />
											</motion.div>
										) : (
											<Flame
												size={16}
												className={cn(
													completedExercises.length ===
														protocol[currentCycle].exercises.length &&
														"animate-pulse",
												)}
											/>
										)}
										{isSyncing
											? "Syncing Protocol..."
											: completedExercises.length ===
											  protocol[currentCycle].exercises.length
											? "Complete Mission"
											: "Sync Mission Data"}
									</div>
								</button>
							</motion.div>
						</AnimatePresence>
					</div>

					{/* Bonus Objectives */}
					<div className="space-y-5">
						<div className="flex items-center gap-2 px-2">
							<Flame size={16} className="text-stone-500" />
							<h3 className="text-xs font-black uppercase tracking-widest text-stone-400">
								Übermensch Bonuses
							</h3>
						</div>
						<div className="grid grid-cols-2 gap-4">
							{(Object.keys(userStats.dailyGoals) as DailyGoalKey[]).map(
								goal => (
									<motion.button
										whileTap={{ scale: 0.95 }}
										key={goal}
										onClick={() => toggleGoal(goal)}
										className={cn(
											"relative p-5 rounded-2xl border transition-all duration-500 text-left overflow-hidden group",
											userStats.dailyGoals[goal]
												? "bg-amber-500 border-amber-400 text-black shadow-[0_10px_20px_rgba(245,158,11,0.2)]"
												: "bg-stone-900/50 border-stone-800/50 text-stone-500 hover:border-stone-700",
										)}
									>
										{userStats.dailyGoals[goal] && (
											<motion.div
												layoutId="goal-bg"
												className="absolute inset-0 bg-linear-to-br from-amber-400 to-amber-600"
											/>
										)}
										<div className="relative flex justify-between items-start h-full">
											<span
												className={cn(
													"text-[11px] font-black uppercase tracking-widest",
													userStats.dailyGoals[goal]
														? "text-black"
														: "text-stone-400 group-hover:text-stone-200",
												)}
											>
												{goal}
											</span>
											{userStats.dailyGoals[goal] ? (
												<CheckCircle size={16} className="text-black" />
											) : (
												<div className="w-4 h-4 rounded-full border-2 border-stone-800 group-hover:border-stone-700" />
											)}
										</div>
									</motion.button>
								),
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Navigation Bar */}
			<div className="fixed bottom-8 left-0 right-0 px-6 z-50">
				<nav className="max-w-sm mx-auto bg-stone-900/80 backdrop-blur-2xl border border-stone-800/50 rounded-4xl p-2 flex justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
					<button className="flex-1 flex flex-col items-center py-3 text-amber-500 relative">
						<Dumbbell size={22} />
						<span className="text-[9px] font-black uppercase mt-1.5 tracking-tighter">
							Train
						</span>
						<motion.div
							layoutId="nav-indicator"
							className="absolute -bottom-1 w-1 h-1 rounded-full bg-amber-500"
						/>
					</button>
					<button className="flex-1 flex flex-col items-center py-3 text-stone-600 hover:text-stone-400 transition-colors">
						<TrendingUp size={22} />
						<span className="text-[9px] font-black uppercase mt-1.5 tracking-tighter">
							Stats
						</span>
					</button>
					<button className="flex-1 flex flex-col items-center py-3 text-stone-600 hover:text-stone-400 transition-colors">
						<User size={22} />
						<span className="text-[9px] font-black uppercase mt-1.5 tracking-tighter">
							Profile
						</span>
					</button>
				</nav>
			</div>
		</div>
	)
}

export default App
