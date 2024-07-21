import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MetaData from 'layout/MetaData';
import './users.scss';
import './Profile.css';

export default function Profile() {
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState({
    oldPassword: true,
    password: true,
    confirmPassword: true
  });

  const handleShowEditModal = () => setShowEditModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user._id;

  const handleEdit = () => {
    navigate(`/updateProfile/${userId}`);
  };

  const handleEditProfile = async () => {
    navigate('/password/forgot');
  };
  

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/api/myprofile/${userId}`);
      const { user } = response.data.data;
      setName(user.name);
      setLastName(user.lastName);
      setEmail(user.email);
      setPhone(user.phone);
      setAvatar(user.avatar);
    };
    fetchUser();
  }, []);



  return (
    <div className="bg-white py-5 bg">
      <div className="col-10 mx-auto mt-4 row justify-content-around">
        <MetaData title={user.name} />
        <Container>
          <Row>
            <div>
              <h1 className="mx-auto" id="CardText">
                Profile
              </h1>
            </div>
            <Col lg={{ span: 5, offset: 0 }} md={12}>
              <Card className=" Cardimg123 mb-5 mt-3 ">
                <figure className="my-4 avatar avatar-profile" id="CardText">
                  <img
                    className="rounded-circle img-fluid"
                    src={avatar ?? require('../../assets/img/avatar.jpeg')}
                    alt="Profile"
                  />
                </figure>
                <div className="row-buttons col-9 mx-auto">
                  <div>
                    <button
                      className="btn my-3 px-4 btn rounded  w-100 my-2"
                      onClick={handleEdit}
                    >
                      Edit profile
                    </button>
                  </div>
                  <div>
                    <Link to="/userOrderList">
                      <button className="btn my-3 px-4 btn rounded w-100 my-2">
                        My Orders
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="mx-auto">
                  <button
                    className="btn my-3 px-4 btn rounded w-100 mx-auto mb-4 "
                    onClick={handleEditProfile }
                  >
                    Reset Password
                  </button>
                </div>
              </Card>
            </Col>
            <Col lg={{ span: 5, offset: 2 }} md={{ span: 6, offset: 4 }}>
              <div className="my-5">
                <h4>Full Name</h4>
                <p id="CardText" style={{ fontWeight: '600' }}>
                  {name} {lastName}
                </p>

                <h4>Email Address</h4>
                <p id="CardText" style={{ fontWeight: '600' }}>
                  {email}
                </p>

                <h4>Phone</h4>
                <p id="CardText" style={{ fontWeight: '600' }}>
                  {phone}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
