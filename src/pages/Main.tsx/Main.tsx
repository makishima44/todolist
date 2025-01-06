import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Todolist } from "../../common/components/Todolist/Todolist";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import { Header } from "../../common/components/Header/Header";
import { fetchTodolistsAsync } from "../../redux/slices/todolist/todolistThunk";

import "swiper/css";
import s from "./Main.module.css";
import { Footer } from "../../common/components/Footer/Footer";

export const Main = () => {
  const dispatch = useAppDispatch();
  const todolists = useSelector((state: RootState) => state.todolists.todolists);
  const loading = useSelector((state: RootState) => state.todolists.loading);
  const error = useSelector((state: RootState) => state.todolists.error);
  const uid = useAppSelector((state) => state.auth.uid); // Получаем uid из состояния

  useEffect(() => {
    if (uid) {
      dispatch(fetchTodolistsAsync(uid)); // Передаем uid
    }
  }, [dispatch, uid]);

  const isMobile = window.innerWidth < 768;

  return (
    <div className={s.App}>
      <Header />
      {loading && <div>Loading...</div>} {/* Статус загрузки */}
      {error && <div>Error: {error}</div>} {/* Ошибка, если есть */}
      <div className={s.todolistBlock}>
        {isMobile ? (
          <Swiper
            spaceBetween={15}
            slidesPerView="auto" // Подстраивается под ширину экрана
            centeredSlides={false}
          >
            {todolists.map((td) => (
              <SwiperSlide key={td.id}>
                {" "}
                {/* Добавляем ключ на SwiperSlide */}
                <Todolist todolistName={td.title} todolistId={td.id} dateCreated={td.dateCreated || "Unknown Date"} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          todolists.map((td) => (
            <Todolist
              todolistName={td.title}
              todolistId={td.id}
              dateCreated={td.dateCreated || "Unknown Date"}
              key={td.id}
            />
          ))
        )}
      </div>
      <Footer />
    </div>
  );
};
