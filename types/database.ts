export interface Memory {
  id: string;
  real_image_url: string;
  ghibli_image_url: string;
  caption: string | null;
  category: string | null;
  created_at: string;
}

export interface VaultMessage {
  id: string;
  mood_tag: string;
  message_content: string;
  unlock_date: string | null;
}

export interface Puzzle {
  id: string;
  step_number: number;
  question: string;
  correct_answer: string;
  reward_image_url: string | null;
}
