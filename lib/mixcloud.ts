import { newRidgeState } from "react-ridge-state";
import { MixcloudPlayerWidget } from "../types/mixcloud";

export const showKey = newRidgeState<string | null>(null);

export const playerWidget = newRidgeState<MixcloudPlayerWidget | null>(null);
