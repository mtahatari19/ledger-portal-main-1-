export interface UserIdleData {
  idle: number;
  timeout: number;
  timerCount: number;
}

export interface UserIdleWatchConfig {
  onTimeout: () => void;
  onContinue: () => void;
}
