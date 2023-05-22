import {useEffect} from "react";
import CoursesItem from "../UI/CoursesItem";
import {useDispatch, useSelector} from "react-redux";
import {getMyCoursesThunkCreator} from "../store/coursesReducer";

function MyCourses() {
    const courses = useSelector((state) => state.coursesPage.courses);
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("token");
        dispatch(getMyCoursesThunkCreator(token));
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
                        <CoursesItem title={value.name} key={value.id} id={value.id} date={value.startYear} semester={value.semester}
                                     availablePlaces={value.remainingSlotsCount} allPlaces={value.maximumStudentsCount} status={value.status}></CoursesItem>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MyCourses;