import {TStoriesProps} from "@/components/Stories/StoriesTypes";

export const myStoriesData: TStoriesProps = {
  data: {
  stories:  [{
    id: 1,
    image: '/img/bird5.webp',
    timer: '5',
    is_active: true,
    views: 0,
    text: 'Всем привет',
    description: 'Как думаете, что за птица',
    is_watched: false,
  },
    {
      id: 2,
      image: '/video/2.mp4',
      timer: '11',
      is_active: true,
      views: 0,
      text: 'This is pandaaa',
      is_watched: false,
    },
    {
      id: 3,
      image: '/img/bird3.webp',
      timer: '8',
      is_active: true,
      views: 0,
      text: 'Какая птичка!',
      is_watched: false,
    },
    {
      id: 4,
      image: '/img/bunblebee.jpg',
      timer: '10',
      is_active: true,
      views: 0,
      text: 'Шмель!!!',
      description: 'сфотографирован на набережной',
      is_watched: false,
    },
  ],
},
}
