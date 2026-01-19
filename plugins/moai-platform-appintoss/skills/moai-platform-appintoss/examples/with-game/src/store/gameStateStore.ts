import { create } from 'zustand';

interface GameState {
  distanceToEnd: number;
  hasShot: boolean;
  isGameEnd: boolean;
  physicsKey: boolean;
}

interface GameAction {
  setDistanceToEnd: (distance: number) => void;
  setHasShot: (hasShot: boolean) => void;
  setIsGameEnd: (isGameEnd: boolean) => void;
  resetGameState: () => void;
}

const initialState: GameState = {
  distanceToEnd: 0,
  hasShot: false,
  isGameEnd: false,
  physicsKey: false,
};

export const useGameStateStore = create<GameState & GameAction>((set, get) => ({
  ...initialState,

  setDistanceToEnd: (distance: number) => set({ distanceToEnd: distance }),
  setHasShot: (hasShot: boolean) => set({ hasShot }),
  setIsGameEnd: (isGameEnd: boolean) => set({ isGameEnd }),
  resetGameState: () => {
    const state = get();
    set({ ...initialState, physicsKey: !state.physicsKey });
  },
}));
