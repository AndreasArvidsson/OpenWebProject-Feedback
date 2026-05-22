export interface FeedbackOptions {
  sticky?: boolean;
  duration?: number;
}

export interface Feedback {
  config(params?: FeedbackOptions): void;
  info(message: string, userOpt?: FeedbackOptions): void;
  error(message: string, userOpt?: FeedbackOptions): void;
  success(message: string, userOpt?: FeedbackOptions): void;
  warn(message: string, userOpt?: FeedbackOptions): void;
  grimace(message: string, userOpt?: FeedbackOptions): void;
  neutral(message: string, userOpt?: FeedbackOptions): void;
}

declare const Feedback: Feedback;

export default Feedback;
