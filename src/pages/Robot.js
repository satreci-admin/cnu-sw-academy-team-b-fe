import React, {useState, useEffect} from "react"
import axios from "axios"
import RobotDetailModal from "../components/RobotDetailModal"

const Robot = () => {
    const [robotList, setRobotList] = useState([])
    const [isModalOpen, setIsModalopen] = useState(false)
    const [SelectedRobotId, setSelectedRobotId] = useState(0)

    useEffect(() => {
        getRobotList()
    }, [])

    useEffect(() => {
        getRobotList()
    }, [isModalOpen])

    const getRobotList = async () => {
        try {
            const fetchedRobots = await axios.get('http://localhost:8080/api/v1/robots')
            console.log(fetchedRobots.data);
            setRobotList(fetchedRobots.data);
        } catch (e) {
            console.log(e)
        }
    }

    const onClickDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/robot/${id}`)
            setRobotList(robotList.filter(v => v.id !== id))
        } catch (e) {
            console.log(e)
        }
    }

    const onClickRow = (id) => {
        setIsModalopen(true)
        setSelectedRobotId(id)
    }

    return (
        <div>
            <h1>
                로봇리스트
            </h1>
            <table className="table">
            <thead>
                <tr>
                <th scope="col">ID</th>
                <th scope="col">주소</th>
                <th scope="col">삭제</th>
                </tr>
            </thead>
            <tbody>
            {
                robotList.map((robot, idx) => 
                    <tr id={`${robot.id}_${idx}`} onClick={() => onClickRow(robot.id)}>
                        <td>{robot.id}</td>
                        <td>{robot.address}</td>
                        <td onClick={() => onClickDelete(robot.id)}>삭제</td>
                    </tr>
                )
            }
            </tbody>
            </table>
            {
                isModalOpen && 
                <RobotDetailModal 
                    robotId={SelectedRobotId} 
                    isOpen={isModalOpen} 
                    setIsOpen={(e) => setIsModalopen(e)}
                />
            }
        </div>
    )
}

export default Robot;