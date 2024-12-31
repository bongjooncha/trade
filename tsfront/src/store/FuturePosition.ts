import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { CoinFuturePosition } from "types/coin";

type FuturePositionState = {
  position: CoinFuturePosition[];
  setPosition: (position: CoinFuturePosition[]) => void;
};

export const useFuturePositionStore = create<FuturePositionState>()(
  devtools((set) => ({
    position: [],
    setPosition: (position) => set({ position }),
  }))
);
