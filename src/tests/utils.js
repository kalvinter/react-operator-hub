import { v4 as uuidv4 } from 'uuid';

import { gameHistoryEntry } from "../game/Storage"

import { GameEndTypes } from "../game/Config"

// Each entry will unlock one achievement (100% matched rate & 1 aborted)
export const gameHistoryEntriesUnlockingAchievments = [
    new gameHistoryEntry({
        id: uuidv4(),
        date: new Date(),
        timeRunningInSeconds: 50,
        shiftTimeLeft: 70,
        producedEnergy: 0,
        achievedMatchedRate: 0.2,
        demandMatchedStatusHistory: [],
        gameStatus: GameEndTypes.aborted,
    }),
    new gameHistoryEntry({
        id: uuidv4(),
        date: new Date(),
        timeRunningInSeconds: 120,
        shiftTimeLeft: 0,
        producedEnergy: 0,
        achievedMatchedRate: 1,
        demandMatchedStatusHistory: [],
        gameStatus: GameEndTypes.shiftWasFinished,
    }),
]
