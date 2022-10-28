import React, {useState, useEffect} from "react"
import axios from "axios"
import RobotDetailModal from "../components/RobotDetailModal"
import { AiOutlinePlus, AiFillDelete } from "react-icons/ai"
import RobotAddModal from "../components/RobotAddModal"

const Robot = () => {
    const [robotList, setRobotList] = useState([])
    const [isDetailModalOpen, setIsDetailModalopen] = useState(false)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [selectedRobotId, setSelectedRobotId] = useState(0)

    useEffect(() => {
        getRobotList()
    }, [])

    useEffect(() => {
        getRobotList()
    }, [isDetailModalOpen])

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
        setIsDetailModalopen(true)
        setSelectedRobotId(id)
    }

    return (
        <div>
            <div className="d-flex ml-2 mr-2 justify-content-between">
                <span className="h1">
                    로봇리스트
                </span>
                <AiOutlinePlus 
                    className="h2" 
                    style={{cursor: "pointer"}}
                    onClick={() => setIsAddModalOpen(true)}
                />
            </div>
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
                    <tr id={`${robot.id}_${idx}`}>
                        <td onClick={() => onClickRow(robot.id)} style={{cursor: "pointer"}}>{robot.id}</td>
                        <td onClick={() => onClickRow(robot.id)} style={{cursor: "pointer"}}>{robot.address}</td>
                        <td onClick={() => onClickDelete(robot.id)} style={{cursor: "pointer"}}>
                            <AiFillDelete />
                        </td>
                    </tr>
                )
            }
            </tbody>
            </table>
            {
                isDetailModalOpen && 
                <RobotDetailModal 
                    robotId={selectedRobotId} 
                    isOpen={isDetailModalOpen} 
                    setIsOpen={(e) => setIsDetailModalopen(e)}
                    getRobotList={() => getRobotList()}
                />
            }
            {
                isAddModalOpen &&
                <RobotAddModal 
                    isOpen={isAddModalOpen}
                    setIsOpen={e => setIsAddModalOpen(e)}
                    getRobotList={() => getRobotList()}
                />
            }
        </div>
    )
}

export default Robot;
