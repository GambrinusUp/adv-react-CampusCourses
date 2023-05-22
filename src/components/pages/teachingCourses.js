import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getTeachingCoursesThunkCreator} from "../store/coursesReducer";
import CoursesItem from "../UI/CoursesItem";

function TeachingCourses() {
    const courses = useSelector((state) => state.coursesPage.courses);
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("token");
        dispatch(getTeachingCoursesThunkCreator(token));
        // eslint-disable-next-line
    }, [dispatch]);

    return(
        <div style={{ backgroundColor: "#EBF5EE", width: "100%", minHeight: "1000px"}}>
            <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
                <div className="card-deck">
                    <div
                        style={{
                            paddingTop: 90,
                            fontStyle: "normal",
                            fontSize: "60px",
                            color: "#283044",
                            paddingBottom: 20
                        }}
                    >
                        Преподаваемые курсы
                    </div>
                    {courses.map((value) => (
                        <CoursesItem title={value.name} key={value.id} id={value.id} date={value.startYear} semester={value.semester}
                                     availablePlaces={value.remainingSlotsCount} allPlaces={value.maximumStudentsCount} status={value.status}></CoursesItem>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TeachingCourses;