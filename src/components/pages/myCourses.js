import {useEffect} from "react";
import CoursesItem from "../UI/CoursesItem";
import {useDispatch, useSelector} from "react-redux";
import {getMyCoursesThunkCreator} from "../store/coursesReducer";
import {useNavigate} from "react-router-dom";
import styles from './style.module.css'

function MyCourses() {
    const courses = useSelector((state) => state.coursesPage.courses);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        dispatch(getMyCoursesThunkCreator(token)).catch(() => {
            navigate('/', {replace: true});
        });
        // eslint-disable-next-line
    }, [dispatch]);

    return(
        <div className={styles.container2}>
            <div className={styles.cardDeck}>
                <div className="card-deck">
                    <div className={styles.title2}>
                        {courses.length < 1 ? (
                            <>
                                Вы пока ещё не записались на курсы
                            </>
                            ) :
                            (<>
                                Мои курсы
                            </>)}
                    </div>
                    {courses.map((value) => (
                        <CoursesItem title={value.name}
                                     key={value.id}
                                     id={value.id}
                                     date={value.startYear}
                                     semester={value.semester}
                                     availablePlaces={value.remainingSlotsCount}
                                     allPlaces={value.maximumStudentsCount}
                                     status={value.status}></CoursesItem>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MyCourses;