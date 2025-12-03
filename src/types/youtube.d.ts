// TypeScript definitions for YouTube IFrame Player API
// https://developers.google.com/youtube/iframe_api_reference

declare namespace YT {
  export interface Player {
    playVideo(): void;
    pauseVideo(): void;
    seekTo(seconds: number, allowSeekAhead: boolean): void;
    getCurrentTime(): number;
    getDuration(): number;
    getPlayerState(): PlayerState;
    destroy(): void;
  }

  export enum PlayerState {
    UNSTARTED = -1,
    ENDED = 0,
    PLAYING = 1,
    PAUSED = 2,
    BUFFERING = 3,
    CUED = 5,
  }

  export interface PlayerOptions {
    height?: string | number;
    width?: string | number;
    videoId: string;
    playerVars?: PlayerVars;
    events?: Events;
  }

  export interface PlayerVars {
    autoplay?: 0 | 1;
    cc_load_policy?: 0 | 1;
    color?: "red" | "white";
    controls?: 0 | 1;
    disablekb?: 0 | 1;
    enablejsapi?: 0 | 1;
    end?: number;
    fs?: 0 | 1;
    hl?: string;
    iv_load_policy?: 1 | 3;
    list?: string;
    listType?: "playlist" | "search" | "user_uploads";
    loop?: 0 | 1;
    modestbranding?: 0 | 1;
    origin?: string;
    playlist?: string;
    playsinline?: 0 | 1;
    rel?: 0 | 1;
    showinfo?: 0 | 1;
    start?: number;
    widget_referrer?: string;
  }

  export interface Events {
    onReady?: (event: PlayerEvent) => void;
    onStateChange?: (event: OnStateChangeEvent) => void;
    onPlaybackQualityChange?: (event: OnPlaybackQualityChangeEvent) => void;
    onPlaybackRateChange?: (event: OnPlaybackRateChangeEvent) => void;
    onError?: (event: OnErrorEvent) => void;
    onApiChange?: (event: PlayerEvent) => void;
  }

  export interface PlayerEvent {
    target: Player;
  }

  export interface OnStateChangeEvent extends PlayerEvent {
    data: PlayerState;
  }

  export interface OnPlaybackQualityChangeEvent extends PlayerEvent {
    data: string;
  }

  export interface OnPlaybackRateChangeEvent extends PlayerEvent {
    data: number;
  }

  export interface OnErrorEvent extends PlayerEvent {
    data: number;
  }

  export class Player {
    constructor(elementId: string | HTMLElement, options: PlayerOptions);
  }
}

declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export {};
