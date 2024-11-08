'use client';
import Image from "next/image";
import {ChangeEvent, useEffect, useMemo, useState} from "react";
import {TStoriesControlProps, TStoriesItem} from "@/components/Stories/StoriesTypes";
import {useDispatch, useSelector} from "react-redux";
import {openCard} from "@/store/cardSlice";
const StoriesControls = ({allStories, setAllStories}: TStoriesControlProps) => {

  const [selected, setSelected] = useState([1]);
  const [textStorie, setTextStorie] = useState('');
  const [descriptionStorie, setDescriptionStorie] = useState('');
  const [timerStorie, setTimerStorie] = useState('0');
  const [fileURL, setFileURL] = useState<string | null>(null);
  const [mediaFile, setMediaFile] = useState<File | null>(null);

  const dispatch = useDispatch();
  // @ts-ignore
  const isCardOpened = useSelector((state) => state.cardIsOpen.cardIsOpen);

  //обработка загрузки файла с помощью API браузера fileReader
  function handleFileLoader(event: ChangeEvent<HTMLInputElement>) {
    if(event.target.files && event.target.files[0]){
      setMediaFile(event.target.files[0]);
    }
  }

  useEffect(() => {
    {/*@ts-ignore*/}
    let fileReader, isCancel = false;
    if (mediaFile) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        {/*@ts-ignore*/}
        const { result } = e.target;
        if (result && !isCancel) {
          setFileURL(result)
        }
      }
      fileReader.readAsDataURL(mediaFile);
    }
    return () => {
      isCancel = true;
      {/*@ts-ignore*/}
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    }

  }, [mediaFile]);
  const handleClick = (item: TStoriesItem) => {
    if(selected.includes(item.id)){
      setSelected(selected.filter(elem => elem !== item.id));
    }else{
      setSelected([...selected, item.id]);
    }
  }
  const handleStoriesAdd = () => {
    {/*@ts-ignore*/}
    setAllStories((prev) => {
        return [ ...prev, {
          id: Date.now(),
          image: fileURL,
          timer: timerStorie,
          is_active: true,
          views: 0,
          text: textStorie,
          description: descriptionStorie,
          is_watched: false,
        }]
      }
    );
    dispatch(openCard(false));
  }
  const handleDelete = () => {
    const set = new Set(selected);
    setAllStories(allStories && allStories.filter(elem => !set.has(elem.id)));
  }

  const memoizedStoriesCards = useMemo(() => {
    return (
      <div
        className={
          'flex flex-col lg:flex-row flex-wrap gap-5'
        }>
        {allStories?.map((item) =>
          (
            <div
              key={item.id}
              className={`${selected.includes(item.id) ? 'border-amber-300 border-4' : ''} border-4 cursor-pointer rounded-lg overflow-clip w-[180px] aspect-square`}
              onClick={() => handleClick(item)}
            >
              <div
                className={`bg-black text-white text-[12px] flex flex-col gap-2 w-full h-full items-center overflow-hidden hover:bg-gray-700 p-2`}
              >
                <div
                  className={`relative rounded-lg overflow-clip z-20 h-[70px] w-[60px]`}
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
                        'h-full w-full rounded-[18px] bg-black object-contain object-center laptopS:rounded-[30px]'
                      }
                      loop
                      muted
                      src={item.image}
                      controls
                    />
                  )}

                </div>
                <div className='flex flex-col items-center gap-2'>
                  <div className={'text-[12px] w-fit font-semibold '}>{item?.text ?? ''}</div>
                  <div className={'text-[12px] w-fit  font-semibold line-clamp-1'}>{item?.description ?? ''}</div>
                </div>
                <div className={'text-[11px]'}>Просмотров: {item.views}</div>
                <div className='text-[10px]'>{item.is_watched ? 'Просмотрено' : 'Не просмотрено'}</div>
              </div>

            </div>
          )
        )}
      </div>
    )
  }, [selected, allStories]);

  return (
    <div>
      {!!allStories?.length && (
        <div className='flex flex-col items-center gap-3'>
          <div className='text-lg font-semibold'>Управление сторисами</div>
          {memoizedStoriesCards}
          <button className='block cursor-pointer p-2 border-2 border-amber-950 w-fit hover:bg-amber-200' onClick={() => handleDelete()}>Удалить выбранные</button>
          <button className='block cursor-pointer p-2 border-2 border-amber-950 w-fit hover:bg-amber-200' onClick={() => dispatch(openCard(true))}>Добавить</button>
        </div>
      )}

      <div className={`${isCardOpened ? 'border-2 border-amber-400 bg-gray-100' : 'hidden'} text-[12px] lg:text-[15px] flex flex-col items-center gap-4 mt-4  p-2`}>

        <div className='flex flex-col gap-3 border-2 border-black p-2 bg-amber-100'>

        <div className={`${isCardOpened ? 'block' : 'hidden'} flex flex-col md:flex-row items-center  gap-2`}>
          <div>Введите текст сторис:</div>
          <input
            className='border-2 border-amber-300 bg-amber-100'
            type={'text'}
            value={textStorie}
            onChange={(event) => setTextStorie(event.target.value)}
          /></div>

        <div className={`${isCardOpened ? 'block' : 'hidden'} flex  flex-col md:flex-row  items-center  gap-2`}>
          <div>Введите описание сторис:</div>
          <input
            className='border-2 border-amber-300 bg-amber-100'
            type={'text'}
            value={descriptionStorie}
            onChange={(event) => setDescriptionStorie(event.target.value)}
          />
        </div>

        <div className={`${isCardOpened ? 'block' : 'hidden'} flex flex-col md:flex-row  items-center  gap-2`}>
          <div>Введите время "жизни" сторис в секундах:</div>
          <input
            className='border-2 border-amber-300 bg-amber-100'
            type={'number'}
            value={timerStorie}
            onChange={(event) => setTimerStorie(event.target.value)}
          /></div>

        <form className={`${isCardOpened ? 'block' : 'hidden'} flex flex-col md:flex-row  items-center gap-2`}>
          <div>Загрузите фото/видео: </div>
          <input
            onChange={handleFileLoader}
            className='border-2 border-amber-300 bg-amber-100'
            type={'file'}
            accept="image/png, image/jpeg, video/mp4, video/*"
          />
        </form>

        </div>

        {isCardOpened &&  (
          <div className='flex flex-col items-center gap-4'>
            <div className={'text-lg font-semibold'}>Предпросмотр новой истории</div>
            <div

              className={`bg-blue-200 text-[12px] p-4 flex flex-col gap-1 w-fit h-full items-center overflow-hidden rounded-lg`}
            >
              <div
                className={`relative overflow-clip z-20 h-[410px] w-[240px]`}
              >
                {/*@ts-ignore*/}
                {mediaFile && fileURL && fileURL.slice(5, 10) === 'image' && (
                  <Image
                    fill
                    src={fileURL}
                    alt='img'
                    className={'object-cover'}
                  />
                )}

                {/*@ts-ignore*/}
                {mediaFile && fileURL && fileURL.slice(5, 10) !== 'image' && (
                  <div className='absolute border-2 border-gray-400 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[280px] flex justify-center items-center'>
                    <video
                      className={
                        'h-full w-full rounded-[18px] bg-black object-contain object-center laptopS:rounded-[30px]'
                      }
                      loop
                      muted
                      autoPlay
                      src={fileURL}
                      controls
                    />
                  </div>
                )}

                {!fileURL && (
                  <div className='absolute border-2 border-gray-400 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[280px] flex justify-center items-center'><div>Нет изображения или видео</div></div>
                )}
                <div className='text-center'>
                  {textStorie && (
                    <div className={'absolute top-6 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15px] w-fit font-semibold bg-amber-100 rounded-lg p-1 '}>{textStorie}</div>
                  )}

                  {descriptionStorie && (
                    <div className={'absolute top-20 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15px] w-fit font-semibold bg-orange-200  rounded-lg p-1 '}>{descriptionStorie}</div>
                  )}
                </div>
              </div>
              <div>Время жизни: {timerStorie ?? ''} сек</div>
            </div>

            {timerStorie !== '0' && fileURL ? (
              <button className={`${timerStorie === '0' || !fileURL ? 'hidden' : 'block '} cursor-pointer p-2 border-2 border-amber-950 w-fit hover:bg-amber-200`} onClick={handleStoriesAdd}>Добавить эту историю</button>
            ) : (
              <div>Обязательно добавьте время и картинку/видео</div>
            )}
            <button className='block cursor-pointer p-2 border-2 border-amber-950 w-fit hover:bg-amber-200' onClick={() => dispatch(openCard(false))}>Отменить добавление</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default StoriesControls;
