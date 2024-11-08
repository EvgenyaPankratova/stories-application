'use client';

import {useEffect, useRef, useState} from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from "next/image";
import { Swiper as SwiperInstance } from 'swiper/types';
import {TStoriesItem, TStoriesProps} from "@/components/Stories/StoriesTypes";
import 'swiper/css/autoplay';
// @ts-ignore
import { Autoplay } from 'swiper/modules';
import StoriesControls from "@/components/Stories/StoriesControls";
import {useDispatch} from "react-redux";
import {openCard} from "@/store/cardSlice";
const Stories = ({data}: TStoriesProps) => {

  const [allStories, setAllStories] = useState<TStoriesItem[] | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const dispatch = useDispatch();

  // @ts-ignore
  const ProgressBar = ({ progress } ) => {
    return (
      <div className={'relative w-full h-[4px] bg-white'}>
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            backgroundColor: 'black',
            transition: 'width 0.1s linear',
          }}
        />
      </div>
    );
  };

  useEffect(() => {
    setAllStories(data.stories);
  }, []);

  useEffect(() => {
    const slideDuration = allStories?.[currentSlide].timer;
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + (100 / (Number(slideDuration) * 1000 / 100));
      });
    }, 100); // Обновляем прогресс каждые 100 мс

    const slideChangeHandler = (swiper: SwiperInstance) => {
      setCurrentSlide(swiper.activeIndex);
    };
    swiperRef &&
    swiperRef.current &&
    // @ts-ignore
    swiperRef.current.on('slideChange', slideChangeHandler);
    return () => {
      clearInterval(interval);
      swiperRef &&
      swiperRef.current &&
      // @ts-ignore
      swiperRef.current.off('slideChange', slideChangeHandler);
    };
  }, [currentSlide]);

  useEffect(() => {
    !!data?.stories?.length && setAllStories(data.stories);
  }, []);

  const handleSlideChange = (swiper: SwiperInstance) => {
    setActiveIndex(swiper.activeIndex);
    setAllStories(prevState =>
       // @ts-ignore
      prevState.map((item, index) => {
          if(index === activeIndex){
          return { ...item, views: item.views + 1, is_watched: true }
        }else {
          return item;
        }
      }
      )
    )
  };

  return (
    <div className='w-full flex flex-col items-center gap-3'>
      <h2 className={'font-bold uppercase text-[18px] lg:text-[44px] mb-10'}>MyStories Application</h2>
      <div className='text-lg font-semibold'>Активные сторис</div>
      <div className=' flex flex-col gap-10'>
        <div className='w-full flex justify-center items-center'>

          <div className={'relative h-[470px] w-[315px] lg:h-[610px] lg:w-[410px] overflow-clip'}>
            <Image
              fill
              src={'/img/phone.png'}
              alt='img'
              className={'object-contain'}
            />
            <Swiper
              // @ts-ignore
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={handleSlideChange}
              modules={[Autoplay]}
              speed={500}
              className={'absolute lg:top-[70px] top-[55px] lg:left-16 left-12 w-[220px] h-[355px]  lg:w-[280px] lg:h-[460px] object-contain'}
              slidesPerView={1}
              spaceBetween={20}
              autoplay={{
                disableOnInteraction: false,
                stopOnLastSlide: false,
                pauseOnMouseEnter: false,
                delay: Number(allStories?.[currentSlide].timer) * 1000,
              }}
            >
              {!!allStories?.length ? (
                <div className={'relative'}>
                  {allStories?.map((item) => (
                    <SwiperSlide
                      key={item.id}
                      className={'w-full cursor-pointer px-[10px]'}
                    >
                        <div
                          className={`swiper-slide bg-blue-100 p-2 text-[12px] flex flex-col gap-1 w-full h-full items-center overflow-hidden `}
                        >
                          <div
                            className={`relative rounded-lg overflow-clip z-20 h-[410px] w-[240px]`}
                          >
                            {item.image.slice(-3) !== 'mp4'  && (item.image.length > 40 && item.image.slice(5, 10) === 'image' || item.image.length < 40) ? (
                              <Image
                                fill
                                src={item.image}
                                alt='img'
                                className={'object-cover'}
                              />
                            ) : (
                              <video
                                className={
                                  'h-[310px] md:h-[410px] w-[240px] rounded-lg bg-black object-cover object-center '
                                }
                                loop
                                muted
                                autoPlay
                                src={item.image}
                                controls
                              />
                            )}

                            <div className='text-center px-4'>
                              {item?.text && (
                                <div className={'absolute top-6 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15px] bg-amber-100 rounded-lg p-1 w-[90%] font-semibold'}>
                                  {item.text}
                                </div>
                              )}

                              {item.description && (
                                <div className={'absolute top-20 left-1/2 -translate-x-1/2' +
                                  ' -translate-y-1/2 text-[15px] bg-orange-200 rounded-lg p-1 w-[90%] font-semibold'}>{item.description}</div>
                              )}

                            </div>
                            <div className={'absolute bottom-2 left-2 text-[11px] lg:text-[13px] bg-amber-100 rounded-lg px-4 py-2 lg:p-2 w-fit'}>Просмотров: {item.views}</div>
                          </div>
                          <div>{item.is_watched ? 'Просмотрено' : 'Не просмотрено'}</div>
                          <ProgressBar progress={progress} />
                        </div>
                    </SwiperSlide>

                  ))}
                </div>
              ) : (
                <div className='absolute z-[10]  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                  <div>Нет историй</div>
                  <div className='cursor-pointer p-2 border-2 border-amber-950 w-fit hover:bg-amber-200' onClick={() => dispatch(openCard(true))}>Добавить</div>
                </div>)}
            </Swiper>
          </div>
        </div>
        <StoriesControls
        allStories={allStories}
        setAllStories={setAllStories}
        />
      </div>
    </div>
  )
}

export default Stories;
