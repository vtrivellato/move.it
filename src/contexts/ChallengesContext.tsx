import { createContext, useState, ReactNode } from 'react'
import challenges from '../../challenges.json'

interface Challenge {
    type: 'body' | 'eye'
    description: string
    amount: number
}

interface ChallengesContextData {
    level: number
    currentExperience: number
    challengesCompleted: number
    experienceToNextLevel: number
    levelUp: () => void
    startNewChallenge: () => void
    resetChallenge: () => void
    activeChallenge: Challenge
}

export const ChallengesContext = createContext({} as ChallengesContextData)

interface ChallengesProviderProps {
    children: ReactNode
}

export function ChallengesProvider({ children }: ChallengesProviderProps) {
    const [level, setLevel] = useState(1)
    const [currentExperience, setCurrentExperienc] = useState(0)
    const [challengesCompleted, setChallengesCompleted] = useState(0)
    const [activeChallenge, setActiveChallente] = useState(null)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    function levelUp() {
        setLevel(level + 1)
    }

    function startNewChallenge() {
        const randomChallengeInxdex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeInxdex]

        setActiveChallente(challenge)
    }

    function resetChallenge() {
        setActiveChallente(null)
    }

    return (
        <ChallengesContext.Provider value={{
            level,
            currentExperience,
            challengesCompleted,
            experienceToNextLevel, 
            levelUp,
            startNewChallenge,  
            resetChallenge, 
            activeChallenge
        }}>
            {children}
        </ChallengesContext.Provider>
    )
}