import { CheckCircle, Dumbbell, TrendingUp, Trophy, User } from "lucide-react"
import { useState } from "react"

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

	const [currentCycle, setCurrentCycle] = useState(0) // 0: Upper, 1: Lower A, 2: Lower B

	const protocol = [
		{
			title: "UPPER BODY: V-TAPER",
			desc: "Priority: Wide Lats & Boulder Shoulders",
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
		setUserStats(prev => ({
			...prev,
			exp: prev.exp + 150,
			reps: prev.reps + 50,
		}))
		setCurrentCycle((currentCycle + 1) % 3)
	}

	const toggleGoal = (goal: DailyGoalKey) => {
		setUserStats(prev => ({
			...prev,
			dailyGoals: { ...prev.dailyGoals, [goal]: !prev.dailyGoals[goal] },
		}))
	}

	return (
		<div className="app-root min-h-screen bg-stone-950 text-stone-200 font-sans p-4 pb-24">
			{/* Header */}
			<header className="max-w-md mx-auto mb-8 pt-4">
				<div className="flex justify-between items-end">
					<div>
						<h1 className="text-3xl font-black italic tracking-tighter text-amber-500 uppercase">
							Übermensch
						</h1>
						<p className="text-[10px] font-bold tracking-[0.3em] text-stone-500">
							KOENJI PROTOCOL v2.1
						</p>
					</div>
					<div className="text-right">
						<p className="text-[10px] font-bold text-stone-600 uppercase">
							Current Weight
						</p>
						<p className="text-xl font-black text-white">
							{userStats.weight}kg
						</p>
					</div>
				</div>
			</header>

			<div className="container max-w-md mx-auto space-y-6">
				{/* Rank Card */}
				<div className="card rank-card bg-stone-900 border border-stone-800 rounded-3xl p-6 relative overflow-hidden">
					<div className="absolute top-0 right-0 p-4 opacity-10">
						<Trophy size={80} />
					</div>
					<p className="text-[10px] font-bold text-amber-500 uppercase mb-1">
						Current Standing
					</p>
					<h2 className="text-2xl font-black italic mb-4">{userStats.rank}</h2>
					<div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
						<div className="bg-amber-500 h-full w-1/3 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
					</div>
					<div className="flex justify-between mt-2">
						<p className="text-[10px] font-bold text-stone-500">
							{userStats.exp} EXP
						</p>
						<p className="text-[10px] font-bold text-stone-500 italic">
							NEXT: INITIATE
						</p>
					</div>
				</div>

				{/* Current Workout */}
				<div className="space-y-4">
					<div className="flex justify-between items-center px-2">
						<h3 className="text-sm font-black uppercase text-stone-400">
							Today's Mission
						</h3>
						<span className="text-[10px] bg-amber-500/10 text-amber-500 px-2 py-1 rounded font-bold">
							CYCLE DAY {currentCycle + 1}
						</span>
					</div>

					<div className="card workout-card bg-stone-900 border border-stone-800 rounded-3xl p-5">
						<h4 className="text-xl font-black italic mb-1">
							{protocol[currentCycle].title}
						</h4>
						<p className="text-xs text-stone-500 mb-6">
							{protocol[currentCycle].desc}
						</p>

						<div className="space-y-4">
							{protocol[currentCycle].exercises.map((ex, i) => (
								<div key={i} className="flex items-start gap-4 group">
									<div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center shrink-0 group-hover:bg-amber-500/20 transition-colors">
										<span className="text-xs font-black text-amber-500">
											{i + 1}
										</span>
									</div>
									<div>
										<p className="text-sm font-bold text-white uppercase">
											{ex.name}
										</p>
										<p className="text-[10px] text-stone-500 font-bold">
											{ex.target} •{" "}
											<span className="text-stone-400 italic">{ex.logic}</span>
										</p>
									</div>
								</div>
							))}
						</div>

						<button
							onClick={handleComplete}
							className="w-full mt-8 bg-amber-500 text-black font-black py-4 rounded-2xl uppercase text-xs tracking-widest hover:bg-amber-400 active:scale-95 transition-all shadow-xl shadow-amber-900/10"
						>
							Sync Mission Data
						</button>
					</div>
				</div>

				{/* Bonus Objectives */}
				<div className="space-y-4">
					<h3 className="text-sm font-black uppercase text-stone-400 px-2">
						Übermensch Bonuses
					</h3>
					<div className="bonuses-grid grid grid-cols-2 gap-3">
						{(Object.keys(userStats.dailyGoals) as DailyGoalKey[]).map(goal => (
							<button
								key={goal}
								onClick={() => toggleGoal(goal)}
								className={`p-4 rounded-2xl border text-left transition-all ${
									userStats.dailyGoals[goal]
										? "bg-amber-500 border-amber-500 text-black"
										: "bg-stone-900 border-stone-800 text-stone-500"
								}`}
							>
								<div className="flex justify-between items-center">
									<span className="text-[10px] font-black uppercase">
										{goal}
									</span>
									{userStats.dailyGoals[goal] && <CheckCircle size={12} />}
								</div>
							</button>
						))}
					</div>
				</div>
			</div>

			{/* Navigation Bar */}
			<nav className="bottom-nav fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-black/80 backdrop-blur-xl border border-stone-800 rounded-full p-2 flex justify-between shadow-2xl">
				<button className="flex-1 flex flex-col items-center py-2 text-amber-500">
					<Dumbbell size={20} />
					<span className="text-[8px] font-black uppercase mt-1">Train</span>
				</button>
				<button className="flex-1 flex flex-col items-center py-2 text-stone-600">
					<TrendingUp size={20} />
					<span className="text-[8px] font-black uppercase mt-1">Stats</span>
				</button>
				<button className="flex-1 flex flex-col items-center py-2 text-stone-600">
					<User size={20} />
					<span className="text-[8px] font-black uppercase mt-1">Notlu</span>
				</button>
			</nav>
		</div>
	)
}

export default App
