import axios from "axios";
import React, {useEffect, useState} from "react";
import { Modal, Button, InputGroup, Form } from "react-bootstrap";

const RobotDetailModal = ({robotId, isOpen, setIsOpen, getRobotList}) => {
    const [ip, setIp] = useState("")
    const [port, setPort] = useState("")
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        getRobotDetail()
    }, [])

    const updateRobotDetail = async () => {
        try {
            await axios.put(`http://localhost:8080/api/v1/robot/${robotId}`, 
            {
                address: ip + ":" + port,
                user: user,
                password: password
            })
            getRobotList()
        }
        catch (e) {
            console.log(e)
        }
    }

    const getRobotDetail = async () => {
        try {
            const robotDetail = await axios.get(`http://localhost:8080/api/v1/robot/${robotId}`)
            setIp(robotDetail.data.address.split(":")[0])
            setPort(robotDetail.data.address.split(":")[1])
            setUser(robotDetail.data.user)
            setPassword(robotDetail.data.password)
        } catch (e) {
            console.log(e)
        }
    }

    const handleClose = () => setIsOpen(false)

    const onClickModify = () => {
        updateRobotDetail()
        setIsOpen(false)
    }

    return (
        <Modal show={isOpen}>
        <Modal.Header closeButton>
            <Modal.Title>로봇 상세 조회 / 수정</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form.Label>IP</Form.Label>
            <InputGroup className="mb-3">
                <Form.Control 
                    id="basic-url" 
                    aria-describedby="basic-addon3" 
                    onChange={e => setIp(e.target.value)}
                    value={ip}
                />
            </InputGroup>
            <Form.Label>port</Form.Label>
            <InputGroup className="mb-3">
                <Form.Control 
                    id="basic-url" 
                    aria-describedby="basic-addon3" 
                    onChange={e => setPort(e.target.value)}
                    value={port}
                />
            </InputGroup>
            <Form.Label>user</Form.Label>
            <InputGroup className="mb-3">
                <Form.Control 
                    id="basic-url" 
                    aria-describedby="basic-addon3" 
                    onChange={e => setUser(e.target.value)}
                    value={user}
                />
            </InputGroup>
            <Form.Label>password</Form.Label>
            <InputGroup className="mb-3">
                <Form.Control 
                    id="basic-url" 
                    aria-describedby="basic-addon3" 
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                />
            </InputGroup>
        </Modal.Body>

        <Modal.Footer>
            <Button variant="secondary" onClick={() => handleClose()}>닫기</Button>
            <Button variant="primary" onClick={() => onClickModify()}>수정</Button>
        </Modal.Footer>
        </Modal>
    )
}

export default RobotDetailModal;