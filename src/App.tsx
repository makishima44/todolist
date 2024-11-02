import s from "./App.module.css";

import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Todolist } from "./common/components/Todolist/Todolist";
import { RootState, useAppDispatch } from "./redux/store";
import { Header } from "./common/components/Header/Header";
import { fetchTodolistsAsync } from "./redux/todolistThunk";

function App() {
  const dispatch = useAppDispatch();
  const todolists = useSelector((state: RootState) => state.todolists.todolists);

  useEffect(() => {
    dispatch(fetchTodolistsAsync());
  }, [dispatch]);

  const isMobile = window.innerWidth < 768;

  return (
    <div className={s.App}>
      <Header />

      <div className={s.todolistBlock}>
        {isMobile ? (
          <Swiper
            spaceBetween={15}
            slidesPerView="auto" // Подстраивается под ширину экрана
            centeredSlides={false}
          >
            {todolists.map((td) => (
              <SwiperSlide>
                <Todolist
                  todolistName={td.title}
                  todolistId={td.id}
                  dateCreated={td.dateCreated || "Unknown Date"}
                  key={td.id}
                />
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
    </div>
  );
}

export default App;
