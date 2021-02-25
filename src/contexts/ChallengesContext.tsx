import { createContext, useState, ReactNode, useEffect } from 'react'
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
    completeChallenge: () => void
    activeChallenge: Challenge
}

export const ChallengesContext = createContext({} as ChallengesContextData)

interface ChallengesProviderProps {
    children: ReactNode
}

export function ChallengesProvider({ children }: ChallengesProviderProps) {
    const [level, setLevel] = useState(1)
    const [currentExperience, setCurrentExperience] = useState(0)
    const [challengesCompleted, setChallengesCompleted] = useState(0)
    const [activeChallenge, setActiveChallente] = useState(null)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    // O segundo parâmetro como [] faz com que essa função seja executada apenas quando o componente for carregado
    useEffect(() => {
        Notification.requestPermission()
    }, [])

    function levelUp() {
        setLevel(level + 1)
    }

    function startNewChallenge() {
        const randomChallengeInxdex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeInxdex]

        setActiveChallente(challenge)

        if (Notification.permission === 'granted') {
            new Audio('/notification.mp3').play()
            
            new Notification('Novo desafio', {
                body: `Valendo ${challenge.amount} xp`
            })
        }
    }

    function resetChallenge() {
        setActiveChallente(null)
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return
        }

        const { amount } = activeChallenge

        let finalExperience = currentExperience + amount

        if (finalExperience > experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel
            levelUp()
        }

        setCurrentExperience(finalExperience)
        setActiveChallente(null)
        setChallengesCompleted(challengesCompleted + 1)
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
            completeChallenge, 
            activeChallenge
        }}>
            {children}
        </ChallengesContext.Provider>
    )
}