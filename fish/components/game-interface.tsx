"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, PlayCircle } from 'lucide-react'

const suits = ['♠', '♥', '♦', '♣']
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

type CardType = {
  suit: string
  value: string
}

export function GameInterface() {
  const [currentPlayer, setCurrentPlayer] = useState(0)
  const [players, setPlayers] = useState([
    { name: 'Player 1', cards: [], team: 'A' },
    { name: 'Player 2', cards: [], team: 'B' },
    { name: 'Player 3', cards: [], team: 'A' },
    { name: 'Player 4', cards: [], team: 'B' },
    { name: 'Player 5', cards: [], team: 'A' },
    { name: 'Player 6', cards: [], team: 'B' },
  ])

  useEffect(() => {
    distributeCards()
  }, [])

  const distributeCards = () => {
    const deck = createDeck()
    const shuffledDeck = shuffleDeck(deck)
    const newPlayers = players.map((player, index) => ({
      ...player,
      cards: shuffledDeck.slice(index * 9, (index + 1) * 9)
    }))
    setPlayers(newPlayers)
  }

  const createDeck = (): CardType[] => {
    return suits.flatMap(suit => values.map(value => ({ suit, value })))
  }

  const shuffleDeck = (deck: CardType[]): CardType[] => {
    return deck.sort(() => Math.random() - 0.5)
  }

  const nextTurn = () => {
    setCurrentPlayer((currentPlayer + 1) % 6)
  }

  return (
    <div className="min-h-screen w-full bg-green-800 p-4 flex flex-col">
      <h1 className="text-2xl font-bold text-white mb-4">Literature Card Game</h1>
      <div className="flex-grow flex items-center justify-center">
        <div className="relative w-[800px] h-[600px]">
          {players.map((player, index) => (
            <PlayerArea 
              key={index} 
              player={player} 
              position={index} 
              isCurrentPlayer={index === currentPlayer}
              isCurrentUserPlayer={index === currentPlayer}
            />
          ))}
          <Card className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 flex items-center justify-center">
            <CardContent>
              <PlayCircle className="w-24 h-24 text-green-600" />
            </CardContent>
          </Card>
        </div>
      </div>
      <ActionArea 
        currentPlayer={players[currentPlayer].name}
      />
    </div>
  )
}

function PlayerArea({ player, position, isCurrentPlayer, isCurrentUserPlayer }) {
  const positionStyles = [
    "bottom-0 left-1/2 -translate-x-1/2",
    "bottom-1/4 right-0 -translate-x-1/4",
    "top-1/4 right-0 -translate-x-1/4",
    "top-0 left-1/2 -translate-x-1/2",
    "top-1/4 left-0 translate-x-1/4",
    "bottom-1/4 left-0 translate-x-1/4"
  ]

  const teamColor = player.team === 'A' ? "bg-blue-500" : "bg-red-500"

  return (
    <div className={`absolute ${positionStyles[position]} w-40 h-32 ${isCurrentPlayer ? 'ring-4 ring-yellow-400' : ''}`}>
      <Card>
        <CardContent className="p-2">
          <div className="flex items-center mb-2">
            <User className={`w-6 h-6 mr-2 ${teamColor} text-white rounded-full p-1`} />
            <span className="font-semibold">{player.name}</span>
          </div>
          <div className="flex flex-wrap justify-center gap-1">
            {isCurrentUserPlayer ? (
              player.cards.map((card, index) => (
                <div key={index} className="w-6 h-9 bg-white rounded flex items-center justify-center text-xs font-bold" style={{color: ['♥', '♦'].includes(card.suit) ? 'red' : 'black'}}>
                  {card.value}{card.suit}
                </div>
              ))
            ) : (
              Array.from({ length: player.cards.length }).map((_, i) => (
                <div key={i} className="w-6 h-9 bg-blue-600 rounded border-2 border-white flex items-center justify-center">
                  <div className="w-4 h-7 bg-white rounded-sm"></div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ActionArea({ currentPlayer }) {
  return (
    <Card className="mt-4">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-2">{currentPlayer}'s Turn</h2>
        <p className="mb-2">Choose a player from the opposite team to ask for a card:</p>
        <div className="flex space-x-2">
          <Button onClick={() => {}}>Ask Player 2</Button>
          <Button onClick={() => {}}>Ask Player 4</Button>
          <Button onClick={() => {}}>Ask Player 6</Button>
        </div>
      </CardContent>
    </Card>
  )
}