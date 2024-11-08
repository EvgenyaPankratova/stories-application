
export type TStoriesProps = {
  data: {
    stories: TStoriesItem[];
  }
}

export type TStoriesControlProps = {
  allStories: TStoriesItem[] | null;
  setAllStories: (arg:TStoriesItem[] | null) => void;
}

export type TStoriesItem = {
  id: number;
  image: string;
  timer: string;
  is_active: boolean;
  views: number;
  text?: string;
  description?: string;
  is_watched: boolean;
}

