import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getTeachingCoursesThunkCreator} from "../store/coursesReducer";
import CoursesItem from "../UI/CoursesItem";
import {useNavigate} from "react-router-dom";
import styles from './style.module.css'

function TeachingCourses() {
    const courses = useSelector((state) => state.coursesPage.courses);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        dispatch(getTeachingCoursesThunkCreator(token)).catch(() => {
            navigate('/', {replace: true});
        });
        // eslint-disable-next-line
    }, [dispatch]);

    return(
        <div className={styles.container2}>
            <div className={styles.cardDeck}>
                <div className="card-deck">
                    <div className={styles.title2}>
                        Преподаваемые курсы
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

export default TeachingCourses;